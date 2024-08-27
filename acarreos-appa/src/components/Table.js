import DataTable from "react-data-table-component";

const columns = [
	{	
		name: 'GUÍA PEDIDO',
		cell: row => (
			<div className='font-semibold'> {row.orderId} </div>
		),
		
	},
	{
		name: 'DESCRIPCIÓN',
		cell: row => row.description,
	},

	{
		name: 'ESTADO',
		selector: row => {
			const stateStyles = {
				delivered: "bg-[#E1FCEF] text-[#14804A]",       // Despachado
				delayed: "bg-[#FFF500] text-[#5C3131]",      // Retrasado
				transit: "bg-[#F0F1FA] text-[#4F5AED]",      // En tránsito
				lost: "bg-[#FAF0F3] text-[#D12953]",         // Perdido
				inactive: "bg-[#E9EDF5] text-[#5A6376]"      // Inactivo
			};
	
			const stateLabels = {
				delivered: "Entregado",
				delayed: "Retrasado",
				transit: "En tránsito",
				lost: "Perdido",
				inactive: "Inactivo"
			};
	
			return (
				<div className={`flex w-[100px] h-[30px] font-medium rounded-full justify-center items-center ${stateStyles[row.state] || 'bg-gray-200 text-gray-700'}`}>
					{stateLabels[row.state] || 'Desconocido'}
				</div>
			);
		}
	},
	{
		name: 'ÚLTIMA ACTUALIZACIÓN',
		cell: row => new Date(row.updateAt).toLocaleDateString('es-ES'),
	},
	{
		name: 'COSTO',
		cell: row => (
			<div className='font-semibold'> ${row.price} </div>
		),
	}
]

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
    
      
  ]

const paginationComponentOptions = {
	rowsPerPageText: 'Filas por página',
	rangeSeparatorText: 'de',
	selectAllRowsItem: true,
	selectAllRowsItemText: 'Todos',
};

const customStyles = {
	table: {
		style: {
			
		},
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
			borderRight: '8px',
			display: 'flex',
		}
	
	},
		
};

const Table = () => {

    return (
      <div className="first:outline firstoutline-offset-1 first:outline-1 first:outline-[#929292] first:rounded-lg">
        <DataTable 
          columns={columns}
          data={data}
          pagination
          responsive
          paginationComponentOptions={paginationComponentOptions}
          customStyles={customStyles}
          noDataComponent="No se encontraron registros."
            />
      </div>
      );
  }
  
  export default Table;