const { sanitizeFilter } = require("mongoose")
const sanitizeBody = require("../../utils/sanitizeBody")

const { create } = require("../../model/user")
const { createCheifComplaint,editCheifComplaint,toggleComplaintWithPage, toggleCheifComplain, deleteCheifComplaint, revokeCheifComplaint ,readActiveCheifComplaint, readAllCheifComplaint, listComplaintByPage} = require("../services/CComplaint.service")


exports.createCComplaint = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await createCheifComplaint(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
       next(error) 
    }
}

exports.editCComplaint = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await editCheifComplaint(data)
        res.status(result?.statusCode|| 200).json(result)
    } catch (error) {
       next(error) 
    }
}


exports.toggleCComplaint = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await toggleCheifComplain(data)
        res.status(result?.statusCode|| 200).json(result)
    } catch (error) {
       next(error) 
    }
}


exports.patchToggleComplaintWithPage = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await toggleCheifComplain(data)
        const fetchData = await listComplaintByPage(data)
        fetchData.message = result.message
        res.status(fetchData?.statusCode|| 200).json(fetchData)
    } catch (error) {
       next(error) 
    }
}




exports.deleteCComplaint = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await deleteCheifComplaint(data)
        res.status(result?.statusCode|| 200).json(result)
    } catch (error) {
       next(error) 
    }
}

exports.revokeCComplaint = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.body)
        const result = await revokeCheifComplaint(data)
        res.status(result?.statusCode|| 200).json(result)
    } catch (error) {
       next(error) 
    }
}

exports.getActiveCComplaint = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.query)
        const result = await readActiveCheifComplaint(data)
        res.status(result?.statusCode|| 200).json(result)
    } catch (error) {
       next(error) 
    }
}
exports.getAllCComplaint = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.query)
        const result = await readAllCheifComplaint(data)
        res.status(result?.statusCode|| 200).json(result)
    } catch (error) {
       next(error) 
    }
}
exports.getListComplaintByPage = async (req,res,next)=>{
    try {
        const data =await sanitizeBody(req.query)
        const result = await listComplaintByPage(data)
        res.status(result?.statusCode|| 200).json(result)
    } catch (error) {
       next(error) 
    }
}



