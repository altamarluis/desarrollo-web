import React, { useState, useEffect } from 'react'; 
import Table from '../components/Table';

const columns = [
    {
        name: 'NOMBRE',
        cell: row => (
            <div className="flex pl-3 flex-col">
				<div className='font-semibold'>{row.carrierName}</div>
				<div className="text-gray-500">{row.carrierId}</div>
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
                disponible: "bg-[#E1FCEF] text-[#14804A]",
                'en tránsito': "bg-[#F0F1FA] text-[#4F5AED]", 
                descanso: "bg-[#E9EDF5] text-[#5A6376]" 
            };

            return (
                <div className={`flex w-[100px] h-[30px] font-medium rounded-full justify-center items-center ${stateStyles[row.status.toLowerCase()] || 'bg-gray-200 text-gray-700'}`}>
                    {row.status || 'Desconocido'}
                </div>
            );
        },
        minWidth: '150px',
    },
    {
        name: 'FINALIZACIÓN DESCANSO',
        cell: row => row.rest_end_date
            ? new Date(row.rest_end_date).toLocaleString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            })
            : 'N/A',
        minWidth: '200px',
    },
    {
        name: 'KMs RECORRIDOS',
        cell: row => (
            <div className='font-semibold'> {row.km_traveled.toFixed(2)} KMs</div>
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

const CarriersInventoryTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBisons = async () => {
            try {
                const response = await fetch('http://34.176.155.184:5000/api/bisons');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                // Formatear los datos para que coincidan con los nombres de columnas
                const formattedData = result.map(bison => ({
                    carrierName: `Transportista ${bison.transporter_id}`,
                    carrierId: bison.bison_id,
                    description: `Bison ID: ${bison.bison_id}, Transportista ID: ${bison.transporter_id}`,
                    state: bison.status,
                    updateAt: bison.rest_end_date ? new Date(bison.rest_end_date) : null,
                    price: bison.km_traveled,
                    status: bison.status,
                    rest_end_date: bison.rest_end_date,
                    km_traveled: bison.km_traveled,
                }));
                setData(formattedData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBisons();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
      <div className="font-bold">
          <div className="justify-items-start p-3 font-bold">
            <h2>Inventario de bisontes</h2>
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

export default CarriersInventoryTable;
