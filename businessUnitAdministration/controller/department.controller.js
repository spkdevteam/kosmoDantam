const message = require("../../utils/message")
const sanitizeBody = require("../../utils/sanitizeBody")
const { 
    createDepartment, 
    deleteDepartment,
    getallDepartments,
    toggleDepartment, 
    editDepartment, 
    revokeDeleteDepartment
} = require("../services/department.service")


exports.createDepartment =async (req, res,next) => {
    try {
        const data =await sanitizeBody(req.body)
        const result = await createDepartment(data)
        res.status(result.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
}

exports.deleteDepartment = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.query)
        console.log(req.query, data)
        const result = await deleteDepartment(data)
        res.status(result.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
}



exports.editDepartment =async (req, res,next) => {
    try {
        const data =await sanitizeBody(req.body)
        if(!data.deptId) res.json({status:false,message:message.lblCredentialMissing})
            const result = await editDepartment(data)
        res.status(result.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
}

exports.getAllActiveDepartment = async (req,res,next)=>{
    
    try {
        const data = await sanitizeBody(req.query)
        const  result  = await getallDepartments(data)
        res.status(result.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
} 

exports.toggleDepartments = async (req,res,next)=>{
try {
    const data = await sanitizeBody(req.body)
    const  result  = await toggleDepartment(data)
    res.status(result?.statusCode || 200).json(result)
} catch (error) {
    next(error);
}
}

exports.revokeDepartment = async (req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        const  result  = await revokeDeleteDepartment(data)
        res.status(result.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
    }