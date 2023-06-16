const express = require("express");

const router = express.Router();

const CustomerControllers = require('../controllers/CustomerControllers');


// apis
router.post('/addCustomer', CustomerControllers.registerCustomer);
router.get('/', CustomerControllers.getAllCustomers);
router.get('/:id', CustomerControllers.findSingleCustomer);
router.delete('/deletecustomer/:id',CustomerControllers.deleteCustomer);
router.patch('/updatecustomer/:id',CustomerControllers.updateCustomer);
router.post('/login', CustomerControllers.login);
router.get('/profile/:token',CustomerControllers.getCustomerProfile);

module.exports = router;