
import { EntityRepository, Repository } from "typeorm";
import { ExpenseRecord } from "../entity/ExpenseRecord";

@EntityRepository(ExpenseRecord)
export class ExpenseRecordRepository extends Repository<ExpenseRecord> {
    // 自定义查询方法可以在这里添加
}
