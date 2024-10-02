import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { MdModeEdit } from "react-icons/md";
import EditOrderModal from '../components/EditOrderStateModal';

const CarrierTable = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://34.176.155.184:5000/api/transporterOrders?transporter_id=2');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setOrdersData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = (orderId) => {
        setSelectedOrder(orderId);
        setIsModalOpen(true);
    };

    const handleSave = (orderId, newState) => {
        const updatedData = ordersData.map(order => {
            if (order.tracking_code === orderId) {
                return { ...order, status: newState };
            }
            return order;
        });

        setOrdersData(updatedData);
        setIsModalOpen(false);
    };

    const columns = [
        {
            name: 'PEDIDO',
            cell: row => (
                <div className="flex pl-3 flex-col">
                    <div className='font-semibold'>{row.tracking_code}</div>
                </div>
            ),
            style: {
                minWidth: '150px',
                justifyContent: 'start',
            }
        },
        {
            name: 'DESCRIPCIÓN',
            cell: row => row.description,
            minWidth: '200px',
            hide: 'md',
        },
        {
            name: 'ESTADO',
            selector: row => {
                const stateStyles = {
                    "En tránsito": "bg-[#F0F1FA] text-[#4F5AED]", 
                    "Entregado": "bg-[#E1FCEF] text-[#14804A]", 
                    "Retrasado": "bg-[#FFFBA7] text-[#FF4040]", 
                    "Extraviado": "bg-[#FAF0F3] text-[#D12953]", 
                    "Inactivo": "bg-[#E9EDF5] text-[#5A6376]"
                };

                return (
                    <div className='flex items-center'>
                        <div className={`flex w-[100px] h-[30px] font-medium rounded-full justify-center items-center ${stateStyles[row.status] || 'bg-gray-200 text-gray-700'}`}>
                            {row.status}
                        </div>
                        <button
                            className='ml-2 p-1 rounded-full bg-blue-200 hover:bg-blue-300 focus:outline-none'
                            onClick={() => handleEditClick(row.tracking_code)}
                        >
                            <MdModeEdit className='w-4 h-4' />
                        </button>
                    </div>
                );
            },
            minWidth: '150px',
        },
        {
            name: 'ÚLTIMA ACTUALIZACIÓN',
            cell: row => new Date(row.last_updated_date).toLocaleString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }),
            minWidth: '200px',
        },
        {
            name: 'VALOR A COBRAR',
            cell: row => (
                <div className='font-semibold'>${row.declared_value}</div>
            ),
            minWidth: '100px', 
        }
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const customStyles = {
        cells: {
            style: {
                fontSize: '14px',
                borderWidth: '0.5px',
                justifyContent: 'center',
            }
        },
        headCells: {
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                justifyContent: 'center',
                borderWidth: '1px',
            }
        },
        headRow: {
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                justifyContent: 'center',
                borderWidth: '1px',
            }
        }
    };

    const ExpandedComponent = ({ data }) => (
        <div className="p-4 bg-gray-100 rounded-md">
            <p className='text-base'><strong>Descripción completa del pedido:</strong> {data.description}</p>
            <p className='text-base'><strong>Estado del pedido:</strong> {data.status}</p>
            <p className='text-base'><strong>Última actualización:</strong> {new Date(data.last_updated_date).toLocaleString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            })}</p>
            <p className='text-base'><strong>Costo:</strong> ${data.declared_value}</p>
        </div>
    );

    if (isLoading) {
        return <div>Cargando pedidos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="font-bold">
            <div className="justify-items-start p-3 font-bold">
                <h2>Pedidos asignados</h2>
            </div>
            <div className="justify-items-center pr-20 pl-20 justify-center">
                <Table 
                    columns={columns}
                    data={ordersData}
                    responsive
                    customStyles={customStyles}
                    paginationOptions={paginationComponentOptions}
                    expandableRows
                    expandOnRowClicked
                    expandableRowsComponent={({ data }) => <ExpandedComponent data={data} />}
                />
            </div>
            {isModalOpen && selectedOrder && (
                <EditOrderModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    order={selectedOrder}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default CarrierTable;
