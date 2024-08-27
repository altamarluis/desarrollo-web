import React from 'react';
import Table from '../components/Table';

const columns = [
    {
        name: 'PEDIDO',
        cell: row => (
            <div className="flex pl-3 flex-col">
				<div className='font-semibold'>{row.username}</div>
				<div className="text-gray-500">{row.orderId}</div>
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
        cell: row => new Date(row.updateAt).toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }),
        minWidth: '200px',  // Aumenta el ancho mínimo si es necesario
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
        username: 'Aang',
        orderId: 102932138,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...',
        state: 'inactive',
        updateAt: new Date('2024-08-26T10:35:24'),
        price: 100.00
    },
    {
        username: 'Soka',
        orderId: 102342343,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...',
        state: 'transit',
        updateAt: new Date('2024-08-22T14:45:12'),
        price: 100.00
    },
    {
        username: 'Tio Iroh',
        orderId: 102932138,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...',
        state: 'delivered',
        updateAt: new Date('2024-08-21T09:07:34'),
        price: 200.00
    },
    {
        username: 'Katara',
        orderId: 102932138,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...',
        state: 'delayed',
        updateAt: new Date('2024-08-26T16:15:27'),
        price: 300.00
    },
    {
        username: 'Principe Zuko',
        orderId: 103230934,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...',
        state: 'lost',
        updateAt: new Date('2024-08-27T11:19:45'),
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

const CarrierTable = () => {
    return (
      <div className="font-bold">
          <div className="justify-items-start p-3 font-bold">
            <h2>Pedidos transportados por Carrier</h2>
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

export default CarrierTable;
