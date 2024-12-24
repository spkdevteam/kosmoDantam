// services/chairService.js
const { getClientDatabaseConnection } = require("../../db/connection");
const clinetUserSchema = require("../../client/model/user");
const clinetPatientSchema = require("../../client/model/patient");
const caseSheetSchema = require("../../client/model/caseSheet");
const departmentSchema = require("../../client/model/department");
const serviceSchema = require("../../client/model/service")

const message = require("../../utils/message");
const statusCode = require("../../utils/http-status-code");

const CustomError = require("../../utils/customeError");
const { default: mongoose } = require("mongoose");
const complaintSchema = require("../../client/model/complaint");
const { path } = require("../../model/patient");
const patientFindingsSchema = require("../../client/model/finding");
const medicalSchema = require("../../client/model/medical");
const procedureSchema = require("../../client/model/procedure");
const clinetBranchSchema = require("../../client/model/branch");

const checkOngoing = async (clientId, patientId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);

        const existing = await CaseSheet.find({
            patientId: patientId, 
            status: { $in: ['Proposed', 'In Progress'] },
        });

        return existing;
       
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const create = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);

        const newCheifComplaint = await CaseSheet.create(data);
        const populatedCaseSheet = await CaseSheet.findById(newCheifComplaint._id).populate({
            path: 'cheifComplaints.complaints.compId',
            model: Complaint,
            select: 'complaintName _id'
        })

        return populatedCaseSheet
        // return await CaseSheet.create(data);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};


const update = async (clientId, caseSheetId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);

        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        Object.assign(existing, data);

        await existing.save();

        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'cheifComplaints.complaints.compId',
            model: Complaint,
            select: 'complaintName _id'
        })

        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteCheifComplaints = async (clientId, caseSheetId, cheifComplaintId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);

        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const cheifComlaintArray = existing?.cheifComplaints;
        const mongObjId = new mongoose.Types.ObjectId(cheifComplaintId);
        const newCheifComplaint = cheifComlaintArray.filter((item) => {
            return !item._id.equals(mongObjId)
        });

        existing.cheifComplaints = newCheifComplaint;
        await existing.save();
        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'cheifComplaints.complaints.compId',
            model: Complaint,
            select: 'complaintName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};


