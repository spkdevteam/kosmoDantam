
// {
//     "deptName": "Human Resources",
//     "deptId": "DPT001",
//     "branchId": "BR001",
//     "description": "Handles employee relations and administration."
//   }

const departmentSchema = require("../../client/model/department")
const { getClientDatabaseConnection } = require("../../db/connection")
const buSettingsSchema = require("../../model/buSettings")
 
const getserialNumber = require("../../model/services/getserialNumber")
const message = require("../../utils/message")
const createDepartment = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId)
        const department = await db.model('department', departmentSchema)

        // If deptId doesn't exist, generate a new one or check if the department already exists
        if (!input?.deptId) {
            const result = await department.findOne({ deptName: input.deptName, deleted: false })
            if (result) {
                return {
                    status: false,
                    message: message.lblDepartmentalreadyExist,
                    statusCode: 400 // Bad Request (department already exists)
                }
            }
            input.deptId = await getserialNumber('department', input?.clientId, input?.branchId)
        }

        const newData = {
            deptName: input.deptName,
            branchId: input.branchId,
            description: input.description,
            deptId: input.deptId,
            deleted: false,
            isActive: true,
        }
        

        const result = await department.findOneAndUpdate(
            { deptId: input.deptId },   
            { $set: newData },          
            {
                upsert: true,
                new: true,              
                returnDocument: 'after' 
            }
        );
         
        // Return success with status code 200 (OK) and the result data
        return {
            status: true,
            message: message.lblDpartmentCreationSuccess,
            statusCode: 200,  
            ...result._doc
        }

    } catch (error) {
        // In case of an error, return status code 500 (Internal Server Error)
        return {
            status: false,
            message: error.message,
            statusCode: 500  
        }
    }
}



const deleteDepartment = async (input)=>{
    try {
        const db = await getClientDatabaseConnection(input?.clientId)
        const department = await db.model('department',departmentSchema)
        const result =await department.updateOne({deptId:input.deptId},{$set:{deleted:true}})
        if(result.modifiedCount) return {status:true,message:message.lblDepartmentDeleted}
        else return {status:false,message:message.lblNoChanges,statusCode: 200  }
    } catch (error) {
        return {status:false,message:error.message,statusCode: 500}
    }
}

const getallDepartments = async (input)=>{
    try {
        const db =await getClientDatabaseConnection(input.clientId)
        const departments =await  db.model('department',departmentSchema)
        const result =  await departments.find({deleted:false})
        if (result) return {status:true,message:'success',result: result,statusCode: 200}    
        else return {status:false,message:'unKnown error ',statusCode: 500}    
    } catch (error) {
        return {status:false,message:error.message}
    }
}

const editDepartment = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input?.clientId)
        const department =await db.model('department',departmentSchema) 
       // const buSettings =await db.model('BUSetting',buSettingsSchema)
        if(!input?.deptId){
            const result =  await department.findOne({deptName:input.deptName,deleted:false})
            if(result) return {status:false,message:message.lblDepartmentalreadyExist,statusCode: 400}
            input.deptId =await getserialNumber('department',input?.clientId,input?.branchId)
            }
        const newData = {
            deptName:input.deptName,
            branchId: input.branchId,
            description:input.description,
            deptId:input.deptId,
            deleted:false,
            isActive:true,
        }
        const result = await department.updateOne({ deptId:input.deptId },{$set:newData},{upsert:true})
        if(result.upsertedCount)return {status:true,message:message.lblDpartmentCreationSuccess,...newData,statusCode: 200}
        else if (result.modifiedCount)return {status:true,message:message.lblDpartmentModified,...newData,statusCode: 200}
        else return {status:false,message:message.lblNoChanges,statusCode: 200}
            
    } catch (error) {
        return {status:false,message:error.message,statusCode: 500}
    }
}

const toggleDepartment = async (input)=>{
try {
    const db =await getClientDatabaseConnection(input.clientId)
        const departments =await  db.model('department',departmentSchema)
        const isExist =  await departments.find({deptId:input?.deptId})
        if(!isExist || isExist.deleted) return {status:false,message:message.lbldepartmentNotFound,statusCode: 400}
        const result = await departments.updateOne({deptId:input?.deptId},{$set:{isActive:!isExist?.isActive}})
        if(result.modifiedCount) return {statusCode: 200,status:true,message:`Department ${isExist.deptName} has ${isExist.isActive ? 'disabled':'enabled'} `}
} catch (error) {
    
}
}
module.exports = { createDepartment ,deleteDepartment ,getallDepartments,toggleDepartment,editDepartment}