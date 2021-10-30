import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../shared/dateHelper';
import { IOrderHeader } from '../typings';

interface Props {
  Orders: IOrderHeader[];
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => any;
}

const OrdersList = ({ Orders }: Props) => {
  const columns: readonly Column[] = [
    { id: 'orderId', label: '' },
    { id: 'cardName', label: 'Client' },
    {
      id: 'docDate',
      label: 'Order Date',
      format: (val) => formatDate(val),
    },
    {
      id: 'docDueDate',
      label: 'Due Date',
      format: (val) => formatDate(val),
    },
    {
      id: 'shippingAddress',
      label: 'Shipping Address',
    },
    {
      id: 'Details',
      label: 'Details',
    },
  ];
  const rows = Orders;
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
                <TableRow hover tabIndex={-1} key={row.orderId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'Details') {
                      return (
                        <TableCell key={column.id}>
                          <Link
                            to={`/orders/${row.orderId}`}
                            style={{ textDecoration: 'none' }}
                          >
                            Details
                          </Link>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
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

export default OrdersList;
