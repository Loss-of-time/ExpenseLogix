'use client';

import { Typography, Box } from '@mui/material';
import ThemeProvider from './ThemeProvider';
import ExpenseDashboard from './ExpenseDashboard';

export default function Home() {
  return (
    <ThemeProvider>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to ExpenseLogix Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Manage your expenses and payment methods efficiently.
        </Typography>
        <ExpenseDashboard />
      </Box>
    </ThemeProvider>
  );
}