
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PaymentMethod } from "./PaymentMethod";

@Entity()
export class ExpenseRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    note: string;

    @Column({ default: 1 })
    quantity: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_price: number;

    @Column({ type: "date", default: () => "CURRENT_DATE" })
    expense_date: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.expenseRecords)
    paymentMethod: PaymentMethod;
}
