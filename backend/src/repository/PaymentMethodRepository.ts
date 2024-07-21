
import { EntityRepository, Repository } from "typeorm";
import { PaymentMethod } from "../entity/PaymentMethod";

@EntityRepository(PaymentMethod)
export class PaymentMethodRepository extends Repository<PaymentMethod> {
    // 自定义查询方法可以在这里添加
}
