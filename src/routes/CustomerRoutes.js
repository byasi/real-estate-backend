const express = require("express");

const router = express.Router();

const CustomerControllers = require('../controllers/CustomerControllers');


// apis
router.post('/addCustomer', CustomerControllers.registerCustomer);
router.get('/', CustomerControllers.getAllCustomers);
router.get('/:id', CustomerControllers.findSingleCustomer);
router.delete('/deletecustomer/:id',CustomerControllers.deleteCustomer);
router.patch('/updatecustomer/:id',CustomerControllers.updateCustomer);

module.exports = router;