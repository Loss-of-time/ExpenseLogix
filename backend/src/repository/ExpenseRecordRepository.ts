
import { EntityRepository, Repository } from "typeorm";
import { ExpenseRecord } from "../entity/ExpenseRecord";

@EntityRepository(ExpenseRecord)
export class ExpenseRecordRepository extends Repository<ExpenseRecord> {
    // 自定义查询方法可以在这里添加
    async findBetweenDates(startDate: Date, endDate: Date): Promise<ExpenseRecord[] | undefined> {
        return this.createQueryBuilder("expense_record")
            .where("expense_record.date >= :startDate", { startDate })
            .andWhere("expense_record.date <= :endDate", { endDate })
            .getMany();
    }
}
