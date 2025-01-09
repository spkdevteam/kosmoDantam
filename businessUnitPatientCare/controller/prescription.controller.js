


const bcrypt = require("bcrypt");


const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const clinetUserSchema = require("../../client/model/user");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit");
const caseSheetSchema = require("../../client/model/caseSheet")

const clientRoleSchema = require("../../client/model/role");
const clinetPatientSchema = require("../../client/model/patient")

const RoleModel = require("../../model/role");
const MasterUser = require("../../model/user")

const prescriptionService = require("../services/prescription.service")
const {list} = require('../services/prescription.service')

// create prescription by business unit
exports.createPrescription = async (req, res, next) => {
    try {
        const data =await sanitizeBody(req.body)
        const result = await prescriptionService.create(data)
        res.json(result)
    } catch (error) {
        next(error)
    }
};

// update prescription by business unit
exports.updatePrescription = async (req, res, next) => {
    try {
        const { clientId, branchId, buId, patientId, doctorId, caseSheetId, prescriptionId, drugArray } = req.body;
        await commonIdCheck({ clientId, branchId, buId, patientId, doctorId, caseSheetId });
        if (!drugArray) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const updated = await prescriptionService.update(clientId, prescriptionId, {
            drugArray,
        })
        return res.status(statusCode.OK).send({
            message: message.lblPrescriptionUpdatedSuccess,
            data: { prescriptionId: updated?._id }
        });
    } catch (error) {
        next(error);
    }
};

// get particular prescription by business unit
exports.getParticularPrescription = async (req, res, next) => {
    try {
        const { clientId, prescriptionId } = req.params;
        if (!clientId || !prescriptionId) {
            return res.status(400).send({
                message: message.lblPrescriptionIdIdAndClientIdRequired,
            });
        }
        const prescription = await prescriptionService.getById(clientId, prescriptionId);
        return res.status(200).send({
            message: message.lblPrescriptionFoundSucessfully,
            data: prescription,
        });
    } catch (error) {
        next(error)
    }
};

// pataint prescription list
exports.pataintPrescriptionList = async (req, res, next) => {
    try {
        const { clientId, pataintId, keyword = '', page = 1, perPage = 10, } = req.query;
        if (!clientId || !pataintId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdIdAndClientIdRequired,
            });
        }
        const filters = {
            deletedAt: null,
            patientId : pataintId,
            ...(keyword && {
                $or: [
                ],
            }),
        };
        const result = await prescriptionService.list(clientId, filters, { page, limit: perPage });
        return res.status(statusCode.OK).send({
            message: message.lblPrescriptionFoundSucessfully,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// list prescription by business unit
exports.listPrescription = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        const {clientId, keyword,  page,patientId, perPage,branchId,buId} = data
        const filters = {
            deletedAt: null,
           
        };

        // ...(keyword && {
        //     $or: [{}
        //     ],
        // }),

         const result = await prescriptionService.readPrescription({clientId,buId,patientId,keyword, filters,branchId, page, perPage})
            return res.status(statusCode.OK).send(result);
    } catch (error) {
        next(error);
    }
};

 







const CustomError = require("../../utils/customeError");
const sanitizeBody = require("../../utils/sanitizeBody");


const commonIdCheck = async (data) => {
    try {
        if (!data.clientId) {
            throw new CustomError(statusCode.BadRequest, message.lblClinetIdIsRequired);
        }
        if (!data.branchId) {
            throw new CustomError(statusCode.BadRequest, message.lblBranchIRequired);
        }
        if (!data.buId) {
            throw new CustomError(statusCode.BadRequest, message.lblBusinessUnitIdIsRequired);
        }
        if (!data.patientId) {
            throw new CustomError(statusCode.BadRequest, message.lblPatientIdRequired);
        }
        if (!data.doctorId) {
            throw new CustomError(statusCode.BadRequest, message.lblDoctorIdRequired);
        }
        if (!data.caseSheetId) {
            throw new CustomError(statusCode.BadRequest, message.lblCaseSheetIdIdRequired);
        }
        const clientConnection = await getClientDatabaseConnection(data.clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const Pataint = clientConnection.model('patient', clinetPatientSchema);
        const User = clientConnection.model('clientUsers', clinetUserSchema);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const branch = await Branch.findById(data.branchId);
       
        if (!branch) {
            throw new CustomError(statusCode.BadRequest, message.lblBranchNotFound);
        }
        const bu = await BusinessUnit.findById(data.buId)
        if (!bu) {
            throw new CustomError(statusCode.BadRequest, message.lblBusinessUnitNotFound);
        }
        const pataint = await Pataint.findById(data.patientId)
        if (!pataint) {
            throw new CustomError(statusCode.BadRequest, message.lblPatientNotFound);
        }
        const doctor = await User.findById(data.doctorId)
        if (!doctor) {
            throw new CustomError(statusCode.BadRequest, message.lblDoctorNotFound);
        }
        const caseSheet = await CaseSheet.findById(data.caseSheetId);
        if (!caseSheet) {
            throw new CustomError(statusCode.BadRequest, message.lblCaseSheetNotFound);
        }
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating prescription: ${error.message}`);
    }
}




