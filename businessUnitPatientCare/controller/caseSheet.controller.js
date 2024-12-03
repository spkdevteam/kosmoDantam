



const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const clinetChairSchema = require("../../client/model/chair");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit")



const cheifComplaintsService = require("../services/caseSheet.service");
const getserialNumber = require("../../model/services/getserialNumber");






// create cheif complaints by business unit
exports.createCheifComplaints = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, cheifComplaints, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!cheifComplaints) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const newCheifComplaint = await cheifComplaintsService.createCheifComplaints(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, cheifComplaints, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblCheifComplaintsCreatedSuccess,
            data: { caseSheetId: newCheifComplaint._id },
        });
    } catch (error) {
        next(error)
    }
};

// update cheif complaints by busines unit
exports.updateCheifComplaints = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, cheifComplaints, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!cheifComplaints) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const newCheifComplaint = await cheifComplaintsService.updateCheifComplaints(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, cheifComplaints,
        });
        return res.status(statusCode.OK).send({
            message: message.lblCheifComplaintsUpdatedSuccess,
            data: { caseSheetId: newCheifComplaint._id },
        });
    } catch (error) {
        next(error)
    }
};

// delete cheif complaints by business unit
exports.deleteCheifComplaints = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, cheifComplaintId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!cheifComplaintId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblCheifComplaintsIdRequired,
            });
        }
        const deleted = await cheifComplaintsService.deleteCheifComplaints(clientId, caseSheetId, cheifComplaintId);
        return res.status(statusCode.OK).send({
            message: message.lblCheifComplaintsDeletedSuccess,
            data: { caseSheetId: deleted?._id }
        });
    } catch (error) {
        next(error)
    }
};





// create clinical finding by business unit
exports.createClinicalFinding = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, clinicalFindings, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!clinicalFindings) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const created = await cheifComplaintsService.createClinicalFinding(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, clinicalFindings, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblClinicalFindingCreatedSuccess,
            data: { caseSheetId: created._id },
        });
    } catch (error) {
        next(error)
    }
};

// update clinical finding by busines unit
exports.updateClinicalFinding = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, clinicalFindings, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!clinicalFindings) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const newCheifComplaint = await cheifComplaintsService.updateClinicalFinding(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, clinicalFindings,
        });
        return res.status(statusCode.OK).send({
            message: message.lblClinicalFindingUpdatedSuccess,
            data: { caseSheetId: newCheifComplaint._id },
        });
    } catch (error) {
        next(error)
    }
};

// delete clinical finding by business unit
exports.deleteClinicalFinding = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, clinicalFindingId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!clinicalFindingId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinicalFindingIdRequired,
            });
        }
        const deleted = await cheifComplaintsService.deleteClinicalFinding(clientId, caseSheetId, clinicalFindingId);
        return res.status(statusCode.OK).send({
            message: message.lblClinicalFindingDeletedSuccess,
            data: { caseSheetId: deleted?._id }
        });
    } catch (error) {
        next(error)
    }
};






// create medical history by business unit
exports.createMedicalHistory = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, medicalHistory, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!medicalHistory) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const created = await cheifComplaintsService.createMedicalHistory(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, medicalHistory, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblMedicalHistoryCreatedSuccess,
            data: { caseSheetId: created._id },
        });
    } catch (error) {
        next(error)
    }
};

// update medical history by busines unit
exports.updateMedicalHistory = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, medicalHistory, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!medicalHistory) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const updated = await cheifComplaintsService.updateMedicalHistory(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, medicalHistory,
        });
        return res.status(statusCode.OK).send({
            message: message.lblMedicalHistoryUpdatedSuccess,
            data: { caseSheetId: updated._id },
        });
    } catch (error) {
        next(error)
    }
};

// delete medical history by business unit
exports.deleteMedicalHistory = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, medicalHistoryId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!medicalHistoryId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblMedicalHistoryIdRequired,
            });
        }
        const deleted = await cheifComplaintsService.deleteMedicalHistory(clientId, caseSheetId, medicalHistoryId);
        return res.status(statusCode.OK).send({
            message: message.lblMedicalHistoryDeletedSuccess,
            data: { caseSheetId: deleted?._id }
        });
    } catch (error) {
        next(error)
    }
};

// create investigation by business unit
exports.createInvestigation = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, investigationObject, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!investigationObject) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        let  dataObject = {
            ...investigationObject,

        }
        if (req.file?.filename) {
            dataObject.file = req.file.filename;
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const created = await cheifComplaintsService.createInvestigation(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, investigation : [dataObject], displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblInvestigationCreatedSuccess,
            data: { caseSheetId: created._id },
        });
    } catch (error) {
        next(error)
    }
};

// update investigation by busines unit
exports.updateInvestigation = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, investigationObject, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!investigationObject) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        let  dataObject = {
            ...investigationObject,

        }
        if (req.file && req.file?.filename) {
            dataObject.file = req.file.filename;
        }
        const updated = await cheifComplaintsService.updateInvestigation(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, investigation : [dataObject],
        });
        return res.status(statusCode.OK).send({
            message: message.lblInvestigationUpdatedSuccess,
            data: { caseSheetId: updated._id },
        });
    } catch (error) {
        next(error)
    }
};

