const clinetBranchSchema = require("../../client/model/branch")
const departmentSchema = require("../../client/model/department")
const serviceSchema = require("../../client/model/service")
const { getClientDatabaseConnection } = require("../../db/connection")

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
            const isNameExist = await services.findOne({ serviceName: input?.serviceName })
            if (isNameExist) return { status: false, statusCode: 409, messsage: message.lblServiceExist }
            input.serviceId = await getserialNumber('service', input?.clientId, input?.branchId,input?.buId)
        }
        const isDepartmentValid = await department.findOne({ _id: input?.deptId })
        const isBranchValid = await branch.findOne({ _id: input?.branchId })
        if (!isDepartmentValid) return { status: false, statusCode: 404, messsage: message.lbldepartmentNotFound }
        if (!isBranchValid) return { status: false, statusCode: 404, messsage: message.lblBranchNotFound }
        if (typeof (input.price) != 'number' || input.price < 0) return { status: false, statusCode: 400, messsage: message.lblNotavalidAmount }
        const newData = {
            serviceId: input?.serviceId,
            departmentId: isDepartmentValid._id,
            branchId:isBranchValid._id,
            procedures: input?.procedures || [],
            serviceName: input?.serviceName,
            description: input?.description,
            price: input?.price,
            buId: input?.buId,
            isActive: true,
            deletedAt: null
        }
        const result = await services.findOneAndUpdate({ serviceId: newData.serviceId }, { $set: newData }, { upsert: true,new:true,returnDocument:'after'})
        if (result) return { status: true, statusCode: 201, messsage: message.lblServiceCreated, ...result._doc }

    } catch (error) {
        return { status: false, statusCode: 500, message: error.message }
    }
}
const deleteService = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId);
        const services = db.model('services', serviceSchema);
        const result = await services.findOne({ _id: input?.serviceId });
        console.log(input,'sssss',result)
        if (!result || result.deletedAt) {
            return { status: false, statusCode: 404, message: message.lblServicenotFound };
        }
        const deletedService = await services.updateOne(
            { _id: input?.serviceId },
            { $set: { deletedAt: new Date() } }
        );

        if (deletedService.modifiedCount,deletedService) {
            return { status: true, statusCode: 200, message: message.lblServiceDeleted };
        } else {
            return { status: false, statusCode: 304, message: message.lblNoChanges };
        }
    } catch (error) {
        console.error("Error in deleteService:", error);
        return { status: false, statusCode: 500, message: message.lblInternalError || "An unexpected error occurred." };
    }
};
const readActiveServices = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId);
        const services = await db.model('services', serviceSchema);
        const data = await services.find({ deletedAt:null})
        console.log(data, 'dey data fetched ')

        if (data) {
            return {
                status: true,
                statusCode: 200,
                message: message.lblSuccess,
                services: data
            }
        } else {
            return {
                status: false,
                statusCode: 404,
                message: message.lblFailed,
            }
        }
    } catch (error) {
        return {
            status: false,
            statusCode: 500,
            message: error.message,
        }
    }
}

const toggleServiceStatus = async (input) => {
    try {

        const db = await getClientDatabaseConnection(input.clientId);
        const services = await db.model('services', serviceSchema);
        const isExist = await services.findOne({ _id: input?.serviceId })
        if (!isExist || isExist.deletedAt) return { status: false, statusCode: 404, message: message.lblServicenotFound }
        const result = await services.updateOne({ _id: input?.serviceId }, { $set: { isActive: !isExist.isActive } })
        if (result.modifiedCount) return {
            status: true,
            statusCode: 200,
            message: `Service ${isExist?.serviceName} ${isExist.isActive ? 'enabled' : 'disabled'}`
        }

    } catch (error) {
        return { status: false, statusCode: 500, message: error.message }
    }
}
const editService = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId)
        const services = db.model('services', serviceSchema)
        const department = db.model('department', departmentSchema)
        const branch = db.model('branch', clinetBranchSchema)
        if (input.serviceId) {
            const isNameExist = await services.findOne({ id: { $ne: input.serviceId }, serviceName: input?.serviceName })
            if (isNameExist) return { status: false, statusCode: 409, messsage: message.lblServiceExist }
            
        }
        const isDepartmentValid = await department.findOne({ _id: input?.deptId })
        const isBranchValid = await branch.findOne({ _id: input?.branchId })
        if (!isDepartmentValid) return { status: false, statusCode: 404, messsage: message.lbldepartmentNotFound }
        if (!isBranchValid) return { status: false, statusCode: 404, messsage: message.lblBranchNotFound }
        if (typeof (input.price) != 'number' || input.price < 0) return { status: false, statusCode: 400, messsage: message.lblNotavalidAmount }
        
        
        const newData = {
            branchId:input?.branchId, 
            departmentId: input?.deptId,
            procedures: input?.procedures || [],
            serviceName: input?.serviceName,
            description: input?.description,
            price: input?.price,
            isActive: true,
            deletedAt: null
        }
        const result = await services.updateOne({ _id: input.serviceId }, { $set: newData })
        console.log(newData,result)
        if (result.modifiedCount) return { status: true, statusCode: 201, messsage: message.lblServiceModified, ...newData }

    } catch (error) {
        return { status: false, statusCode: 500, message: error.message }
    }
}

const serviceUnderDepartment  = async (input) => {
    try {
        const db = await getClientDatabaseConnection(input.clientId);
        const services = await db.model('services', serviceSchema);
        const data = await services.find({ deletedAt:null,departmentId:input?.departmentId ,isActive:true })
        
        if (data) {
            return {
                status: true,
                statusCode: 200,
                message: message.lblSuccess,
                services: data
            }
        } else {
            return {
                status: false,
                statusCode: 404,
                message: message.lblFailed,
            }
        }
    } catch (error) {
        return {
            status: false,
            statusCode: 500,
            message: error.message,
        }
    }
}

module.exports = { createService, deleteService, readActiveServices, toggleServiceStatus,editService,serviceUnderDepartment  }
