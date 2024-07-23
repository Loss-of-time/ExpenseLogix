export interface PaymentMethod {
  id?: number;
  name: string;
  balance: number;
}

export interface ExpenseRecord {
  id?: number;
  note: string;
  quantity: number;
  total_price: number;
  paymentMethod: number;
  expense_date: Date;
}