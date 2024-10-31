const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transaction = require("../model/Transaction");

const transactionCtrl = {
    create: asyncHandler(async (req, res) => {
        const { type, category, amount, date, description } = req.body;
        if (!type || !amount || !date) {
            res.status(400);
            throw new Error("Type,amount, and date are required");
        }
        const transactionCreated = await transaction.create({
            type,
            category,
            amount,
            date,
            description,
            user: req.user,
        });
        res.status(201).json(transactionCreated);
    }),
    lists: asyncHandler(async (req, res) => {
        const transactions = await transaction.find({ user: req.user });
        res.status(200).json(transactions);
    }),
    getFilteredTransactions: asyncHandler(async (req, res) => {
        const { startDate, endDate, type, category } = req.query;
        let filter = { user: req.user };
        if (startDate && endDate) {
            filter.date = { $gte: startDate, $lte: endDate };
        }
        if (type) {
            filter.type = type;
        }
        if (category) {
            if (category === 'all') {
                //do nothing
            } else if (category === 'Uncategorized') {
                filter.category = 'Uncategorized';
            } else {
                filter.category = category;
            }
            const transactions = await transaction.find(filter).sort({ date: -1 });
            res.status(200).json(transactions);
        }
    }),
    update: asyncHandler(async (req, res) => {
        const transactionId = req.params.id;
        if (!transactionId && transactionId.user.toString() !== req.user.toString()) {
            res.status(401);
            throw new Error("You are not authorized to update this transaction");
        }
        const { type, category, amount, date, description } = req.body;
        const transactionUpdated = await transaction.findByIdAndUpdate(
            transactionId,
            {
                type,
                category,
                amount,
                date,
                description,
            },
            { new: true }
        );
        res.status(200).json(transactionUpdated);
    }),
    delete: asyncHandler(async (req, res) => {
        const transactionId = req.params.id;
        if (!transactionId && transactionId.user.toString() !== req.user.toString()) {
            res.status(401);
            throw new Error("You are not authorized to delete this transaction");
        }
        await transaction.findByIdAndDelete(transactionId);
        res.status(200).json({ message: "Transaction deleted" });
    }),
    getTotalAmount: asyncHandler(async (req, res) => {
        const { startDate, endDate, type, category } = req.query;
        let filter = { user: req.user };
        if (startDate && endDate) {
            filter.date = { $gte: startDate, $lte: endDate };
        }
        if (type) {
            filter.type = type;
        }
        if (category) {
            if (category === 'all') {
                // do nothing
            } else if (category === 'Uncategorized') {
                filter.category = 'Uncategorized';
            } else {
                filter.category = category;
            }
        }
        // Obtener todas las transacciones que coincidan con los filtros
        const transactions = await transaction.find(filter);
        // Sumar el campo `amount` de cada transacción utilizando JavaScript
        const totalAmount = transactions.reduce((acc, curr) => acc + curr.amount, 0);

        res.status(200).json({ totalAmount });
    }),
};

module.exports = transactionCtrl;
