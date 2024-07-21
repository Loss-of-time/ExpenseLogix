
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ExpenseRecord } from "./ExpenseRecord";

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    name: string;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    balance: number;

    @Column({ default: true })
    is_active: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @OneToMany(() => ExpenseRecord, expenseRecord => expenseRecord.paymentMethod)
    expenseRecords: ExpenseRecord[];
}
