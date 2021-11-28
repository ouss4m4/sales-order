import React from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import { IClient } from '../typings';

interface Props {
  clients: IClient[];
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const ClientsList = ({ clients }: Props) => {
  const columns: readonly Column[] = [
    { id: 'cardCode', label: '' },
    { id: 'cardName', label: 'Name' },
    {
      id: 'shippingAddress',
      label: 'Shipping Address',
      minWidth: 170,
    },
    {
      id: 'billingAddress',
      label: 'Billing Address',
      minWidth: 170,
    },
    {
      id: 'phoneNumber',
      label: 'Phone',
      minWidth: 170,
    },
    {
      id: 'Details',
      label: 'Details',
    },
  ];
  const rows = clients;
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
                <TableRow hover tabIndex={-1} key={row.cardCode}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'Details') {
                      return (
                        <TableCell key={column.id}>
                          <Link
                            to={`/clients/${row.cardCode}`}
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

export default ClientsList;
