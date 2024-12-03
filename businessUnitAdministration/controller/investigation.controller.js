const sanitizeBody = require("../../utils/sanitizeBody")
const { createInvestigation, editinvestigation, toggleInvestigation, deleteInvestigation, revokeinvestigation, readAllinvestigation, readActiveinvestigation, readAllinvestigationByPageasync, readAllinvestigationByPage } = require("../services/investigation.service")

exports.createInvestigation = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await createInvestigation(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
       next(error) 
    }
}

exports.editInvestigation = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await editinvestigation(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
       next(error) 
    }
}
exports.toggleInvestigation = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await toggleInvestigation(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
       next(error) 
    }
}
exports.deleteInvestigation = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.query|| req.body)
        const result = await deleteInvestigation(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
       next(error) 
    }
}


exports.revokeInvestigation = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await revokeinvestigation(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
       next(error) 
    }
}

exports.getActiveInvestigation = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.query)
        const result = await readActiveinvestigation(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
       next(error) 
    }
}
exports.getAllInvestigation = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.query)
        const result = await readAllinvestigation(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
       next(error) 
    }
}
exports.getallInvestigationByPage = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.query)
        const result = await readAllinvestigationByPage(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
       next(error) 
    }
}