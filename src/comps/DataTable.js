import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'DÍA', width: 150 },
  {
    field: 'firstName',
    headerName: 'ENTRADA',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'SALIDA',
    width: 150,
    editable: true,
  },
  {
    field: 'motivo',
    headerName: 'MOTIVO',
    description: 'MOTIVO DE LA FECHA DE SALIDA',
    width: 160,
    editable: true,
  },
];

const rows = [
  { id: 0, firstName: 'pil', lastName: 'lefin', age: 41, motivo: 'comida' },
  { id: 1, firstName: 'Jon', lastName: 'Snow', age: 35, motivo: 'fin' },
  {
    id: 2,
    firstName: 'Cersei',
    lastName: 'Lannister',
    age: 42,
    motivo: 'comida',
  },
  { id: 3, firstName: 'Jaime', lastName: 'Lannister', age: 45, motivo: 'fin' },
  { id: 4, firstName: 'Arya', lastName: 'Stark', age: 16, motivo: 'comida' },
  {
    id: 5,
    firstName: 'Daenerys',
    lastName: 'Targaryen',
    age: null,
    motivo: 'comida',
  },
  { id: 6, firstName: null, lastName: 'Melisandre', age: 150, motivo: 'fin' },
  {
    id: 7,
    firstName: 'Ferrara',
    lastName: 'Clifford',
    age: 44,
    motivo: 'comida',
  },
  { id: 8, firstName: 'Rossini', lastName: 'Frances', age: 36, motivo: 'fin' },
  { id: 9, firstName: 'Harvey', lastName: 'Roxie', age: 65, motivo: 'comida' },
];

const tableStyle = {
  height: 650,
  width: '40%',
  background: 'white',
};

export default function DataTable( {rows} ) {
  return (
    <div style={tableStyle}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
