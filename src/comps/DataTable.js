import * as React from 'react';
import { useState } from 'react';
import { convertGridRowsPropToState, DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

export default function DataTable({ rows }) {
  const [selectedRows, setSelectedRows] = useState(false);
  const [rowsToSend, setRowsToSend] = useState([]);

  const imputeRowsToSend = () => {
    console.log(rowsToSend);
  }

  return (
    <div
      style={{
        height: '50vh',
        width: '51%',
        textShadow: 'none',
        background: 'white',
        justifyContent: 'center',
        margin: 'auto',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          console.log(ids);

          if (ids.length == 0) {
            setSelectedRows(false);
            console.log('selected vacío');
            setRowsToSend([]);
          } else {
            console.log('selected no vacío');
            setSelectedRows(true);
            const selectedIDs = new Set(ids);

            const selectedRowsArray = [];
            ids.forEach((id) => {
              rows.forEach((row) => {
                if (row.id === id) {
                  selectedRowsArray.push(row);
                }
              })  
            })

            setRowsToSend(selectedRowsArray);

            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row.id)
            );
          }
        }}
      />
      {selectedRows && (
        <Button type="submit" variant="contained" className="header" onClick={imputeRowsToSend}>
          TO ÍMPUT
        </Button>
      )}
    </div>
  );
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90, editable: false },
  { field: 'dia', headerName: 'DÍA', width: 120, editable: false },
  {
    field: 'horaEntrada',
    headerName: 'ENTRADA',
    width: 140,
    editable: true,
  },
  {
    field: 'horaSalida',
    headerName: 'SALIDA',
    width: 140,
    editable: true,
  },
  {
    field: 'motivo',
    headerName: 'MOTIVO',
    description: 'MOTIVO DE LA FECHA DE SALIDA',
    width: 140,
    editable: true,
  },
];

const rowsy = [
  { id: 0, dia: 'pil', horaEntrada: 'lefin', horaSalida: 41, motivo: 'comida' },
  { id: 1, dia: 'pil', horaEntrada: 'lefin', horaSalida: 41, motivo: 'comida' },
  { id: 2, dia: 'pil', horaEntrada: 'lefin', horaSalida: 41, motivo: 'comida' },
];
