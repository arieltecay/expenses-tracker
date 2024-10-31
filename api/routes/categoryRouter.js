const express = require('express');
const categoryCtrl = require('../controllers/categoryCrtl');
const isAuth = require('../middlewares/isAuth');

const categoryRouter = express.Router();
categoryRouter.post('/api/v1/category/create', isAuth, categoryCtrl.create);
categoryRouter.get('/api/v1/category/lists', isAuth, categoryCtrl.lists);
categoryRouter.delete('/api/v1/category/delete/:id', isAuth, categoryCtrl.delete);
categoryRouter.put('/api/v1/category/update/:id', isAuth, categoryCtrl.update);

module.exports = categoryRouter;
