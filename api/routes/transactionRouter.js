const express = require('express');
const transactionCtrl = require('../controllers/transactionCtrl');
const isAuth = require('../middlewares/isAuth');

const transactionRouter = express.Router();
transactionRouter.post('/api/v1/transaction/create', isAuth, transactionCtrl.create);
transactionRouter.get('/api/v1/transaction/lists', isAuth, transactionCtrl.getFilteredTransactions);
transactionRouter.get('/api/v1/transaction/totalAmount', isAuth, transactionCtrl.getTotalAmount);
transactionRouter.get('/api/v1/transaction/all', isAuth, transactionCtrl.lists);
transactionRouter.put('/api/v1/transaction/update/:id', isAuth, transactionCtrl.update);
transactionRouter.delete('/api/v1/transaction/delete/:id', isAuth, transactionCtrl.delete);

module.exports = transactionRouter;
