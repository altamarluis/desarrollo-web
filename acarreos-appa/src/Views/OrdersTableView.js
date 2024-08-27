import React from 'react';
import Table from '../components/Table';

const columns = [
    {
        name: 'GUÍA PEDIDO',
        cell: row => (
            <div className='font-semibold'> {row.orderId} </div>
        ),
        minWidth: '150px',
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
                delivered: "bg-[#E1FCEF] text-[#14804A]", 
                delayed: "bg-[#FFFBA7] text-[#FF4040]", 
                transit: "bg-[#F0F1FA] text-[#4F5AED]", 
                lost: "bg-[#FAF0F3] text-[#D12953]", 
                inactive: "bg-[#E9EDF5] text-[#5A6376]" 
            };

            const stateLabels = {
                delivered: "Entregado",
                delayed: "Retrasado",
                transit: "En tránsito",
                lost: "Extraviado",
                inactive: "Inactivo"
            };

            return (
                <div className={`flex w-[100px] h-[30px] font-medium rounded-full justify-center items-center ${stateStyles[row.state] || 'bg-gray-200 text-gray-700'}`}>
                    {stateLabels[row.state] || 'Desconocido'}
                </div>
            );
        },
        minWidth: '150px',
    },
    {
        name: 'ÚLTIMA ACTUALIZACIÓN',
        cell: row => new Date(row.updateAt).toLocaleDateString('es-ES'),
        minWidth: '150px',
    },
    {
        name: 'COSTO',
        cell: row => (
            <div className='font-semibold'> ${row.price.toFixed(2)} </div>
        ),
        minWidth: '100px', 
    }
];

const data = [
    {
        orderId: 102932138,
        description: 'dasdasdasd',
        state: 'inactive',
        updateAt: new Date('2024-03-26'),
        price: 100.00
    },
    {
        orderId: 102342343,
        description: 'dasdasdasd',
        state: 'transit',
        updateAt: new Date('2024-03-22'),
        price: 100.00
    },
    {
        orderId: 102932138,
        description: 'dasdasdasd',
        state: 'delivered',
        updateAt: new Date('2024-03-21'),
        price: 200.00
    },
    {
        orderId: 102932138,
        description: 'dasdasdasd',
        state: 'delayed',
        updateAt: new Date('2024-03-26'),
        price: 300.00
    },
    {
        orderId: 103230934,
        description: 'ddasfsdfsd',
        state: 'lost',
        updateAt: new Date('2024-03-26'),
        price: 300.00
    },
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
        style: {
            
        }
    },
};

const OrdersTable = () => {
    return (
      <div className="font-bold">
          <div className="justify-items-start p-4 font-bold">
            <h2>Tus pedidos</h2>
          </div>
          <div className="justify-items-center pr-20 pl-20 justify-center">
            <Table 
                columns={columns}
                data={data}
                responsive
                customStyles={customStyles}
                paginationOptions={paginationComponentOptions}
            />
          </div>  
      </div>
    );
};

export default OrdersTable;
