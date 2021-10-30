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
  maxWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export const ItemsTable = ({ Items }: Props) => {
  const columns: readonly Column[] = [
    { id: '', label: '' },
    { id: 'itemName', label: 'Name', minWidth: 300 },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
    },
    {
      id: 'stockQty',
      label: 'Quantity',
      align: 'right',
    },
    {
      id: 'unitPrice',
      label: 'Unit Price',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'Details',
      label: 'Details',
    },
  ];
  const rows = Items;
  return (
    <Paper sx={{ width: '1080px', overflow: 'auto' }}>
      <TableContainer sx={{ maxHeight: 500, width: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <TableRow hover tabIndex={-1} key={row.itemCode}>
                  {columns.map((column) => {
                    const value = row[column.id] || i + 1;
                    if (column.id === 'Details') {
                      return (
                        <TableCell key={column.id}>
                          <Link
                            to={`/items/${row.itemCode}`}
                            style={{ textDecoration: 'none' }}
                          >
                            Details
                          </Link>
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
