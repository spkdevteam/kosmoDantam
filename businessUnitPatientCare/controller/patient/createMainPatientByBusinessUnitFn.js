const bcrypt = require("bcrypt");
const clientRoleSchema = require("../../../client/model/role");
const { getClientDatabaseConnection } = require("../../../db/connection");
const CustomError = require("../../../utils/customeError");
const getserialNumber = require("../../../model/services/getserialNumber");
const patientService = require("../../services/patient.service");
const saveActivityLogFn = require("../../../businessUnitAdministration/services/activityLog/saveActivityLogFn");
const formatDateForActivityLog = require("../../../utils/formatDateForActivityLog");
const clinetBranchSchema = require("../../../client/model/branch");
const message = require("../../../utils/message");
const statusCode = require("../../../utils/http-status-code");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const clinetPatientSchema = require("../../../client/model/patient");




const commonIdCheck = async (data) => {
    try {
        if (!data.clientId) {
            throw new CustomError(statusCode.BadRequest, message.lblClinetIdIsRequired);
        }
        if (!data.branchId) {
            throw new CustomError(statusCode.BadRequest, message.lblTryWithValidBranch);
        }
        if (!data.businessUnit) {
            throw new CustomError(statusCode.BadRequest, message.lblBusinessUnitIdIsRequired);
        }
        const clientConnection = await getClientDatabaseConnection(data.clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const branch = await Branch.findById(data.branchId);
        if (!branch) {
            throw new CustomError(statusCode.BadRequest, message.lblBranchNotFound);
        }
        const bu = await BusinessUnit.findById(data.businessUnit)
        if (!bu) {
            throw new CustomError(statusCode.BadRequest, message.lblBusinessUnitNotFound);
        }
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating patient: ${error.message}`);
    }
}

const createMainPatientByBusinessUnit = async (req, res, next) => {
    try {
        const { clientId, branchId, roleId, businessUnit, firstName, lastName, email, phone, gender, age, bloodGroup, patientGroup, referedBy, city, state, country, ZipCode, address, password } = req.body;
        // console.log("req.body", req.body);
        
        const mainUser = req.user;
        await commonIdCheck({ clientId, branchId, businessUnit });
        if (!firstName || !lastName || !phone || !roleId ) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Role = clientConnection.model('clientRoles', clientRoleSchema);
        const role = await Role.findById(roleId);
        if (!role) {
            throw new CustomError(statusCode.Conflict, message.lblRoleNotFound);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const displayId = await getserialNumber('patient', clientId, '', businessUnit);
        let profileUpdates = {
            displayId: displayId,
            firstName,
            lastName,
            email: email ? email : "",
            phone, city, state, country, ZipCode, address,
            age,
            bloodGroup,
            patientGroup,
            referedBy,
            password: hashedPassword,
            branch: branchId,
            role: roleId,
            roleId: role.id,
            businessUnit: businessUnit,
            tc: true,
            isUserVerified: true,
            createdBy: mainUser._id,
        }

        if(gender !== ""){
            profileUpdates = {
                ...profileUpdates,
                gender : gender
            }
        }

        if (req.file?.filename) {
            profileUpdates.profileImage = req.file.filename;
        }
        //const newPatient = await patientService.create(clientId, { ...profileUpdates,isActive:true });
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        let profileUpdates2 = {
            displayId: displayId,
            firstName,
            lastName,
            email,
            phone, city, state, country, ZipCode, address,
            gender, age, bloodGroup, patientGroup, referedBy,
            branch: branchId,
            businessUnit: businessUnit,
            createdBy: mainUser?._id,
        }

        if(gender !== ""){
            profileUpdates2 = {
                ...profileUpdates2,
                gender : gender
            }
        }
        if (req.file?.filename) {
            profileUpdates2.profileImage = req.file.filename;
        }
        const newPatientInstance = await Patient.create({ ...profileUpdates2,isActive:true });


        //for saveActivityLog
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const branch = await Branch.findById(newPatientInstance.branch);

        //saving the activity of creating a patient
        await saveActivityLogFn({ patientId: newPatientInstance?._id, module: "patient", branchId, buId: businessUnit, userId: mainUser?._id, ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress, sourceLink: req.headers['x-frontend-path'], activity: "Created a patient", description: `Patient registered at ${branch?.name} on ${formatDateForActivityLog(new Date())}`, data: newPatientInstance, status: true, dateTime: new Date(), clientId });

        return res.status(statusCode.OK).send({
            message: message.lblPatientCreatedSuccess,
            data: { patientId: newPatientInstance._id },
        });
    } catch (error) {
        next(error)
    }
};

module.exports = createMainPatientByBusinessUnit;