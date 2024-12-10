const sanitizeBody = require("../../utils/sanitizeBody")
const { saveLeaveApplication, 
        deleteLeaveApplication, 
        readActiveLeaveApplication,
        toggleLeaveApplication, 
        editLeaveApplication,
        readActiveLeaveApplicationByPage,
        } = require("../services/leaveRegister.service")

exports.postSaveLeaveRequest = async(req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        console.log(data,'ssssss')
        const result = await saveLeaveApplication(data)
        res.json(result)

    } catch (error) {
        next(error)
    }
}

exports.deleteLeaveApplication = async(req,res,next)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await deleteLeaveApplication(data)
        console.log(data,result)
        res.json(result)

    } catch (error) {
        next(error)
    }
}
exports.putEditLeaveApplication = async(req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)

        console.log(data)
        const result = await editLeaveApplication(data)
        res.json(result)

    } catch (error) {
        next(error)
    }
}
exports.getReadActiveApplications = async(req,res,next)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await readActiveLeaveApplication(data)
        console.log(data,result)
        res.json(result)
 
    } catch (error) {
        next(error)
    }
}

exports.getAllLeaveApplicationByPage = async(req,res,next)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await readActiveLeaveApplicationByPage(data)
        console.log(data,result)
        res.json(result)

    } catch (error) {
        next(error)
    }
}
exports.postToggleLeaveApplication = async(req,res,next)=>{
    try {
        console.log(req.body)
        const data = await sanitizeBody(req.body)
        const result = await toggleLeaveApplication(data)
        res.json(result)

    } catch (error) {
        next(error)
    }
}
exports.postToggleLeaveApplicationByPage = async(req,res,next)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result = await toggleLeaveApplication(data)
        const fetchDetails = await readActiveLeaveApplicationByPage(data)
        fetchDetails.message = result?.message
        console.log(data,result)
        res.json(fetchDetails)

    } catch (error) {
        next(error)
    }
} 

