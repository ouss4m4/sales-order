import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import { IItem } from '../typing/IItem';
import { Link } from 'react-router-dom';

interface Props {
  Items: IItem[];
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export const ItemsTable = ({ Items }: Props) => {
  const columns: readonly Column[] = [
    { id: 'itemCode', label: '' },
    { id: 'itemName', label: 'Name', minWidth: 300 },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
    },
    {
      id: 'stockQty',
      label: 'Quantity',
      minWidth: 170,
    },
    {
      id: 'unitPrice',
      label: 'Unit Price',
      minWidth: 170,
    },
    {
      id: 'Details',
      label: 'Details',
    },
  ];
  const rows = Items;
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
            {rows.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.itemCode}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'Details') {
                      return (
                        <TableCell>
                          <Link to={`/items/${row.itemCode}`}>details</Link>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
