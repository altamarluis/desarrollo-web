import React from 'react';
import DataTable from 'react-data-table-component';
import '../styles/Table.css'

const Table = ({ columns, data, customStyles, paginationOptions, expandableRows, expandableRowsComponent, expandOnRowClicked,expandableRowsHideExpander}) => {
    return (
        <div className="table-container first:outline first:outline-offset-1 first:outline-1 first:outline-[#929292] first:rounded-lg">
            <DataTable 
                columns={columns}
                data={data}
                pagination
				responsive
                paginationComponentOptions={paginationOptions}
                customStyles={customStyles}
                expandableRows={expandableRows}
                expandOnRowClicked={expandOnRowClicked}
                expandableRowsComponent={expandableRowsComponent}
                expandableRowsHideExpander={expandableRowsHideExpander}
            />
        </div>
    );
}

export default Table;
