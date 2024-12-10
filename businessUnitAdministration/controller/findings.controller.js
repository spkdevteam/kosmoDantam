
const sanitizeBody = require("../../utils/sanitizeBody")
const { createFindings,editFindings,ToggleFindings,deleteFindings,revokeFindings,readAllFindings,readAllFindingsByPage } = require("../services/findings.service")

exports.createFindings = async (req,res,next)=>{
    try {
        console.log(req.body)
        const data =await sanitizeBody(req.body)
        const result = await createFindings(data)
        res.status(200).json(result)        
    } catch (error) {
        next(error)
    }
}


exports.editFindings = async (req,res,next)=>{
    try {
        
        const data =await sanitizeBody(req.body)
        const result = await editFindings(data)
        res.status(200).json(result)        
    } catch (error) {
        next(error)
    }
}

exports.toggleFindings = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await ToggleFindings(data)
        res.status(result.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}

exports.deleteFindings = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await deleteFindings(data)
        res.status(result.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}

exports.revokeFindings = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result = await revokeFindings(data)
        res.status(result.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}

exports.readAllFindings = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result = await readAllFindings(data)
        res.status(result.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}

exports.getReadAllFindingsByPage =  async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await readAllFindingsByPage(data)
        res.status(result.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}

exports.putToggleFindingsByPage = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        const toggleStatus =  await ToggleFindings(data)
        const result = await readAllFindingsByPage(data)
        result.message = toggleStatus.message
        res.status(result?.statusCode|| 200).json(result)
    } catch (error) {
        next(error)
    }
}
