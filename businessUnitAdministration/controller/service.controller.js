const sanitizeBody = require("../../utils/sanitizeBody")
const { createService, deleteService, readActiveServices,toggleServiceStatus, editService } = require("../services/services.service")

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
        const result = await editService(data)
        res.status(result?.statusCode||200).json(result)
    } catch (error) {
        next(error)
    }
}

exports.deleteService = async (req,res,next)=>{
    try {
        console.log(req.query)
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