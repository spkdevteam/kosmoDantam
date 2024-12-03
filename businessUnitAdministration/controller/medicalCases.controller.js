const sanitizeBody = require("../../utils/sanitizeBody")
const { createMedicalCases,updateMedicalCases, readAllMedicalCases ,deleteMedicalCase, revokeDeletedMedicalCase, toggleMedicalCases, readAllMedicalCasesByPage} = require("../services/medicalCases.service")


exports.createMedicalCases = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await createMedicalCases(data)
        res.status(result?.statusCode||200).json(result) 

    } catch (error) {
        next(error)
    }
}

exports.updateMedicalCases = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await updateMedicalCases(data)
        res.status(result?.statusCode||200).json(result) 

    } catch (error) {
        next(error)
    }
}

exports.getActiveCases = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await readAllMedicalCases(data)
        res.status(result.statusCode||200).json(result)
    } catch (error) {
        next(error)
    }
}


exports.deleteMedicalCases = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await deleteMedicalCase(data)
        res.status(result.statusCode||200).json(result)
    } catch (error) {
        next(error)
    }
}
exports.revokeDeleteMedicalCases = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result = await revokeDeletedMedicalCase(data)
        res.status(result.statusCode||200).json(result)
    } catch (error) {
        next(error)
    }
}

exports.toggleMedicalCases = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result = await toggleMedicalCases(data)
        console.log(result)
        res.status(result.statusCode||200).json(result)
    } catch (error) {
        next(error)
    }
}
exports.getReadActiveCasesByPage = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await readAllMedicalCasesByPage(data)
        res.status(result.statusCode||200).json(result)
    } catch (error) {
        next(error)
    }
}
exports.putToggleMediCaseByPage =  async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        const toggle = await toggleMedicalCases(data)
        const result = await readAllMedicalCasesByPage(data)
        result.message = toggle.message
        res.status(toggle.statusCode||200).json(result)
    } catch (error) {
        next(error)
    }
}

