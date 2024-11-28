


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
        const { clientId, branchId, roleId, businessUnit, firstName, lastName, email, phone, gender, age, bloodGroup, patientGroup, referedBy, city, state, country, password } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!firstName || !lastName || !email || !phone || !roleId || !city || !state || !country) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const Role = clientConnection.model('clientRoles', clientRoleSchema);
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchNotFound,
            });
        }
        const bu = await BusinessUnit.findById(businessUnit)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const role = await Role.findById(roleId);
        if (!role) {
            throw new CustomError(statusCode.Conflict, message.lblRoleNotFound);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = await patientService.create(clientId, {
            firstName,
            lastName,
            email,
            phone, city, state, country,
            gender, age, bloodGroup, patientGroup, referedBy,
            password: hashedPassword,
            branch: branchId,
            role: roleId,
            roleId: role.id,
            businessUnit: businessUnit,
            tc: true,
            isUserVerified: true,
            createdBy: mainUser._id,

        });
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const newPatientInstance = await Patient.create({
            firstName,
            lastName,
            email,
            phone, city, state, country,
            gender, age, bloodGroup, patientGroup, referedBy,
            branch: branchId,
            businessUnit: businessUnit,
            createdBy: mainUser._id,
        })
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
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!firstName || !lastName || !email || !phone || !city || !state || !country || !relation) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchNotFound,
            });
        }
        const bu = await BusinessUnit.findById(businessUnit)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }

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
        const { clientId, branchId, businessUnit, patientId, firstName, lastName, email, phone, gender, age, bloodGroup, patientGroup, referedBy, city, state, country } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId || !branchId || !businessUnit) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchNotFound,
            });
        }
        const bu = await BusinessUnit.findById(businessUnit)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
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
            phone, city, state, country,
            gender, age, bloodGroup, patientGroup, referedBy,
            branch: branchId,
            businessUnit: businessUnit,
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





