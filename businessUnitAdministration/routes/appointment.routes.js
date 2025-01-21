
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
       .post('/changeAppointmentStatus',appointment.changeBookingStatus)
       .get('/getdailyBookingWithPagination',appointment.getdailyBookingWithPagination)
       .get('/filterBookingDetails',appointment.filterBookingDetails)
       .get('/getActiveAppointment',appointment.getActiveBooking)
       .get('/getAllbookingBypatient',appointment.getAllbookingBypatient)
       .get('/getBookingSummaryByPeriod',appointment.getBookingSummaryByPeriod)
       .get('/getDatewiseBookingSummaryByPeriod',appointment.getDatewiseBookingSummaryByPeriod)
       

module.exports = bookingRoutes