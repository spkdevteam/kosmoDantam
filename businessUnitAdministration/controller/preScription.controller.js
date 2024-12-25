const { sanitizeFilter } = require("mongoose")
const sanitizeBody = require("../../utils/sanitizeBody")
const { createPrescription } = require("../services/priscription.service")

const create = async (req,res,next) =>  {
    try {   
        const data = await sanitizeBody(req.body)
        const result = await createPrescription(data)
        res.status(result.statusCode|| 200).json(result)
        
    } catch (error) {
        next(error)
    }
}



deletePreScription = (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}
editPrescription = (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}
togglePrescription = (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}
readPrescription = (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}

module.exports = {create,deletePreScription,editPrescription, togglePrescription ,readPrescription}