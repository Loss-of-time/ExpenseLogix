'use client';

import { Typography, Box } from '@mui/material';
import ThemeProvider from './ThemeProvider';

export default function Home() {
  return (
    <ThemeProvider>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to ExpenseLogix Dashboard
        </Typography>
        <Typography variant="body1">
          Manage your expenses and payment methods efficiently.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}