// {
//     "clientId": "6735e64c5c58f271b1ce1678",
//     "serviceId": "SVC001",
//     "department": "UT-AB-2024-DP100008",
//     "procedures": [
//       "Procedure 1",
//       "Procedure 2"
//     ],
//     "branchId": "BR001",
//     "serviceName": "General Checkup",
//     "description": "A routine checkup for patients.",
//     "price": 100 
//     
//   }

const clinetBranchSchema = require("../../client/model/branch")
const serviceSchema = require("../../client/model/service")
const { getClientDatabaseConnection } = require("../../db/connection")
const departmentSchema = require("../../model/department")
const getserialNumber = require("../../model/services/getserialNumber")
const message = require("../../utils/message")
const validateSerialnumber = require("../../utils/validateSerialNumber")

const createService = async (input) => {
    try {
        console.log(input)
        const db = await getClientDatabaseConnection(input.clientId)
        const services = db.model('services', serviceSchema)
        const department = db.model('department', departmentSchema)
        const branch = db.model('branch', clinetBranchSchema)
        if (!input.serviceId) {
            const isNameExist =await services.findOne({ serviceName: input?.serviceName })
            console.log(isNameExist,'isNameExist')
            if (isNameExist) return { status: false, messsage: message.lblServiceExist }
            input.serviceId = await getserialNumber('service', input?.clientId, input?.branchId)
        }
        const isDepartmentValid = await department.findOne({ deptId: input?.deptId })
        const isBranchValid = await branch.findOne({ branchId: input?.branchId })
        if (!isDepartmentValid) return { status: false, messsage: message.lbldepartmentNotFound }
        if (!isBranchValid) return { status: false, messsage: message.lblBranchNotFound }
        if(typeof (input.price) != 'number' || input.price<0  )  return { status: false, messsage: message.lblNotavalidAmount }
         
        if(!validateSerialnumber(input?.serviceId,input.clientId)) return   { status: false, messsage: message.lblNotavalidSerialNumber }
        const newData = {
            serviceId: input?.serviceId,
            departmentId: input?.deptId,
            procedures: input?.procedures||[],
            serviceName: input?.serviceName,
            description: input?.description,
            price: input?.price,
            isActive:true,
            deleted:false
        }
        const result = await services.updateOne({serviceId:newData.serviceId},{$set:newData},{upsert:true})
        if(result.upsertedCount) return { status: true, messsage: message.lblServiceCreated,...newData }

    } catch (error) {
        return {status:false,message:error.message}
    }
}

const deleteService = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId); // Ensure `input.clientId` is defined
        const services = db.model('services', serviceSchema);

        // Check if the service exists and is not already deleted
        const result = await services.findOne({ serviceId: input?.serviceId });
        if (!result || result.deleted) {
            return { status: false, message: message.lblServicenotFound };
        }

        // Mark the service as deleted
        const deletedService = await services.updateOne(
            { serviceId: input?.serviceId },
            { $set: { deleted: true } }
        );

        if (deletedService.modifiedCount) {
            return { status: true, message: message.lblServiceDeleted };
        } else {
            return { status: false, message: message.lblNoChanges };
        }
    } catch (error) {
        console.error("Error in deleteService:", error); // Log the actual error
        return { status: false, message: message.lblInternalError || "An unexpected error occurred." };
    }
};

const readActiveServices = async (input)=>{
    try {
        const db = await getClientDatabaseConnection(input.clientId); // Ensure `input.clientId` is defined
        const services =await db.model('services', serviceSchema);
        const data = await services.find({deleted:false,isActive:true})
        console.log(data,'dey data fetched ')

        if(data){
            return { "status": true,
                    message: message.lblSuccess,
                    services:data}
        }
        else{
            return { "status": false,
                message: message.lblFailed,
            }
        
        }
    } catch (error) {
        return { "status": false,
            message: error.message,
        }
    }
}


module.exports = {createService,deleteService,readActiveServices}