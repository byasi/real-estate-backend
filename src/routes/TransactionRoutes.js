const express = require('express');

const router = express.Router();

const TransactionControllers = require('../controllers/TransactionControllers');

//routes
router.post('/addTransaction', TransactionControllers.createTransaction);
router.get('/', TransactionControllers.getAllTransactions);
router.get('/singletransaction', TransactionControllers.findSingleTransaction);
router.get('/:id', TransactionControllers.findSingleTransaction);
router.get('/customertransactions/:CustomerId', TransactionControllers.findCustomerTransactions);
router.patch('/updatetransaction/:id',TransactionControllers.updateTransaction);
router.delete('/deletetransaction/:id', TransactionControllers.deleteTransaction);




module.exports = router;