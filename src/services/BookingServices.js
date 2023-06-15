const db = require('../database/models');
const {Customer, Booking} = db;

class BookingService {

    static async createBooking(reqBody){
        try {
            const booking = await Booking.create(reqBody);
            return booking;
        } catch (error) {
            throw error;
        }
    }

    static async getBookings(){
        try {
            const bookings = await Booking.findAll({include: Customer});
            return bookings;
        } catch (error) {
            throw error;
        }
    }

    static async getBooking(id){
        try {
            const booking = await Booking.findByPk(id);
            return booking;
        } catch (error) {
            throw error;
        }
    }

    static async updateBooking(id, reqBody) {
        try {
            const booking = await Booking.update(reqBody, {where: {id}});
            return booking;
        } catch (error) {
            throw error;
        }
    }

    static async deleteBooking(id){
        const booking = await Booking.destroy({where: {id}});
        return booking;
    }
}

module.exports = BookingService;

