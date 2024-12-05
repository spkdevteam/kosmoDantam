const sanitizeBody = require("../../utils/sanitizeBody")
const { creatAppointment, getBookingChart } = require("../services/appoinment.service")

exports.postcreateBooking = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        console.log(data,'appointment data')
        const result = await creatAppointment(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}
exports.getBookingByDate = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        console.log(data,'filtering Period  data')
        const result = await getBookingChart(data)
        res.status(200).json(result)
       // res.json(data)
    } catch (error) {
        next(error)
    }
} 