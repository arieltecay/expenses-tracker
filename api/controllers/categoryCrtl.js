const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const categoryController = {
    create: asyncHandler(async (req, res) => {
        const { name, type } = req.body;
        const validTypes = ["income", "expense"];
        if (!name || !type) {
            res.status(400);
            throw new Error("Name is required");
        }
        if (!validTypes.includes(type)) {
            res.status(400);
            throw new Error(`Invalid type. Valid types are: ${validTypes.join(", ")}`);
        }
        const nameNormalized = name.toLowerCase();
        const categoryExist = await Category.findOne({
            name: nameNormalized,
            user: req.user,
        });
        if (categoryExist) {
            res.status(400);
            throw new Error(`Category ` + name + ` already exist`);
        }
        const categoryCreated = await Category.create({
            name: nameNormalized,
            user: req.user,
            type,
        });

        res.status(201).json(categoryCreated);
    }),
    lists: asyncHandler(async (req, res) => {
        const categories = await Category.find({ user: req.user });
        res.status(200).json(categories);
    }),
    update: asyncHandler(async (req, res) => {
        //Ver video Update and delete transaction (2) en minuto 6:25
        const { name } = req.body;
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404);
            throw new Error("Category not found");
        }
        category.name = name;
        const categoryUpdated = await category.save();
        //Update affected transactions
        await Transaction.updateMany(
            { category: category._id },
            { category: categoryUpdated._id }
        );
        res.json(categoryUpdated);
    }),
    delete: asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404);
            throw new Error("Category not found");
        }
        await category.deleteOne();
        //Update affected transactions
        await Transaction.updateMany(
            { category: category._id },
            { category: null }
        );
        res.json({ message: "Category removed" });
    }),
};

module.exports = categoryController;
