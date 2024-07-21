
import { getCustomRepository } from "typeorm";
import { PaymentMethodRepository } from "../repository/PaymentMethodRepository";
import { PaymentMethod } from "../entity/PaymentMethod";

export class PaymentMethodController {
    private repository: PaymentMethodRepository;

    constructor() {
        this.repository = getCustomRepository(PaymentMethodRepository);
    }

    async create(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
        return this.repository.save(paymentMethod);
    }

    async findAll(): Promise<PaymentMethod[]> {
        return this.repository.find();
    }

    async findOne(id: number): Promise<PaymentMethod | undefined> {
        return this.repository.findOne(id);
    }

    async update(id: number, paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod | undefined> {
        await this.repository.update(id, paymentMethod);
        return this.repository.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
