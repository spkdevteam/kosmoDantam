const sanitizeBody = require("../../utils/sanitizeBody")
const { creatAppointment } = require("../services/appoinment.service")

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