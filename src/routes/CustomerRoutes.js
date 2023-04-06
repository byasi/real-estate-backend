const express = require("express");

const router = express.Router();

const CustomerControllers = require('../controllers/CustomerControllers');

// apis
router.post('/addCustomer', CustomerControllers.registerCustomer);
router.get('/', CustomerControllers.getAllCustomers);

module.exports = router;