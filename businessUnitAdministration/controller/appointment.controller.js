const sanitizeBody = require("../../utils/sanitizeBody")
const  appointmentServices = require("../services/appoinment.service")

exports.postcreateBooking = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        console.log(data,'appointment data')
        const result = await appointmentServices.creatAppointment(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}
exports.getBookingByDate = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        const result = await appointmentServices.getBookingChart(data)
        res.status(200).json(result)
       // res.json(data)
    } catch (error) {
        next(error)
    }
} 

exports.getAvailability = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        const result = await appointmentServices.generateAvailabiltyChart(data)
        res.status(200).json(result)
       // res.json(data)
    } catch (error) {
        next(error)
    }
} 