const createClinicalFinding = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const newCheifComplaint = await CaseSheet.create(data);
        const populatedCaseSheet = await CaseSheet.findById(newCheifComplaint._id).populate({
            path: 'clinicalFindings.findings.findId',
            model: Finding,
            select: 'findingsName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const updateClinicalFinding = async (clientId, caseSheetId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        Object.assign(existing, data);
        await existing.save();
        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'clinicalFindings.findings.findId',
            model: Finding,
            select: 'findingsName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteClinicalFinding = async (clientId, caseSheetId, clinicalFindingId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const clinicalFindingsArray = existing?.clinicalFindings;
        const mongObjId = new mongoose.Types.ObjectId(clinicalFindingId);
        const newArray = clinicalFindingsArray.filter((item) => {
            return !item._id.equals(mongObjId)
        });
        existing.clinicalFindings = newArray;
        await existing.save();
        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'clinicalFindings.findings.findId',
            model: Finding,
            select: 'findingsName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};


const createMedicalHistory = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        // const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const Medical = clientConnection.model('medical', medicalSchema);

        const newCheifComplaint = await CaseSheet.create(data);
        const populatedCaseSheet = await CaseSheet.findById(newCheifComplaint._id).populate({
            path: 'medicalHistory.medicals.medId',
            model: Medical,
            select: 'caseName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const updateMedicalHistory = async (clientId, caseSheetId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        // const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const Medical = clientConnection.model('medical', medicalSchema);

        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        Object.assign(existing, data);
        await existing.save();
        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'medicalHistory.medicals.medId',
            model: Medical,
            select: 'caseName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};






const deleteMedicalHistory = async (clientId, caseSheetId, medicalHistoryId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Medical = clientConnection.model('medical', medicalSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const medicalHistoryArray = existing?.medicalHistory;
        const mongObjId = new mongoose.Types.ObjectId(medicalHistoryId);
        const newArray = medicalHistoryArray.filter((item) => {
            return !item._id.equals(mongObjId)
        });
        existing.medicalHistory = newArray;
        await existing.save();
        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'medicalHistory.medicals.medId',
            model: Medical,
            select: 'caseName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteInvestigation = async (clientId, caseSheetId, investigationId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const investigationArray = existing?.investigation;
        const mongObjId = new mongoose.Types.ObjectId(investigationId);
        const newArray = investigationArray.filter((item) => {
            return !item._id.equals(mongObjId)
        });
        existing.investigation = newArray;
        return await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteOtherAttachment = async (clientId, caseSheetId, otherAttachmentId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const otherAttachmentArray = existing?.otherAttachment;
        const mongObjId = new mongoose.Types.ObjectId(otherAttachmentId);
        const newArray = otherAttachmentArray.filter((item) => {
            return !item._id.equals(mongObjId)
        });
        existing.otherAttachment = newArray;
        return await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};



const createNote = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);

        const newCheifComplaint = await CaseSheet.create(data);
        const populatedCaseSheet = await CaseSheet.findById(newCheifComplaint._id)

        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const updateNote = async (clientId, caseSheetId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);

        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        Object.assign(existing, data);
        await existing.save();
        const populatedCaseSheet = await CaseSheet.findById(existing._id)
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteNote = async (clientId, caseSheetId, noteId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const noteArray = existing?.note;
        const mongObjId = new mongoose.Types.ObjectId(noteId);
        const newArray = noteArray.filter((item) => {
            return !item._id.equals(mongObjId)
        });
        existing.note = newArray;
        return await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};


const createOtherAttachment = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);

        const newCheifComplaint = await CaseSheet.create(data);
        const populatedCaseSheet = await CaseSheet.findById(newCheifComplaint._id)

        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};


const updateOtherAttachment = async (clientId, caseSheetId, dataObject) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);

        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }

        const previousData = existing.otherAttachment;

        const newData = [dataObject, ...previousData];

        existing.otherAttachment = newData;

        // console.log("newData",newData);

        return await existing.save();

    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const createInvestigation = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);

        const newCheifComplaint = await CaseSheet.create(data);
        const populatedCaseSheet = await CaseSheet.findById(newCheifComplaint._id)

        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const updateInvestigation = async (clientId, caseSheetId, dataObject) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);

        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }

        const previousData = existing.investigation;

        const newData = [dataObject, ...previousData];

        existing.investigation = newData;

        // console.log("newData",newData);

        return await existing.save();

    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};


const createService = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);

        const newCheifComplaint = await CaseSheet.create(data);
        const populatedCaseSheet = await CaseSheet.findById(newCheifComplaint._id).populate({
            path: 'services.department.deptId',
            model: Department,
            select: 'deptName _id'
        }).populate({
            path: 'services.service.servId',
            model: Service,
            select: 'serviceName _id'
        })

        return populatedCaseSheet
        // return await CaseSheet.create(data);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const updateService = async (clientId, caseSheetId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);

        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        Object.assign(existing, data);

        await existing.save();

        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'services.department.deptId',
            model: Department,
            select: 'deptName _id'
        }).populate({
            path: 'services.service.servId',
            model: Service,
            select: 'serviceName _id'
        })

        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};



const deleteServices = async (clientId, caseSheetId, serviceId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const array = existing?.services;
        const mongObjId = new mongoose.Types.ObjectId(serviceId);
        const newArray = array.filter((item) => {
            return !item._id.equals(mongObjId)
        });
        existing.services = newArray;
        await existing.save();
        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'services.department.deptId',
            model: Department,
            select: 'deptName _id'
        }).populate({
            path: 'services.service.servId',
            model: Service,
            select: 'serviceName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const updateProcedure = async (clientId, caseSheetId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema)


        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        Object.assign(existing, data);

        await existing.save();

        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'procedures.procedure.procedId',
            model: procedures,
            select: 'procedureName _id'
        }).populate({
            path: 'procedures.service.servId',
            model: Service,
            select: 'serviceName _id'
        })

        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteProcedure = async (clientId, caseSheetId, procedureId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema);

        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const array = existing?.procedures;
        const mongObjId = new mongoose.Types.ObjectId(procedureId);
        const newArray = array.filter((item) => {
            return !item._id.equals(mongObjId)
        });
        existing.procedures = newArray;
        await existing.save();
        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'procedures.procedure.procedId',
            model: procedures,
            select: 'procedureName _id'
        }).populate({
            path: 'procedures.service.servId',
            model: Service,
            select: 'serviceName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const list = async (clientId, filters = {}, options = { page: 1, limit: 10 }) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const { page, limit } = options;
        const skip = (page - 1) * limit;
        const [patients, total] = await Promise.all([
            CaseSheet.find(filters).skip(skip).limit(limit).sort({ _id: -1 }),
            CaseSheet.countDocuments(filters),
        ]);
        return { count: total, patients };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing patient: ${error.message}`);
    }
};

const listDrafted = async (clientId, filters = {}) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const [caseSheets] = await Promise.all([
            CaseSheet.find(filters).sort({ _id: -1 }).populate({
                path: 'cheifComplaints.complaints.compId',
                model: Complaint,
                select: 'complaintName _id'
            }).populate({
                path: 'patientId',
                model: Patient,
                select: 'firstName lastName displayId'
            }),
        ]);
        // const populatedCaseSheet = await CaseSheet.findById(newCheifComplaint._id).populate({
        //     path: 'cheifComplaints.complaints.compId',
        //     model: Complaint,
        //     select: 'complaintName _id'
        // })
        return { caseSheets };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing patient: ${error.message}`);
    }
};

