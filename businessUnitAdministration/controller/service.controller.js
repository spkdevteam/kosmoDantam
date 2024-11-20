const sanitizeBody = require("../../utils/sanitizeBody")
const { createService, deleteService, readActiveServices } = require("../services/services.service")

exports.createServices = async (req,res)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result = await createService(data)
        res.json(result)
    } catch (error) {
        res.json( {status:false,message:error.message} )        
    }
}


exports.editService = async (req,res)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result = await createService(data)
        res.json(result)
    } catch (error) {
        res.json( {status:false,message:error.message} )        
    }
}

exports.deleteService = async (req,res)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await deleteService(data)
        res.json(result)
    } catch (error) {
        res.json( {status:false,message:error.message} )        
    }
}

exports.readActiveServices = async (req,res)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await readActiveServices(data)
        res.json(result)
    } catch (error) {
       res.json({status:false,message:error.message})     
    } 
}