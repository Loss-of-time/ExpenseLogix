
import { getCustomRepository } from "typeorm";
import { ExpenseRecordRepository } from "../repository/ExpenseRecordRepository";
import { ExpenseRecord } from "../entity/ExpenseRecord";

export class ExpenseRecordController {
    private repository: ExpenseRecordRepository;

    constructor() {
        this.repository = getCustomRepository(ExpenseRecordRepository);
    }

    async create(expenseRecord: ExpenseRecord): Promise<ExpenseRecord> {
        return this.repository.save(expenseRecord);
    }

    async findAll(): Promise<ExpenseRecord[]> {
        return this.repository.find({ relations: ["paymentMethod"] });
    }

    async findOne(id: number): Promise<ExpenseRecord | undefined> {
        return this.repository.findOne(id, { relations: ["paymentMethod"] });
    }

    async update(id: number, expenseRecord: Partial<ExpenseRecord>): Promise<ExpenseRecord | undefined> {
        await this.repository.update(id, expenseRecord);
        return this.repository.findOne(id, { relations: ["paymentMethod"] });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
