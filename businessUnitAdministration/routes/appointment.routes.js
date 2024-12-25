
const express = require('express')
const appointment = require('../controller/appointment.controller')
const bookingRoutes = express.Router()

bookingRoutes
       .post('/create',appointment.postcreateBooking)
       .get('/BookingByDate',appointment.getBookingByDate)
       .get('/BookingByDateNonTabular',appointment.getBookingByDateNonTabular)
       .get('/getAvailability',appointment.getAvailability)
       .delete('/delete',appointment.delete)
       .get('/createToken',appointment.createToken)
       .get('/getdailyBookingWithPagination',appointment.getdailyBookingWithPagination)

module.exports = bookingRoutes