const getById = async (clientId, caseSheetId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const Medical = clientConnection.model('medical', medicalSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema)


        const caseSheet = await CaseSheet.findById(caseSheetId).populate({
            path: 'cheifComplaints.complaints.compId',
            model: Complaint,
            select: 'complaintName _id'
        }).populate({
            path: 'clinicalFindings.findings.findId',
            model: Finding,
            select: 'findingsName _id'
        }).populate({
            path: 'medicalHistory.medicals.medId',
            model: Medical,
            select: 'caseName _id'
        }).populate({
            path: 'services.department.deptId',
            model: Department,
            select: 'deptName _id'
        }).populate({
            path: 'services.service.servId',
            model: Service,
            select: 'serviceName _id'
        }).populate({
            path: 'procedures.procedure.procedId',
            model: procedures,
            select: 'procedureName _id'
        }).populate({
            path: 'procedures.service.servId',
            model: Service,
            select: 'serviceName _id'
        });

        if (!caseSheet) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        return caseSheet;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error getting case sheet: ${error.message}`);
    }
};

const updateTreatmentProcedure = async (clientId, caseSheetId, procedureId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const existing = await CaseSheet.findById(caseSheetId).populate({
            path: 'cheifComplaints.complaints.compId',
            model: Complaint,
            select: 'complaintName _id'
        });
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const newProcedureArray = existing?.procedures?.map((item) => {
            if (item?._id == procedureId) {
                item.finished = true
            } else {
                return item
            }
        })
        existing.procedures = newProcedureArray
        return await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error in updating treatment procedure: ${error.message}`);
    }
};




const updateDraft = async (clientId, caseSheetId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);

        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        Object.assign(existing, data);
        return await existing.save();

    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const listAllCases = async (clientId, filters = {}) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const User = clientConnection.model('clientUsers', clinetUserSchema);


        const [caseSheets] = await Promise.all([
            CaseSheet.find(filters).sort({ _id: -1 }).populate({
                path: 'cheifComplaints.complaints.compId',
                model: Complaint,
                select: 'complaintName _id'
            }).populate({
                path: 'patientId',
                model: Patient,
                select: 'firstName lastName patientGroup displayId'
            }).populate({
                path: 'branchId',
                model: Branch,
                select: 'name displayId _id'
            }).populate({
                path: 'createdBy',
                model: User,
                select: 'firstName lastName _id'
            }),
        ]);
        return { caseSheets };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing patient: ${error.message}`);
    }
};

module.exports = {

    checkOngoing,

    create,
    update,
    deleteCheifComplaints,

    createClinicalFinding,
    updateClinicalFinding,
    deleteClinicalFinding,

    createMedicalHistory,
    updateMedicalHistory,
    deleteMedicalHistory,


    deleteInvestigation,
    deleteOtherAttachment,

    createNote,
    updateNote,
    deleteNote,

    createOtherAttachment,
    updateOtherAttachment,

    createInvestigation,
    updateInvestigation,

    createService,
    updateService,
    deleteServices,

    updateProcedure,
    deleteProcedure,

    list,
    getById,
    updateTreatmentProcedure,
    listDrafted,
    updateDraft,

    listAllCases
};