// delete investigation by business unit
exports.deleteInvestigation = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, investigationId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!investigationId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblInvestigationIdRequired,
            });
        }
        const deleted = await cheifComplaintsService.deleteInvestigation(clientId, caseSheetId, investigationId);
        return res.status(statusCode.OK).send({
            message: message.lblInvestigationDeletedSuccess,
            data: { caseSheetId: deleted?._id }
        });
    } catch (error) {
        next(error)
    }
};

// create other attachment by business unit
exports.createOtherAttachment = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, otherAttachmentObject, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!otherAttachmentObject) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        let  dataObject = {
            ...otherAttachmentObject,

        }
        if (req.file?.filename) {
            dataObject.file = req.file.filename;
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const created = await cheifComplaintsService.createOtherAttachment(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, otherAttachment : [dataObject], displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblOtherAttachmentCreatedSuccess,
            data: { caseSheetId: created._id },
        });
    } catch (error) {
        next(error)
    }
};

// update other attachment by busines unit
exports.updateOtherAttachment = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, otherAttachmentObject, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!otherAttachmentObject) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        let  dataObject = {
            ...otherAttachmentObject,

        }
        if (req.file && req.file?.filename) {
            dataObject.file = req.file.filename;
        }
        const updated = await cheifComplaintsService.updateOtherAttachment(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, otherAttachment : [dataObject],
        });
        return res.status(statusCode.OK).send({
            message: message.lblOtherAttachmentUpdatedSuccess,
            data: { caseSheetId: updated._id },
        });
    } catch (error) {
        next(error)
    }
};

// delete other attachment by business unit
exports.deleteOtherAttachment = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, otherAttachmentId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!otherAttachmentId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblInvestigationIdRequired,
            });
        }
        const deleted = await cheifComplaintsService.deleteOtherAttachment(clientId, caseSheetId, otherAttachmentId);
        return res.status(statusCode.OK).send({
            message: message.lblOtherAttachmentDeletedSuccess,
            data: { caseSheetId: deleted?._id }
        });
    } catch (error) {
        next(error)
    }
};












// create notes by business unit
exports.createNotes = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, note, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!note) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const created = await cheifComplaintsService.createMedicalHistory(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, note, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblNoteCreatedSuccess,
            data: { caseSheetId: created._id },
        });
    } catch (error) {
        next(error)
    }
};

// update notes by busines unit
exports.updateNotes = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, note, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!note) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const updated = await cheifComplaintsService.updateMedicalHistory(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, note,
        });
        return res.status(statusCode.OK).send({
            message: message.lblNoteUpdatedSuccess,
            data: { caseSheetId: updated._id },
        });
    } catch (error) {
        next(error)
    }
};

// delete notes by business unit
exports.deleteNotes = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, noteId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!noteId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblNoteIdRequired,
            });
        }
        const deleted = await cheifComplaintsService.deleteMedicalHistory(clientId, caseSheetId, noteId);
        return res.status(statusCode.OK).send({
            message: message.lblNoteDeletedSuccess,
            data: { caseSheetId: deleted?._id }
        });
    } catch (error) {
        next(error)
    }
};


















// create services by business unit
exports.createServices = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, services, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!services) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const newCheifComplaint = await cheifComplaintsService.createServices(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, services, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblServicesCreatedSuccess,
            data: { caseSheetId: newCheifComplaint._id },
        });
    } catch (error) {
        next(error)
    }
};

// update services by busines unit
exports.updateServices = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, services, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!services) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const newCheifComplaint = await cheifComplaintsService.updateServices(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, services,
        });
        return res.status(statusCode.OK).send({
            message: message.lblServicesUpdatedSuccess,
            data: { caseSheetId: newCheifComplaint._id },
        });
    } catch (error) {
        next(error)
    }
};

// delete services by business unit
exports.deleteServices = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, serviceId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!cheifComplaintId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblCheifComplaintsIdRequired,
            });
        }
        const deleted = await cheifComplaintsService.deleteServices(clientId, caseSheetId, serviceId);
        return res.status(statusCode.OK).send({
            message: message.lblServicesDeletedSuccess,
            data: { caseSheetId: deleted?._id }
        });
    } catch (error) {
        next(error)
    }
};



/// ---------------------------------




// create procedure by business unit
exports.createProcedure = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, procedures, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!procedures) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const newCheifComplaint = await cheifComplaintsService.createServices(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, services, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblServicesCreatedSuccess,
            data: { caseSheetId: newCheifComplaint._id },
        });
    } catch (error) {
        next(error)
    }
};

// update procedure by busines unit
exports.updateProcedure = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, services, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        if (!branchId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIRequired,
            });
        }
        if (!businessUnitId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitIdIsRequired,
            });
        }
        if (!services) {
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
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const newCheifComplaint = await cheifComplaintsService.updateServices(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, services,
        });
        return res.status(statusCode.OK).send({
            message: message.lblServicesUpdatedSuccess,
            data: { caseSheetId: newCheifComplaint._id },
        });
    } catch (error) {
        next(error)
    }
};

// delete procedure by business unit
exports.deleteProcedure = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, serviceId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!cheifComplaintId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblCheifComplaintsIdRequired,
            });
        }
        const deleted = await cheifComplaintsService.deleteServices(clientId, caseSheetId, serviceId);
        return res.status(statusCode.OK).send({
            message: message.lblServicesDeletedSuccess,
            data: { caseSheetId: deleted?._id }
        });
    } catch (error) {
        next(error)
    }
};