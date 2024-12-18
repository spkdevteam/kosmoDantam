


const bcrypt = require("bcrypt");


const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const clinetUserSchema = require("../../client/model/user");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit");
const clientRoleSchema = require("../../client/model/role");
const clinetPatientSchema = require("../../client/model/patient")

const RoleModel = require("../../model/role");
const MasterUser = require("../../model/user")

const patientService = require("../services/patient.service")

// create Main Patient by business unit
exports.createMainPatientByBusinessUnit = async (req, res, next) => {
    try {
        const { clientId, branchId, roleId, businessUnit, firstName, lastName, email, phone, gender, age, bloodGroup, patientGroup, referedBy, city, state, country, ZipCode, address, password } = req.body;
        const mainUser = req.user;

        await commonIdCheck({ clientId, branchId, businessUnit });
        if (!firstName || !lastName || !email || !phone || !roleId || !city || !state || !country || !ZipCode || !address) {
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
            email,
            phone, city, state, country, ZipCode, address,
            gender, age, bloodGroup, patientGroup, referedBy,
            password: hashedPassword,
            branch: branchId,
            role: roleId,
            roleId: role.id,
            businessUnit: businessUnit,
            tc: true,
            isUserVerified: true,
            createdBy: mainUser._id,
        }
        if (req.file?.filename) {
            profileUpdates.profileImage = req.file.filename;
        }
        const newPatient = await patientService.create(clientId, { ...profileUpdates });
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
            createdBy: mainUser._id,
        }
        if (req.file?.filename) {
            profileUpdates2.profileImage = req.file.filename;
        }
        const newPatientInstance = await Patient.create({ ...profileUpdates2 })
        return res.status(statusCode.OK).send({
            message: message.lblPatientCreatedSuccess,
            data: { patientId: newPatient._id },
        });
    } catch (error) {
        next(error)
    }
};

// create sub Patient by business unit
exports.createSubPatientByBusinessUnit = async (req, res, next) => {
    try {
        const { clientId, branchId, businessUnit, mainPatientLinkedId, firstName, lastName, email, phone, gender, age, bloodGroup, patientGroup, referedBy, city, state, country, relation } = req.body;
        const mainUser = req.user;
        await commonIdCheck({ clientId, branchId, businessUnit });
        if (!firstName || !lastName || !email || !phone || !city || !state || !country || !relation) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const User = clientConnection.model('clientUsers', clinetUserSchema);
        const mainPatient = await User.findById(mainPatientLinkedId);

        if (!mainPatient) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }

        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const newPatientInstance = await Patient.create({
            firstName,
            lastName,
            email,
            phone, city, state, country, relation,
            gender, age, bloodGroup, patientGroup, referedBy,
            branch: branchId,
            businessUnit: businessUnit,
            mainPatientLinkedid: mainPatientLinkedId,
            isChainedWithMainPatient: true,
            createdBy: mainUser._id,
        })
        return res.status(statusCode.OK).send({
            message: message.lblPatientCreatedSuccess,
            data: { patientId: newPatientInstance._id },
        });
    } catch (error) {
        next(error)
    }
};

// update Patient by business unit
exports.updatePatientByBusinessUnit = async (req, res, next) => {
    try {
        const { clientId, branchId, businessUnit, patientId, firstName, lastName, email, phone, gender, age, bloodGroup, patientGroup, referedBy, city, state, country, ZipCode, address, } = req.body;
        await commonIdCheck({ clientId, branchId, businessUnit });
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientNotFound,
            });
        }
        let dataObject = {
            firstName,
            lastName,
            email,
            phone, city, state, country, ZipCode, address,
            gender, age, bloodGroup, patientGroup, referedBy,
            branch: branchId,
            businessUnit: businessUnit,
        }

        if (req.file?.filename) {
            dataObject.profileImage = req.file.filename;
        }
        if (!patient.isChainedWithMainPatient) {
            await patientService.update(clientId, patient.email, dataObject);
        }
        Object.assign(patient, dataObject);
        await patient.save()
        return res.status(statusCode.OK).send({
            message: message.lblPatientUpdatedSuccess,
        });
    } catch (error) {
        next(error);
    }
};

// get particular Patient by business unit
exports.getParticularPatientByBusinessUnit = async (req, res, next) => {
    try {
        const { clientId, patientId } = req.params;
        if (!clientId || !patientId) {
            return res.status(400).send({
                message: message.lblPatientIdIdAndClientIdRequired,
            });
        }
        const patient = await patientService.getById(clientId, patientId);
        return res.status(200).send({
            message: message.lblPatientFoundSucessfully,
            data: patient,
        });
    } catch (error) {
        next(error)
    }
};

// list Patient by business unit
exports.listPatient = async (req, res, next) => {
    try {
        const { clientId, keyword = '', page = 1, perPage = 10, } = req.query;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        const filters = {
            deletedAt: null,
            ...(keyword && {
                $or: [
                    { firstName: { $regex: keyword.trim(), $options: "i" } },
                    { lastName: { $regex: keyword.trim(), $options: "i" } },
                    { email: { $regex: keyword.trim(), $options: "i" } },
                    { phone: { $regex: keyword.trim(), $options: "i" } },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $concat: ["$firstName", " ", "$lastName"] },
                                regex: keyword.trim(),
                                options: "i",
                            },
                        },
                    },
                ],
            }),
        };
        const result = await patientService.list(clientId, filters, { page, limit: perPage });
        return res.status(statusCode.OK).send({
            message: message.lblPatientFoundSucessfully,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// active inactive Patient by business unit
exports.activeinactivePatientByBusinessUnit = async (req, res, next) => {
    try {
        const { status, patientId, clientId, keyword, page, perPage } = req.body;
        req.query.clientId = clientId;
        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        if (!clientId || !patientId) {
            return res.status(400).send({
                message: message.lblPatientIdIdAndClientIdRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientNotFound,
            });
        }
        if (!patient.isChainedWithMainPatient) {
            await patientService.activeInactive(clientId, patient.email, {
                isActive: status === "1",
            });
        }
        Object.assign(patient, {
            isActive: status === "1",
        });
        await patient.save();
        this.listPatient(req, res)
    } catch (error) {
        next(error);
    }
};


exports.softDeletePatient = async (req, res) => {
    try {
        const { keyword, page, perPage, patientId, clientId } = req.body;
        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        req.query.clientId = clientId;
        if (!clientId || !patientId) {
            return res.status(400).send({
                message: message.lblPatientIdIdAndClientIdRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientNotFound,
            });
        }
        if (!patient.isChainedWithMainPatient) {
            await patientService.deleteOne(clientId, patient.email, {
                deletedAt: new Date()
            });
        }
        Object.assign(patient, {
            deletedAt: new Date()
        });
        await patient.save();
        this.listPatient(req, res)
    } catch (error) {
        console.error("Error in deleting the patient :", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};


exports.getPatientRoleId = async (req, res, next) => {
    try {
        const { clientId } = req.params;
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Role = clientConnection.model('clientRoles', clientRoleSchema);
        const role = await Role.findOne({ id: 17 });
        return res.status(statusCode.OK).send({
            message: "Patient role id found successfully",
            data: role,
        });
    } catch (error) {
        next(error);
    }
};


const CustomError = require("../../utils/customeError");
const getserialNumber = require("../../model/services/getserialNumber");


const commonIdCheck = async (data) => {
    try {
        if (!data.clientId) {
            throw new CustomError(statusCode.BadRequest, message.lblClinetIdIsRequired);
        }
        if (!data.branchId) {
            throw new CustomError(statusCode.BadRequest, message.lblBranchIRequired);
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




