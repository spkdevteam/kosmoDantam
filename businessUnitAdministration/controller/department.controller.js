const message = require("../../utils/message")
const sanitizeBody = require("../../utils/sanitizeBody")
const { createDepartment, deleteDepartment,getallDepartments } = require("../services/department.service")


exports.createDepartment =async (req, res) => {
    try {
        const data =await sanitizeBody(req.body)
        const result = await createDepartment(data)
        res.json(result)
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.deleteDepartment = async (req,res)=>{
    try {
        const data = await sanitizeBody(req.query)
        console.log(req.query, data)
        const result = await deleteDepartment(data)
        res.json(result)
    } catch (error) {
        res.json({status:false,message:error.message})
    }
}



exports.editDepartment =async (req, res) => {
    try {
        const data =await sanitizeBody(req.body)
        if(!data.deptId) res.json({status:false,message:message.lblCredentialMissing})
            const result = await createDepartment(data)
        console.log(data,result,'dataadfddfdfaaaa')
        res.json(result)
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.getAllActiveDepartment = async (req,res)=>{
    
    try {
        const  result  = await getallDepartments
        res.json(result)
    } catch (error) {
        res.json({status:false,message:error.message})
    }
} 