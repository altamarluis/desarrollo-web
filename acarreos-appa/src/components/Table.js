import React from 'react';
import DataTable from 'react-data-table-component';
import '../styles/Table.css'

const Table = ({ columns, data, customStyles, paginationOptions }) => {
    return (
        <div className="table-container first:outline first:outline-offset-1 first:outline-1 first:outline-[#929292] first:rounded-lg">
            <DataTable 
                columns={columns}
                data={data}
                pagination
				responsive
                paginationComponentOptions={paginationOptions}
                customStyles={customStyles}
                noDataComponent="No se encontraron registros."
            />
        </div>
    );
}

export default Table;
