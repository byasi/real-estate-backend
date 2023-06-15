const express = require('express');
const BookingController = require('../controllers/BookingController');

const router = express.Router();

router.post('/create', BookingController.createBooking);
router.get('/',BookingController.getBookings);
router.get('/:id', BookingController.getBooking);
router.patch('/:id', BookingController.updateBooking);
router.delete('/:id', BookingController.deleteBooking);

module.exports = router;