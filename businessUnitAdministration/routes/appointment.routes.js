
const express = require('express')
const { postcreateBooking ,getBookingByDate } = require('../controller/appointment.controller')
const bookingRoutes = express.Router()

bookingRoutes
       .post('/create',postcreateBooking)
       .get('/BookingByDate',getBookingByDate)

module.exports = bookingRoutes