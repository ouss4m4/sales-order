import React, { FC } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IOrderLine } from '../../typings';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: '', label: '' },
  { id: 'itemName', label: 'Name', minWidth: 300 },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 170,
  },
];

type Props = {
  lines: IOrderLine[];
};

const OrderLines: FC<Props> = ({ lines, children }) => {
  const rows = lines;
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <TableRow hover tabIndex={-1} key={`${row.itemName + i}`}>
                  {columns.map((column, j) => {
                    const value = row[column.id] || i + 1;
                    return (
                      <TableCell
                        key={`${row.itemCode + i + j}`}
                        align={column.align}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {children}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderLines;
