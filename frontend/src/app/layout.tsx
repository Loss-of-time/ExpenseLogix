import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from './ThemeProvider';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExpenseLogix Dashboard",
  description: "Manage your expenses efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                ExpenseLogix Dashboard
              </Typography>
              <Link href="/" passHref style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
                Home
              </Link>
              <Link href="/payment-methods" passHref style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
                Payment Methods
              </Link>
              <Link href="/expense-records" passHref style={{ color: 'white', textDecoration: 'none' }}>
                Expense Records
              </Link>
              <Link href="/calendar-page" passHref style={{ color: 'white', marginLeft: '20px', textDecoration: 'none' }}>
                Calendar
              </Link>
            </Toolbar>
          </AppBar>
          <Container>
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}