'use client';

import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { PaymentMethod } from '@/types';
import { getPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } from '@/lib/api';

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMethod, setCurrentMethod] = useState<PaymentMethod>({ name: '', balance: 0 });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    const methods = await getPaymentMethods();
    setPaymentMethods(methods);
  };

  const handleOpen = (method: PaymentMethod = { name: '', balance: 0 }) => {
    setCurrentMethod(method);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    if (currentMethod.id) {
      await updatePaymentMethod(currentMethod.id, currentMethod);
    } else {
      await createPaymentMethod(currentMethod);
    }
    handleClose();
    fetchPaymentMethods();
  };

  const handleDelete = async (id: number) => {
    await deletePaymentMethod(id);
    fetchPaymentMethods();
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Payment Methods</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add New</Button>
      <List>
        {paymentMethods.map((method) => (
          <ListItem key={method.id}>
            <ListItemText primary={method.name} secondary={`Balance: $${method.balance}`} />
            <Button onClick={() => handleOpen(method)}>Edit</Button>
            <Button onClick={() => method.id && handleDelete(method.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{currentMethod.id ? 'Edit' : 'Add'} Payment Method</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={currentMethod.name}
            onChange={(e) => setCurrentMethod({ ...currentMethod, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Balance"
            type="number"
            fullWidth
            value={currentMethod.balance}
            onChange={(e) => setCurrentMethod({ ...currentMethod, balance: parseFloat(e.target.value) })}
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