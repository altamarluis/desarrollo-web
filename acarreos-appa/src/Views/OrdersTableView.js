import React, { useContext, useEffect, useState } from 'react';
import Table from '../components/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../services/userContext';

const columns = [
    {
        name: 'GUÍA PEDIDO',
        cell: row => (
            <div className='font-semibold pl-3'> {row.tracking_code} </div>
        ),
        style: {
            justifyContent: 'start',
        },
    },
    {
        name: 'DESCRIPCIÓN',
        cell: row => row.description,
        hide: 'md',
    },
    {
        name: 'ESTADO',
        selector: row => {
            const stateStyles = {
                "Entregado": "bg-[#E1FCEF] text-[#14804A]", 
                "Retrasado": "bg-[#FFFBA7] text-[#FF4040]", 
                "En tránsito": "bg-[#F0F1FA] text-[#4F5AED]", 
                "Extraviado": "bg-[#FAF0F3] text-[#D12953]", 
                "Inactivo": "bg-[#E9EDF5] text-[#5A6376]" 
            };

            return (
                <div className={`flex w-[100px] h-[30px] font-medium rounded-full justify-center items-center ${stateStyles[row.status] || 'bg-gray-200 text-gray-700'}`}>
                    {row.status || 'Desconocido'}
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
        name: 'VALOR DECLARADO',
        cell: row => (
            <div className='font-semibold'> ${row.declared_value} </div>
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
    table: {
        style: {},
    },
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
    },
    pagination: {
        style: {},
    },
};

const ExpandedComponent = ({ data }) => {
    return (
        <div className="p-4 bg-gray-100 rounded-md">
            <p className='text-xl'><strong>Descripción completa del pedido:</strong> {data.description}</p>
            <p className='text-xl'><strong>Estado del pedido:</strong> {data.status}</p>
            <p className='text-xl'><strong>Última actualización:</strong> {new Date(data.last_updated_date).toLocaleString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            })}</p>
            <p className='text-xl'><strong>Valor declarado:</strong> ${data.declared_value}</p>
        </div>
    );
};

const OrdersTable = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://34.176.155.184:5000/api/clientOrders?user_id=${user.user_id}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) {
        return <p>Cargando pedidos...</p>;
    }

    return (
        <div className="font-bold">
            <div className="flex justify-around p-3 font-bold">
                <h2>Tus pedidos</h2>
                <button onClick={() => navigate('/order')} className="confirm-button mt-1 bg-[#00C853] h-10 p-2 rounded-md">
                    <p className='text-sm text-black font-bold'>Solicitar Servicio</p>
                </button>
            </div>
            <div className="justify-items-center pr-20 pl-20 justify-center">
                <Table 
                    columns={columns}
                    data={orders}
                    responsive
                    customStyles={customStyles}
                    paginationOptions={paginationComponentOptions}
                    expandableRows
                    expandOnRowClicked
                    expandableRowsComponent={({ data }) => <ExpandedComponent data={data} />}
                />
            </div>  
        </div>
    );
};

export default OrdersTable;
