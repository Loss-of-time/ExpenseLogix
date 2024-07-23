'use client';

import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from '@mui/material';
import { ExpenseRecord, PaymentMethod } from '@/types';
import { getExpenseRecords, createExpenseRecord, updateExpenseRecord, deleteExpenseRecord, getPaymentMethods } from '@/lib/api';

export default function ExpenseRecords() {
  const [expenseRecords, setExpenseRecords] = useState<ExpenseRecord[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ExpenseRecord>({ note: '', quantity: 1, total_price: 0, paymentMethod: 0, expense_date: new Date() });

  useEffect(() => {
    fetchExpenseRecords();
    fetchPaymentMethods();
  }, []);

  const fetchExpenseRecords = async () => {
    const records = await getExpenseRecords();
    setExpenseRecords(records);
  };

  const fetchPaymentMethods = async () => {
    const methods = await getPaymentMethods();
    setPaymentMethods(methods);
  };

  const handleOpen = (record: ExpenseRecord = { note: '', quantity: 1, total_price: 0, paymentMethod: 0, expense_date: new Date() }) => {
    setCurrentRecord(record);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    if (currentRecord.id) {
      await updateExpenseRecord(currentRecord.id, currentRecord);
    } else {
      await createExpenseRecord(currentRecord);
    }
    handleClose();
    fetchExpenseRecords();
  };

  const handleDelete = async (id: number) => {
    await deleteExpenseRecord(id);
    fetchExpenseRecords();
  };

  const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
      return date.split('T')[0];
    }
    return date.toISOString().split('T')[0];
  };

  const convertDate = (date: string): Date => {
    return new Date(date);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Expense Records</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add New</Button>
      <List>
        {expenseRecords.map((record) => (
          <ListItem key={record.id}>
            <ListItemText 
              primary={record.note} 
              secondary={`Quantity: ${record.quantity}, Total: $${record.total_price}, Date: ${new Date(record.expense_date).toLocaleDateString()}`} 
            />
            <Button onClick={() => handleOpen(record)}>Edit</Button>
            <Button onClick={() => record.id && handleDelete(record.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{currentRecord.id ? 'Edit' : 'Add'} Expense Record</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note"
            fullWidth
            value={currentRecord.note}
            onChange={(e) => setCurrentRecord({ ...currentRecord, note: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={currentRecord.quantity}
            onChange={(e) => setCurrentRecord({ ...currentRecord, quantity: parseInt(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Total Price"
            type="number"
            fullWidth
            value={currentRecord.total_price}
            onChange={(e) => setCurrentRecord({ ...currentRecord, total_price: parseFloat(e.target.value) })}
          />
          <Select
            margin="dense"
            fullWidth
            value={currentRecord.paymentMethod}
            onChange={(e) => setCurrentRecord({ ...currentRecord, paymentMethod: e.target.value as number })}
          >
            {paymentMethods.map((method) => (
              <MenuItem key={method.id} value={method.id}>{method.name}</MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label="Expense Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={formatDate(currentRecord.expense_date)}
            onChange={(e) => setCurrentRecord({ ...currentRecord, expense_date: convertDate(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}