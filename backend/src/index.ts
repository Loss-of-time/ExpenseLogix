import "reflect-metadata";
import cors from 'cors';
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import { PaymentMethodController } from "./controller/PaymentMethodController";
import { ExpenseRecordController } from "./controller/ExpenseRecordController";

const app = express();
app.use(cors());  // 添加这行来启用 CORS
app.use(bodyParser.json());

const PORT : number = 4000;

let paymentMethodController: PaymentMethodController;
let expenseRecordController: ExpenseRecordController;

createConnection().then(connection => {
    paymentMethodController = new PaymentMethodController();
    expenseRecordController = new ExpenseRecordController();

    // PaymentMethod routes
    app.post("/payment-methods", async (req, res) => {
        const result = await paymentMethodController.create(req.body);
        res.json(result);
    });

    app.get("/payment-methods", async (req, res) => {
        const results = await paymentMethodController.findAll();
        res.json(results);
    });

    app.get("/payment-methods/:id", async (req, res) => {
        const result = await paymentMethodController.findOne(parseInt(req.params.id));
        res.json(result);
    });

    app.put("/payment-methods/:id", async (req, res) => {
        const result = await paymentMethodController.update(parseInt(req.params.id), req.body);
        res.json(result);
    });

    app.delete("/payment-methods/:id", async (req, res) => {
        await paymentMethodController.delete(parseInt(req.params.id));
        res.sendStatus(204);
    });

    // ExpenseRecord routes
    app.post("/expense-records", async (req, res) => {
        const result = await expenseRecordController.create(req.body);
        res.json(result);

        // 更新对应的 PaymentMethod 的 balance
        const paymentMethod = await paymentMethodController
            .findOne(req.body.paymentMethod);
        if (paymentMethod) {
            paymentMethod.balance -= req.body.total_price;
            await paymentMethodController.update(paymentMethod.id, paymentMethod);
        }
    });

    app.get("/expense-records", async (req, res) => {
        const results = await expenseRecordController.findAll();
        res.json(results);
    });

    app.get("/expense-records/:id", async (req, res) => {
        const result = await expenseRecordController.findOne(parseInt(req.params.id));
        res.json(result);
    });

    app.put("/expense-records/:id", async (req, res) => {
        const result = await expenseRecordController.update(parseInt(req.params.id), req.body);
        res.json(result);
    });

    app.delete("/expense-records/:id", async (req, res) => {
        await expenseRecordController.delete(parseInt(req.params.id));
        res.sendStatus(204);
    });

    app.get("/expense-records/between-dates", async (req, res) => {
        const startDate = new Date(req.query.startDate as string);
        const endDate = new Date(req.query.endDate as string);
        const results = await expenseRecordController.findBetweenDates(startDate, endDate);
        res.json(results);
    });


    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch(error => console.log("TypeORM connection error: ", error));