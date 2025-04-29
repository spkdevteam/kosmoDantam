
const express = require('express')
const appointment = require('../controller/appointment.controller')
const getAppointmentWithFilter = require('../controller/appointment/getAppointmentWithFilter.controller')
const { tempAuthorizeEntity } = require('../../middleware/authorization/commonEntityAuthorization/tempUserValidation')
const getAvailabilityChartCtrl = require('../controller/appointment/getAvailabilityChart.controller')
const bookingRoutes = express.Router()

bookingRoutes
       .post('/create', appointment.postcreateBooking)
       .get('/BookingByDate',appointment.getBookingByDate)
       .get('/BookingByDateNonTabular',appointment.getBookingByDateNonTabular)
       .get('/getAvailability', getAvailabilityChartCtrl) //, getAvailabilityChartCtrl
       .delete('/delete', appointment.delete)
       .get('/createToken',appointment.createToken)
       .post('/changeAppointmentStatus',appointment.changeBookingStatus)
       .get('/getdailyBookingWithPagination',appointment.getdailyBookingWithPagination)
       .get('/filterBookingDetails',appointment.filterBookingDetails)
       .get('/getActiveAppointment',appointment.getActiveBooking)
       .get('/getAllbookingBypatient',appointment.getAllbookingBypatient)
       .get('/getBookingSummaryByPeriod',appointment.getBookingSummaryByPeriod)
       .get('/getDatewiseBookingSummaryByPeriod',appointment.getDatewiseBookingSummaryByPeriod)
       .get('/filterPatientBookingDetails',appointment.filterPatientBookingDetails)
       .get('/getAppointmentWithFilter', getAppointmentWithFilter)
module.exports = bookingRoutes