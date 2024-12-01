const { getClientDatabaseConnection } = require("../../db/connection")
const appointmentSchema = require("../../client/model/appointments");
const cheifComplaintSchema = require("../../client/model/cheifcomplaint");
const departmentSchema = require("../../client/model/department")
const findingsSchema = require("../../client/model/findings");
const investigationSchema = require("../../client/model/investigationSchema");
const medicalCasesSchema = require("../../client/model/medicalCases")
const procedureSchema = require("../../client/model/procedure")
const serviceSchema = require("../../client/model/service")
const clinetBranchSchema = require('../../client/model/branch');  
const clinetUserSchema = require("../../client/model/user");
const clinetChairSchema = require("../../client/model/chair");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit");
const userModel = require("../../model/user");

exports.validateObjectId = async ({clientid='',objectId='',collectionName=''})=>{
    try {
        collectionName=='clientuser' ? console.log(clientid,objectId,collectionName,):''
        const db = await getClientDatabaseConnection(clientid)
        const appointments = await db.model('appointment',appointmentSchema)
        const cheifComplaint = await db.model('CheifComplaint', cheifComplaintSchema)
        const department = await db.model('department', departmentSchema)
        const findings =await db.model('finding', findingsSchema);
        const investigation = await db.model('investigation', investigationSchema)
        const medicalCases = db.model('medicalCase', medicalCasesSchema)
        const procedures = await db.model('procedure', procedureSchema)
        const services = await db.model('services', serviceSchema);
        const branch = await db.model('branch', clinetBranchSchema);
        const User =await db.model('clientUsers', clinetUserSchema);
        const businessUnit = db.model('businessUnit', clinetBusinessUnitSchema);
        const chair = db.model('chair', clinetChairSchema);
        switch (collectionName) {
            case 'appointment':
                return await appointments.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'CheifComplaint':
                return await cheifComplaint.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'department':
                return await department.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'finding':
                return await findings.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'investigation':
                return await investigation.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'medicalCase':
                return await medicalCases.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'procedure':
                return await procedures.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'services':
                return await services.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'branch':
                return await branch.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'clientuser':
                return await User.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'businessunit':
                return await businessUnit.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'chair':
                return await chair.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            case 'clientId':
                return await userModel.findOne({ _id: objectId, deletedAt: null }) ? true : false;
            default:
                return false;
        }
        
    } catch (error) {
        return false
    }
}