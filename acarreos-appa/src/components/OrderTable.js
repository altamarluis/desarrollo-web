import DataTable from "react-data-table-component";

const columns = [
	{	
		name: 'Guía pedido',
    	selector: row => row.orderId,
	},
	{
		name: 'Descripción',
		selector: row => row.description,
	},

	{
		name: 'Estado',
		cell: row => row.state,
	},
	{
		name: 'Última actualización',
		cell: row => new Date(row.updateAt).toLocaleDateString('es-ES'),
	},
	{
		name: 'Costo',
		cell: row => row.price,
	}
]

const data = [
    {
        orderId: 102932138,
        description: 'dasdasdasd',
        state: 'inactive',
        updateAt: new Date('2024-03-26'),
        price: 100
    },
    {
        orderId: 1023423,
        description: 'dasdasdasd',
        state: 'transit',
        updateAt: new Date('2024-03-22'),
        price: 100
    },
    {
        orderId: 102932138,
        description: 'dasdasdasd',
        state: 'active',
        updateAt: new Date('2024-03-21'),
        price: 200
    },
    {
        orderId: 102932138,
        description: 'dasdasdasd',
        state: 'transit',
        updateAt: new Date('2024-03-26'),
        price: 300
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
			fontSize: '16px',
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

const OrderTable = () => {

    return (
      <div >
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
  
  export default OrderTable;