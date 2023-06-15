const BookingService = require("../services/BookingServices");

class BookingController {
  static async createBooking(req, res, next) {
    try {
      const bookings = await BookingService.createBooking(req.body);
      return res.status(201).json({
        status: res.statusCode,
        message: "Booking successful",
        data: bookings,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getBookings(req, res, next) {
    try {
      const bookings = await BookingService.getBookings();
      return res.status(200).json({
        status: res.statusCode,
        message: "bookings retrieved",
        data: bookings,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getBooking(req, res, next) {
    try {
      const booking = await BookingService.getBooking(req.params.id);
      return res.status(200).json({
        status: res.statusCode,
        message: "retrieved",
        data: booking,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateBooking(req, res, next) {
    try {
      const booking = await BookingService.getBooking(req.params.id);
      if (booking) {
        await BookingService.updateBooking(req.params.id, req.body);
        return res.status(201).json({
          status: res.statusCode,
          message: "updated succesfully",
          data: booking,
        });
      } else {
        return res.status(409).json({
          status: res.statusCode,
          message: "No Booking found",
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async deleteBooking(req, res, next) {
    try {
      const booking = await BookingService.getBooking(req.params.id);
      if (booking) {
        await BookingService.deleteBooking(req.params.id);
        return res.status(200).json({
          status: res.statusCode,
          message: "deleted succesfully",
          data: booking,
        });
      } else {
        return res.status(409).json({
          status: res.statusCode,
          message: "No Booking found",
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BookingController;
