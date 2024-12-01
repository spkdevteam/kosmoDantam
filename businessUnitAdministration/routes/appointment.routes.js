
const express = require('express')
const { postcreateBooking } = require('../controller/appointment.controller')
const bookingRoutes = express.Router()

bookingRoutes
       .post('/create',postcreateBooking)

module.exports = bookingRoutes