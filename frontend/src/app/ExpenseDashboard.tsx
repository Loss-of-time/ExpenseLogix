import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box } from '@mui/material';
import { getExpenseRecords } from '../lib/api';
import { ExpenseRecord } from '../types';

const ExpenseDashboard = () => {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [dailyExpenses, setDailyExpenses] = useState<{ date: string; total: number }[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const records = await getExpenseRecords();
        setExpenses(records);
        processDailyExpenses(records);
      } catch (error) {
        console.error('Error fetching expense records:', error);
      }
    };

    fetchExpenses();
  }, []);

  const processDailyExpenses = (records: ExpenseRecord[]) => {
    const dailyTotals: { [key: string]: number } = {};
    
    records.forEach((record) => {
      const date = new Date(record.expense_date).toISOString().split('T')[0];
      dailyTotals[date] = (dailyTotals[date] || 0) + Number(record.total_price);
      console.log(date, dailyTotals[date]);
      // dailyTotals[date] = 100; // debug
    });

    const sortedDailyExpenses = Object.entries(dailyTotals)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => a.date.localeCompare(b.date));

    setDailyExpenses(sortedDailyExpenses);
  };

  return (
    <Box sx={{ width: '100%', height: 400, my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Daily Expense Dashboard
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dailyExpenses}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#ffffff" name="Total Expense" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ExpenseDashboard;