const sanitizeBody = require("../../utils/sanitizeBody")
const { createService, deleteService, readActiveServices,toggleServiceStatus } = require("../services/services.service")

exports.createServices = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result = await createService(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}


exports.editService = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result = await createService(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}

exports.deleteService = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await deleteService(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}

exports.readActiveServices = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await readActiveServices(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
       next(error)
    } 
}

exports.toggleService = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result = await toggleServiceStatus(data)   
        res.status(result?.statusCode).json(result)
    } catch (error) {
         next(error)
    }
}