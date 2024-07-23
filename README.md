# ExpenseLogix  - A simple expense tracker

## Database Schema

### ExpenseRecord Table

This table stores individual expense records.

| Column Name   | Data Type                | Constraints       | Description                               |
|---------------|--------------------------|-------------------|-------------------------------------------|
| id            | INTEGER                  | PRIMARY KEY, AUTO | Unique identifier for each expense record |
| note          | VARCHAR(255)             | NOT NULL          | Description or note about the expense     |
| quantity      | INTEGER                  | DEFAULT 1         | Quantity of items purchased               |
| total_price   | DECIMAL(10,2)            | NOT NULL          | Total price of the expense                |
| expense_date  | DATE                     | DEFAULT CURRENT_DATE | Date when the expense occurred         |
| created_at    | TIMESTAMP                | DEFAULT CURRENT_TIMESTAMP | Timestamp of record creation      |
| paymentMethod | INTEGER (Foreign Key)    |                   | Reference to PaymentMethod table          |

### PaymentMethod Table

This table stores information about different payment methods.

| Column Name   | Data Type                | Constraints       | Description                               |
|---------------|--------------------------|-------------------|-------------------------------------------|
| id            | INTEGER                  | PRIMARY KEY, AUTO | Unique identifier for each payment method |
| name          | VARCHAR(50)              | UNIQUE, NOT NULL  | Name of the payment method                |
| balance       | DECIMAL(10,2)            | DEFAULT 0         | Current balance of the payment method     |
| is_active     | BOOLEAN                  | DEFAULT TRUE      | Indicates if the method is active         |
| created_at    | TIMESTAMP                | DEFAULT CURRENT_TIMESTAMP | Timestamp of record creation      |
| updated_at    | TIMESTAMP                | DEFAULT CURRENT_TIMESTAMP | Timestamp of last update          |
