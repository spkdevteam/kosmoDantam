// services/chairService.js
const { v4: uuidv4 } = require('uuid');

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
const appointmentSchema = require('../../client/model/appointments');
const { validateObjectId } = require('../../businessUnitAdministration/services/validate.serialNumber');
const clinetChairSchema = require('../../client/model/chair');
const getserialNumber = require('../../model/services/getserialNumber');

const checkOngoing = async (clientId, patientId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);

        const existing = await CaseSheet.find({
            patientId: patientId,
            drafted: false,
            status: { $in: ['Proposed', 'In Progress'] },
        });

        const anyDrafted = await CaseSheet.find({
            patientId: patientId,
            drafted: true,
        });


        return { existing, anyDrafted };

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

const createDiagnosis = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const newCheifComplaint = await CaseSheet.create(data);
        const populatedCaseSheet = await CaseSheet.findById(newCheifComplaint._id).populate({
            path: 'diagnosis.findings.findId',
            model: Finding,
            select: 'findingsName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};


const updateDiagnosis = async (clientId, caseSheetId, data) => {
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
            path: 'diagnosis.findings.findId',
            model: Finding,
            select: 'findingsName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};


const deleteDiagnosis = async (clientId, caseSheetId, diagnosisId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const diagnosisArray = existing?.diagnosis;
        const mongObjId = new mongoose.Types.ObjectId(diagnosisId);
        const newArray = diagnosisArray.filter((item) => {
            return !item._id.equals(mongObjId)
        });
        existing.diagnosis = newArray;
        await existing.save();
        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'diagnosis.findings.findId',
            model: Finding,
            select: 'findingsName _id'
        })
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting diagnosis of case sheet: ${error.message}`);
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
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema)
        const newCheifComplaint = await CaseSheet.create(data);
        const populatedCaseSheet = await CaseSheet.findById(newCheifComplaint._id).populate({
            path: 'otherAttachment.procedure.procedId',
            model: procedures,
            select: 'procedureName _id'
        }).populate({
            path: 'otherAttachment.service.servId',
            model: Service,
            select: 'serviceName _id'
        });

        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating other attachment of case sheet: ${error.message}`);
    }
};


const updateOtherAttachment = async (clientId, caseSheetId, dataObject) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema)
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const previousData = existing.otherAttachment;
        const newData = [dataObject, ...previousData];
        existing.otherAttachment = newData;
        await existing.save();
        const populatedCaseSheet = await CaseSheet.findById(caseSheetId).populate({
            path: 'otherAttachment.procedure.procedId',
            model: procedures,
            select: 'procedureName _id'
        }).populate({
            path: 'otherAttachment.service.servId',
            model: Service,
            select: 'serviceName _id'
        });
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error updating other attachment of case sheet: ${error.message}`);
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


const createService = async (clientId, isDrafted, data) => {
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


        if (isDrafted !== true) {

            let existingTreatmentData3 = populatedCaseSheet.treatmentData3 || [];
            let newServices = populatedCaseSheet.services;

            // Map existing treatmentData3 for quick lookup
            let treatmentMap = new Map();
            existingTreatmentData3.forEach(item => {
                treatmentMap.set(item.tooth, item);
            });

            // newServices.forEach(serviceItem => {fix=>replacing forEach with for-of as async operation needed
            for (const serviceItem of newServices) {
                let { tooth, service } = serviceItem;
                const getServiceName = await Service.findOne({ _id: service?.servId, deletedAt: null });
                if (!getServiceName) return { status: false, message: "Service doesn't exist!!" };
                tooth.forEach(t => {
                    if (treatmentMap.has(t)) {
                        // Update existing tooth services
                        let existingToothData = treatmentMap.get(t);
                        // let serviceExists = existingToothData.service.some(s => s.service.serviceName === service.servId.serviceName);
                        let serviceExists = existingToothData.service.some(s => String(s.service.serviceName) === String(getServiceName?.serviceName));//fix
                        if (!serviceExists) {
                            existingToothData.service.push({
                                // service: { serviceName: service.servId.serviceName },
                                service: { serviceName: String(getServiceName?.serviceName), serviceId: service?.servId },//fix
                                finished: "In Progress",
                                updatedAt: new Date(),
                            });
                        }
                    } else {
                        // Add new tooth entry
                        treatmentMap.set(t, {
                            tooth: t,
                            service: [
                                {
                                    // service: { serviceName: service.servId.serviceName },
                                    service: { serviceName: String(getServiceName?.serviceName), serviceId: service?.servId },//fix
                                    finished: "In Progress",
                                    updatedAt: new Date(),
                                }
                            ],
                            total: 1,
                            completed: 0,
                        });
                    }
                });
            };
            // Convert map back to array
            populatedCaseSheet.treatmentData3 = Array.from(treatmentMap.values());
            await populatedCaseSheet.save();

        }

        return populatedCaseSheet
        // return await CaseSheet.create(data);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};


// new service to create service
const createServiceNew = async (clientId, isDrafted, data, services) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);

        console.log("services", services);

        const newSheet = await CaseSheet.create(data);
        const populatedCaseSheet = await CaseSheet.findById(newSheet._id);

        let existingTreatmentData3 = populatedCaseSheet.treatmentData3 || [];
        let newServices = services;

        let treatmentMap = new Map();
        existingTreatmentData3.forEach(item => {
            treatmentMap.set(item.tooth, item);
        });

        newServices.forEach(serviceItem => {
            let { tooth, service, department, prposedDate, rate, quaintity, subTotal, discount, grantTotal, } = serviceItem;
            tooth.forEach(t => {
                if (treatmentMap.has(t)) {
                    let existingToothData = treatmentMap.get(t);
                    let serviceExists = existingToothData.service.some(s => {
                        console.log("s.service.serviceName.servId ", s.service.serviceName.servId.toString());
                        console.log("service.servId", service.servId.toString());

                        return s.service.serviceName.servId.toString() === service.servId.toString();
                    });

                    if (!serviceExists) {
                        existingToothData.service.push({
                            service: { serviceName: { servId: service.servId } },
                            department: { deptId: department.deptId },
                            finished: "Proposed",
                            updatedAt: new Date(),
                            rate: rate,
                            discount: discount,
                            quaintity: quaintity,
                            subTotal: subTotal,
                            grantTotal: grantTotal,
                            prposedDate: prposedDate,
                        });
                    }

                } else {
                    treatmentMap.set(t, {
                        tooth: t,
                        service: [
                            {
                                service: { serviceName: { servId: service.servId } },
                                finished: "Proposed",
                                updatedAt: new Date(),
                                department: { deptId: department.deptId },
                                rate: rate,
                                discount: discount,
                                quaintity: quaintity,
                                subTotal: subTotal,
                                grantTotal: grantTotal,
                                prposedDate: prposedDate,
                            }
                        ],
                        total: 1,
                        completed: 0,
                    });
                }
            });
        });

        console.log("Updated treatmentData3:", Array.from(treatmentMap.values()));

        // Convert map back to array
        populatedCaseSheet.treatmentData3 = Array.from(treatmentMap.values());
        await populatedCaseSheet.save();


        const newPopulatedCaseSheet = await CaseSheet.findById(newSheet._id).populate({
            path: 'treatmentData3.service.department.deptId',
            model: Department,
            select: 'deptName _id'
        }).populate({
            path: 'treatmentData3.service.service.serviceName.servId',
            model: Service,
            select: 'serviceName _id'
        })

        return newPopulatedCaseSheet;
    } catch (error) {
        throw new CustomError(
            error.statusCode || 500,
            `Error creating service of case sheet: ${error.message}`
        );
    }
};


// new 1
const createService1 = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Service = clientConnection.model('services', serviceSchema);

        // Fetch existing case sheet
        let existingCaseSheet = await CaseSheet.findOne({ patientId: data.patientId, branchId: data.branchId });

        if (!existingCaseSheet) {
            existingCaseSheet = await CaseSheet.create(data);
        } else {
            // Extract existing treatmentData3
            let existingTreatmentData3 = existingCaseSheet.treatmentData3 || [];
            let newServices = data.services;

            // Map existing treatmentData3 for quick lookup
            let treatmentMap = new Map();
            existingTreatmentData3.forEach(item => {
                treatmentMap.set(item.tooth, item);
            });

            newServices.forEach(serviceItem => {
                let { tooth, service } = serviceItem;
                tooth.forEach(t => {
                    if (treatmentMap.has(t)) {
                        // Update existing tooth services
                        let existingToothData = treatmentMap.get(t);
                        let serviceExists = existingToothData.service.some(s => s.service.serviceName === service.servId);

                        if (!serviceExists) {
                            existingToothData.service.push({
                                service: { serviceName: service.servId },
                                finished: "In Progress",
                                updatedAt: new Date(),
                            });
                        }
                    } else {
                        // Add new tooth entry
                        treatmentMap.set(t, {
                            tooth: t,
                            service: [
                                {
                                    service: { serviceName: service.servId },
                                    finished: "In Progress",
                                    updatedAt: new Date(),
                                }
                            ],
                            total: 1,
                            completed: 0,
                        });
                    }
                });
            });

            // Convert map back to array
            existingCaseSheet.treatmentData3 = Array.from(treatmentMap.values());
            Object.assign(existingCaseSheet, data);
            await existingCaseSheet.save();
        }

        const populatedCaseSheet = await CaseSheet.findById(existingCaseSheet._id).populate({
            path: 'services.service.servId',
            model: Service,
            select: 'serviceName _id'
        });

        return populatedCaseSheet;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating/updating service in case sheet: ${error.message}`);
    }
};


function transformServiceToTreatment(existingData, newProcedures) {
    const toothMap = new Map();

    // Populate the map with existing treatmentData2
    existingData.forEach(({ tooth, service, total, completed }) => {
        if (!toothMap.has(tooth)) {
            toothMap.set(tooth, { tooth: tooth, service: [], total, completed });
        }
        service.forEach((s) => {
            const existingService = toothMap.get(tooth).service.find(
                (sv) => sv.service.serviceName === s.service.serviceName
            );
            if (existingService) {
                existingService.procedure.push(...s.procedure);
            } else {
                toothMap.get(tooth).service.push(s);
            }
        });
    });

    // Add new data from newProcedures
    newProcedures.forEach((item) => {
        const { tooth, service, procedure } = {
            tooth: item.tooth,
            service: {
                serviceName: item.service.servId?.serviceName,
            },
            procedure: item.procedure?.map((p) => ({
                procedureName: p.procedId?.procedureName,
            })),
        };

        tooth.forEach((t) => {
            if (!toothMap.has(t)) {
                toothMap.set(t, { tooth: t, service: [], total: 0, completed: 0 });
            }

            const toothEntry = toothMap.get(t);
            const existingService = toothEntry.service.find(
                (sv) => sv.service.serviceName === service.serviceName
            );

            if (existingService) {
                const existingProcedures = existingService.procedure.map((p) => p.procedureName);
                procedure.forEach((p) => {
                    if (!existingProcedures.includes(p.procedureName)) {
                        existingService.procedure.push(p);
                        toothEntry.total += 1; // Increment total for new procedures
                    }
                });
            } else {
                toothEntry.service.push({
                    service,
                    procedure,
                });
                toothEntry.total += 1; // Increment total for a new service
            }
        });
    });

    return Array.from(toothMap.values());
}

const updateService = async (clientId, caseSheetId, isDrafted, data) => {
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


        // const treatmentData3 = data.services.map(service => ({
        //     tooth: service.tooth || null,
        //     service: [{
        //         service: {
        //             serviceName: service.serviceName || null,
        //             finished: 'In Progress',
        //             updatedAt: new Date()
        //         },
        //         procedure: [] // Empty procedure array as required
        //     }],
        //     total: service.quaintity || 0,
        //     completed: 0
        // }));



        Object.assign(existing, data);

        await existing.save();

        const populatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'services.department.deptId',
            model: Department,
            select: 'deptName _id'
        }).populate({
            path: 'services.service.servId',
            model: Service,
            select: 'serviceName _id rate'
        })

        if (isDrafted !== true) {

            let existingTreatmentData3 = populatedCaseSheet.treatmentData3 || [];
            let newServices = populatedCaseSheet.services;

            // Map existing treatmentData3 for quick lookup
            // let treatmentMap = new Map();
            // existingTreatmentData3.forEach(item => {
            //     treatmentMap.set(item.tooth, item);
            // });
            let treatmentMap = {};
            existingTreatmentData3.forEach(item => {
                treatmentMap[item.tooth] = item;
            });
            // console.log("existingTreatmentData3=>", existingTreatmentData3);
            // console.log("newServices=>", newServices);
            // return newServices;

            // newServices.forEach(serviceItem => {
            for (const serviceItem of newServices) {//fix->replaced forEach with for-of as async needed 
                let { tooth, service, rate, department, prposedDate,discount } = serviceItem;
                const teethCount = parseInt(serviceItem?.tooth?.length);
                if(teethCount == 0) return {status : false, message: "Atleast one tooth is required" };
                const discountForEachTooth = (discount/teethCount);
                // tooth.forEach(t => {
                for (const t of tooth) {//fix->replaced forEach with for-of as async needed 
                    if (treatmentMap[t]) {
                        // Update existing tooth services
                        let existingToothData = treatmentMap[t];
                        let serviceExists = existingToothData.service.some(s => {
                            console.log("kasif", service);
                            console.log("aatif", s);
                            //fix->
                            // if (s.service.serviceName === service.servId.serviceName) {
                            console.log("s?.service?.serviceName=>", String(s?.service?.serviceName));
                            console.log("service?.servId?.serviceName=>>", String(service?.servId?.serviceName));


                            if (String(s?.service?.serviceName) === String(service?.servId?.serviceName)) {
                                return s
                            }
                        });

                        if (!serviceExists) {
                            //fix:=>
                            console.log("not_exist=>>", service?.servId?.serviceName);
                            const newPush = {
                                service: {
                                    // service: { serviceName: service.servId.serviceName },
                                    serviceName: service.servId?.serviceName,//fix
                                    serviceId: service.servId?._id,//fix
                                    finished: "Proposed",//in code it was 'In Progress'
                                    unitPrice: rate,
                                    discount :  parseFloat(discountForEachTooth.toFixed(2)),
                                    updatedAt: new Date(),
                                    prposedDate : prposedDate,
                                    departmentId : department?.deptId
                                }
                            };
                            //
                            treatmentMap[t].service.push(newPush);
                            //
                            // console.log("newPush=>",newPush);
                            // console.log("after_push=>>", treatmentMap[t].service);
                            // const val = JSON.parse(JSON.stringify(existingToothData.service))
                            // val.push(newPush);

                            // existingToothData.service = val;

                            // existingToothData.service.push({
                            //     // service: { serviceName: service.servId.serviceName },
                            //     serviceName : service.servId?.serviceName,//fix
                            //     serviceId : service.servId?._id,//fix
                            //     finished: "In Progress",
                            //     unitPrice: rate,
                            //     updatedAt: new Date(),
                            // });
                        }
                    } else {
                        // Add new tooth entry
                        //fix:=>
                        console.log("new tooth entry=>>", service.servId?.serviceName);
                        treatmentMap[t] = {
                            tooth: t,
                            service: [{
                                service: {
                                    // service: { serviceName: service.servId.serviceName },
                                    serviceName: service.servId?.serviceName,//fix
                                    serviceId: service.servId?._id,//fix
                                    finished: "Proposed",//in code it was 'In Progress'
                                    updatedAt: new Date(),
                                    unitPrice: rate,
                                    discount :  parseFloat(discountForEachTooth.toFixed(2)),
                                    prposedDate : prposedDate,
                                    departmentId : department?.deptId
                                }
                            }
                            ],
                            total: 1,
                            completed: 0,
                        };
                    }
                };
            };
            // Array.from(treatmentMap.values()).map(element=>{
            //     element.service.map(e=>{
            //         console.log("treatmentMap=>>>",e.service);

            //     })
            // })

            // Convert map back to array
            populatedCaseSheet.treatmentData3 = Object.values(treatmentMap);
            populatedCaseSheet.markModified('treatmentData3');
            // populatedCaseSheet.treatmentData3.map(e=>{
            //     e.service.map(el=>{
            //         console.log("el.service=>>",el.service);    
            //     })
            // });
            await populatedCaseSheet.save();
        }
        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};


// new service to update service
const updateServiceNew = async (clientId, caseSheetId, isDrafted, data, services) => {
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

        let existingTreatmentData3 = existing.treatmentData3 || [];
        let newServices = services;

        let treatmentMap = new Map();
        existingTreatmentData3.forEach(item => {
            treatmentMap.set(item.tooth, item);
        });

        newServices.forEach(serviceItem => {
            let { tooth, service, department, prposedDate, rate, quaintity, subTotal, discount, grantTotal, } = serviceItem;
            tooth.forEach(t => {
                if (treatmentMap.has(t)) {
                    let existingToothData = treatmentMap.get(t);
                    let serviceExists = existingToothData.service.some(s => {
                        console.log("s.service.serviceName.servId ", s.service.serviceName.servId.toString());
                        console.log("service.servId", service.servId.toString());

                        return s.service.serviceName.servId.toString() === service.servId.toString();
                    });

                    if (!serviceExists) {
                        console.log("1111");
                        existingToothData.service.push({
                            service: { serviceName: { servId: service.servId } },
                            department: { deptId: department.deptId },
                            finished: "Proposed",
                            updatedAt: new Date(),
                            rate: rate,
                            discount: discount,
                            quaintity: quaintity,
                            subTotal: subTotal,
                            grantTotal: grantTotal,
                            prposedDate: prposedDate,
                        });
                        // existingToothData.department.deptId = department.deptId
                    }

                } else {
                    treatmentMap.set(t, {
                        tooth: t,
                        service: [
                            {
                                service: { serviceName: { servId: service.servId } },
                                finished: "Proposed",
                                updatedAt: new Date(),
                                department: { deptId: department.deptId },
                                rate: rate,
                                discount: discount,
                                quaintity: quaintity,
                                subTotal: subTotal,
                                grantTotal: grantTotal,
                                prposedDate: prposedDate,
                            }
                        ],
                        total: 1,
                        completed: 0,
                    });
                }
            });
        });
        existing.treatmentData3 = Array.from(treatmentMap.values());
        await existing.save();

        const newPopulatedCaseSheet = await CaseSheet.findById(existing._id).populate({
            path: 'treatmentData3.service.department.deptId',
            model: Department,
            select: 'deptName _id'
        }).populate({
            path: 'treatmentData3.service.service.serviceName.servId',
            model: Service,
            select: 'serviceName _id'
        })
        return newPopulatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error  updating service of case sheet: ${error.message}`);
    }
};


const editServiceService = async (clientId, caseSheetId, data) => {
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

        const newServiceArr = existing?.services?.map((item) => {
            if (item?._id == data?.serviceRowId) {
                return {
                    ...data.service
                }
            } else {
                return item
            }
        })
        existing.services = newServiceArr
        await existing.save()
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
        throw new CustomError(error.statusCode || 500, `Error editing the service: ${error.message}`);
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




const updateProcedure = async (clientId, caseSheetId, isDrafted, data) => {
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
        });

        // old code
        // const existingTreatmentData = populatedCaseSheet.treatmentData2 || [];
        // const result = transformArr2(existingTreatmentData, populatedCaseSheet.procedures);

        // new code

        if (isDrafted !== true) {
            const existingTreatmentData = populatedCaseSheet.treatmentData3 || [];
            const result = transformArr2(existingTreatmentData, populatedCaseSheet.procedures);
            populatedCaseSheet.treatmentData3 = result;
            await populatedCaseSheet.save();
        }



        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error updating procedure of case sheet: ${error.message}`);
    }
};


// 1
// Optimized transformArr2 function
// function transformArr2(existingData, newProcedures) {
//     const toothMap = new Map();

//     console.log("existingData",existingData);
//     console.log("newProcedures",newProcedures);



//     // Populate the map with existing treatmentData2
//     existingData.forEach(({ tooth, service }) => {

//             if (!toothMap.has(tooth)) {
//                 toothMap.set(tooth, { tooth: tooth, service: [] });
//             }
//             service.forEach((s) => {
//                 const existingService = toothMap.get(tooth).service.find(
//                     (sv) => sv.service.serviceName === s.service.serviceName
//                 );
//                 if (existingService) {
//                     existingService.procedure.push(...s.procedure);
//                 } else {
//                     toothMap.get(tooth).service.push(s);
//                 }
//             });

//     });

//     // Add new data from newProcedures
//     newProcedures.forEach((item) => {
//         const { tooth, service, procedure } = {
//             tooth: item.tooth,
//             service: {
//                 serviceName: item.service.servId?.serviceName,
//             },
//             procedure: item.procedure?.map((p) => ({
//                 procedureName: p.procedId?.procedureName,
//             })),
//         };

//         tooth.forEach((t) => {
//             if (!toothMap.has(t)) {
//                 toothMap.set(t, { tooth: t, service: [] });
//             }

//             const existingService = toothMap.get(t).service.find(
//                 (sv) => sv.service.serviceName === service.serviceName
//             );

//             if (existingService) {
//                 const existingProcedures = existingService.procedure.map((p) => p.procedureName);
//                 procedure.forEach((p) => {
//                     if (!existingProcedures.includes(p.procedureName)) {
//                         existingService.procedure.push(p);
//                     }
//                 });
//             } else {
//                 toothMap.get(t).service.push({
//                     service,
//                     procedure,
//                 });
//             }
//         });
//     });

//     console.log("addda", JSON.stringify( Array.from(toothMap.values())));


//     return Array.from(toothMap.values());
// }


// 2 old
// function transformArr2(existingData, newProcedures) {
//     const toothMap = new Map();

//     // Populate the map with existing treatmentData2
//     existingData.forEach(({ tooth, service, total, completed }) => {
//         if (!toothMap.has(tooth)) {
//             toothMap.set(tooth, { tooth: tooth, service: [], total, completed });
//         }
//         service.forEach((s) => {
//             const existingService = toothMap.get(tooth).service.find(
//                 (sv) => sv.service.serviceName === s.service.serviceName
//             );
//             if (existingService) {
//                 existingService.procedure.push(...s.procedure);
//             } else {
//                 toothMap.get(tooth).service.push(s);
//             }
//         });
//     });

//     // Add new data from newProcedures
//     newProcedures.forEach((item) => {
//         const { tooth, service, procedure } = {
//             tooth: item.tooth,
//             service: {
//                 serviceName: item.service.servId?.serviceName,
//             },
//             procedure: item.procedure?.map((p) => ({
//                 procedureName: p.procedId?.procedureName,
//             })),
//         };

//         tooth.forEach((t) => {
//             if (!toothMap.has(t)) {
//                 toothMap.set(t, { tooth: t, service: [], total: 0, completed: 0 });
//             }

//             const toothEntry = toothMap.get(t);
//             const existingService = toothEntry.service.find(
//                 (sv) => sv.service.serviceName === service.serviceName
//             );

//             if (existingService) {
//                 const existingProcedures = existingService.procedure.map((p) => p.procedureName);
//                 procedure.forEach((p) => {
//                     if (!existingProcedures.includes(p.procedureName)) {
//                         existingService.procedure.push(p);
//                         toothEntry.total += 1; // Increment total for new procedures
//                     }
//                 });
//             } else {
//                 toothEntry.service.push({
//                     service,
//                     procedure,
//                 });
//                 toothEntry.total += 1; // Increment total for a new service
//             }
//         });
//     });

//     return Array.from(toothMap.values());
// }

// 2 new working code
// function transformArr2(existingData, newProcedures) {
//     const toothMap = new Map();

//     // Populate the map with existing treatmentData2
//     existingData.forEach(({ tooth, service, total, completed }) => {
//         if (!toothMap.has(tooth)) {
//             toothMap.set(tooth, { tooth: tooth, service: [], total, completed });
//         }
//         service.forEach((s) => {
//             const existingService = toothMap.get(tooth).service.find(
//                 (sv) => sv.service.serviceName === s.service.serviceName
//             );
//             if (existingService) {
//                 existingService.procedure.push(...s.procedure);
//             } else {
//                 toothMap.get(tooth).service.push(s);
//             }
//         });
//     });

//     // Add new data from newProcedures
//     newProcedures.forEach((item) => {
//         const { tooth, service, procedure } = {
//             tooth: item.tooth,
//             service: {
//                 serviceName: item.service.servId?.serviceName,
//             },
//             procedure: item.procedure?.map((p) => ({
//                 procedureName: p.procedId?.procedureName,
//             })),
//         };

//         tooth.forEach((t) => {
//             if (!toothMap.has(t)) {
//                 toothMap.set(t, { tooth: t, service: [], total: 0, completed: 0 });
//             }

//             const toothEntry = toothMap.get(t);
//             const existingService = toothEntry.service.find(
//                 (sv) => sv.service.serviceName === service.serviceName
//             );

//             if (existingService) {
//                 const existingProcedures = existingService.procedure.map((p) => p.procedureName);

//                 procedure.forEach((p) => {
//                     if (!existingProcedures.includes(p.procedureName)) {
//                         existingService.procedure.push(p);
//                         toothEntry.total += 1; // Increment total for new procedures
//                     }
//                 });

//             } else {
//                 toothEntry.service.push({
//                     service,
//                     procedure,
//                 });
//                 toothEntry.total += 1; // Increment total for a new service
//             }
//         });
//     });

//     return Array.from(toothMap.values());
// }

// 3 new experiment code
function transformArr2(existingData, newProcedures) {
    const toothMap = new Map();

    // Populate the map with existing treatmentData2
    existingData.forEach(({ tooth, service, total, completed }) => {
        if (!toothMap.has(tooth)) {
            toothMap.set(tooth, { tooth: tooth, service: [], total, completed });
        }
        service.forEach((s) => {
            const existingService = toothMap.get(tooth).service.find(
                (sv) => sv.service.serviceName === s.service.serviceName
            );
            if (existingService) {
                existingService.procedure.push(...s.procedure);
            } else {
                toothMap.get(tooth).service.push(s);
            }
        });
    });

    // Add new data from newProcedures
    newProcedures.forEach((item) => {
        const { tooth, service, procedure } = {
            tooth: item.tooth,
            service: {
                serviceName: item.service.servId?.serviceName,
            },
            procedure: item.procedure?.map((p) => ({
                procedureName: p.procedId?.procedureName,
            })),
        };

        tooth.forEach((t) => {
            if (!toothMap.has(t)) {
                toothMap.set(t, { tooth: t, service: [], total: 0, completed: 0 });
            }

            const toothEntry = toothMap.get(t);
            const existingService = toothEntry.service.find(
                (sv) => sv.service.serviceName === service.serviceName
            );

            if (existingService) {
                const existingProcedures = existingService.procedure.map((p) => p.procedureName);
                let newProcedureAdded = false;

                procedure.forEach((p) => {
                    if (!existingProcedures.includes(p.procedureName)) {
                        existingService.procedure.push(p);
                        toothEntry.total += 1; // Increment total for new procedures
                        newProcedureAdded = true;
                    }
                });

                console.log("existingService", existingService);


                if (newProcedureAdded) {
                    existingService.service.finished = "Proposed"
                    // toothEntry.service = toothEntry.service.map((sv) => {
                    //     if (sv.service.serviceName === service.serviceName) {
                    //         return { 
                    //             ...sv, 
                    //             finished: "Proposed"  // Update the status
                    //         };
                    //     }
                    //     return sv;
                    // });
                }

            } else {
                toothEntry.service.push({
                    service,
                    procedure,
                });
                toothEntry.total += 1; // Increment total for a new service
            }
        });
    });

    return Array.from(toothMap.values());
}



// 3 new
// function transformArr2(existingData, newProcedures) {
//     const toothMap = new Map();

//     // Populate the map with existing treatmentData2
//     existingData.forEach(({ tooth, service, total, completed }) => {
//         if (!toothMap.has(tooth)) {
//             toothMap.set(tooth, { tooth: tooth, service: [], total, completed });
//         }
//         service.forEach((s) => {
//             const existingService = toothMap.get(tooth).service.find(
//                 (sv) => sv.service.serviceName === s.service.serviceName
//             );
//             if (existingService) {
//                 existingService.procedure.push(...s.procedure);
//                 existingService.finished = s.finished || "Completed"; // Preserve existing status
//             } else {
//                 toothMap.get(tooth).service.push({ ...s, finished: s.finished || "Completed" });
//             }
//         });
//     });

//     // Add new data from newProcedures
//     newProcedures.forEach((item) => {
//         const { tooth, service, procedure } = {
//             tooth: item.tooth,
//             service: {
//                 serviceName: item.service.servId?.serviceName,
//             },
//             procedure: item.procedure?.map((p) => ({
//                 procedureName: p.procedId?.procedureName,
//             })),
//         };

//         tooth.forEach((t) => {
//             if (!toothMap.has(t)) {
//                 toothMap.set(t, { tooth: t, service: [], total: 0, completed: 0 });
//             }

//             const toothEntry = toothMap.get(t);
//             const existingService = toothEntry.service.find(
//                 (sv) => sv.service.serviceName === service.serviceName
//             );

//             if (existingService) {
//                 const existingProcedures = existingService.procedure.map((p) => p.procedureName);
//                 let newProcedureAdded = false;

//                 procedure.forEach((p) => {
//                     if (!existingProcedures.includes(p.procedureName)) {
//                         existingService.procedure.push(p);
//                         toothEntry.total += 1; // Increment total for new procedures
//                         newProcedureAdded = true;
//                     }
//                 });

//                 // If a new procedure is added, update the service status to "Proposed"
//                 if (newProcedureAdded) {
//                     existingService.finished = "Proposed";
//                 }
//             } else {
//                 toothEntry.service.push({
//                     service,
//                     procedure,
//                     finished: "Proposed", // New service should be "Proposed"
//                 });
//                 toothEntry.total += 1; // Increment total for a new service
//             }
//         });
//     });

//     return Array.from(toothMap.values());
// }


// new 2
// function transformArr2(existingData, newProcedures) {
//     const toothMap = new Map();

//     // Populate the map with existing treatmentData3
//     existingData.forEach(({ tooth, service, total, completed }) => {
//         if (!toothMap.has(tooth)) {
//             toothMap.set(tooth, { tooth: tooth, service: [], total, completed });
//         }
//         service.forEach((s) => {
//             const existingService = toothMap.get(tooth).service.find(
//                 (sv) => sv.service.serviceName === s.service.serviceName
//             );
//             if (existingService) {
//                 existingService.procedure.push(...s.procedure);
//             } else {
//                 toothMap.get(tooth).service.push(s);
//             }
//         });
//     });

//     // Add new data from newProcedures
//     newProcedures.forEach((item) => {
//         const { tooth, service, procedure } = {
//             tooth: item.tooth,
//             service: {
//                 serviceName: item.service.servId?.serviceName,
//             },
//             procedure: item.procedure?.map((p) => ({
//                 procedureName: p.procedId?.procedureName,
//             })),
//         };

//         tooth.forEach((t) => {
//             if (!toothMap.has(t)) {
//                 toothMap.set(t, { tooth: t, service: [], total: 0, completed: 0 });
//             }

//             const toothEntry = toothMap.get(t);
//             const existingService = toothEntry.service.find(
//                 (sv) => sv.service.serviceName === service.serviceName
//             );

//             if (existingService) {
//                 const existingProcedures = existingService.procedure.map((p) => p.procedureName);
//                 procedure.forEach((p) => {
//                     if (!existingProcedures.includes(p.procedureName)) {
//                         existingService.procedure.push(p);
//                         toothEntry.total += 1; // Increment total for new procedures
//                     }
//                 });
//             } else {
//                 toothEntry.service.push({
//                     service,
//                     procedure,
//                 });
//                 toothEntry.total += 1; // Increment total for a new service
//             }
//         });
//     });

//     // Filter out teeth that are not in newProcedures
//     const newToothSet = new Set(newProcedures.flatMap((p) => p.tooth));
//     const updatedToothMap = new Map();

//     toothMap.forEach((value, key) => {
//         // Remove services that have no procedures left
//         value.service = value.service.filter((s) => s.procedure.length > 0);

//         // If no services are left for a tooth, remove the tooth completely
//         if (value.service.length > 0 && newToothSet.has(key)) {
//             updatedToothMap.set(key, value);
//         }
//     });

//     return Array.from(updatedToothMap.values());
// }


// new 5 *working code
// function transformArr3(existingData, newProcedures) {
//     const toothMap = new Map();

//     // Extract the list of teeth present in newProcedures
//     const newProcedureTeeth = new Set();
//     newProcedures.forEach((item) => {
//         item.tooth.forEach((t) => newProcedureTeeth.add(t));
//     });

//     // Populate the map with existing treatmentData2
//     existingData.forEach(({ tooth, service, total, completed }) => {
//         if (!toothMap.has(tooth)) {
//             toothMap.set(tooth, { tooth: tooth, service: [], total, completed });
//         }
//         service.forEach((s) => {
//             const existingService = toothMap.get(tooth).service.find(
//                 (sv) => sv.service.serviceName === s.service.serviceName
//             );
//             if (existingService) {
//                 existingService.procedure.push(...s.procedure);
//             } else {
//                 toothMap.get(tooth).service.push({
//                     service: s.service,
//                     procedure: newProcedureTeeth.has(tooth) ? [...s.procedure] : [] // Empty procedure if tooth is missing in newProcedures
//                 });
//             }
//         });

//         // If tooth is not in newProcedures, empty all procedure arrays under that tooth
//         if (!newProcedureTeeth.has(tooth)) {
//             toothMap.get(tooth).service.forEach((s) => (s.procedure = []));
//         }
//     });

//     // Add new data from newProcedures
//     newProcedures.forEach((item) => {
//         const { tooth, service, procedure } = {
//             tooth: item.tooth,
//             service: {
//                 serviceName: item.service.servId?.serviceName,
//             },
//             procedure: item.procedure?.map((p) => ({
//                 procedureName: p.procedId?.procedureName,
//             })),
//         };

//         tooth.forEach((t) => {
//             if (!toothMap.has(t)) {
//                 toothMap.set(t, { tooth: t, service: [], total: 0, completed: 0 });
//             }

//             const toothEntry = toothMap.get(t);
//             const existingService = toothEntry.service.find(
//                 (sv) => sv.service.serviceName === service.serviceName
//             );

//             if (existingService) {
//                 const existingProcedures = existingService.procedure.map((p) => p.procedureName);
//                 procedure.forEach((p) => {
//                     if (!existingProcedures.includes(p.procedureName)) {
//                         existingService.procedure.push(p);
//                         toothEntry.total += 1; // Increment total for new procedures
//                     }
//                 });
//             } else {
//                 toothEntry.service.push({
//                     service,
//                     procedure,
//                 });
//                 toothEntry.total += 1; // Increment total for a new service
//             }
//         });
//     });

//     return Array.from(toothMap.values());
// }


// new 7 *experiment code
function transformArr3(existingData, newProcedures) {
    const toothMap = new Map();

    // Extract the list of teeth and their services present in newProcedures
    const newProcedureTeeth = new Set();
    const newProcedureServices = new Map();

    newProcedures.forEach((item) => {
        item.tooth.forEach((t) => {
            newProcedureTeeth.add(t);
            if (!newProcedureServices.has(t)) {
                newProcedureServices.set(t, new Set());
            }
            newProcedureServices.get(t).add(item.service.servId?.serviceName);
        });
    });

    // Populate the map with existing treatmentData2
    existingData.forEach(({ tooth, service, total, completed }) => {
        if (!toothMap.has(tooth)) {
            toothMap.set(tooth, { tooth: tooth, service: [], total, completed });
        }

        service.forEach((s) => {
            const existingService = toothMap.get(tooth).service.find(
                (sv) => sv.service.serviceName === s.service.serviceName
            );

            if (existingService) {
                existingService.procedure.push(...s.procedure);
            } else {
                // Keep the service but remove procedures if the service is not in newProcedures
                const shouldRemoveProcedures =
                    newProcedureTeeth.has(tooth) &&
                    !newProcedureServices.get(tooth)?.has(s.service.serviceName);

                toothMap.get(tooth).service.push({
                    service: s.service,
                    procedure: shouldRemoveProcedures ? [] : [...s.procedure], // Empty procedures if not in newProcedures
                });
            }
        });

        // If the tooth is in newProcedures but missing some services, clear procedures only for missing services
        if (newProcedureTeeth.has(tooth)) {
            toothMap.get(tooth).service.forEach((s) => {
                if (!newProcedureServices.get(tooth)?.has(s.service.serviceName)) {
                    s.procedure = [];
                }
            });
        }

        // If tooth is not in newProcedures, empty all procedure arrays under that tooth
        if (!newProcedureTeeth.has(tooth)) {
            toothMap.get(tooth).service.forEach((s) => (s.procedure = []));
        }

    });

    // Add new data from newProcedures
    newProcedures.forEach((item) => {
        const { tooth, service, procedure } = {
            tooth: item.tooth,
            service: {
                serviceName: item.service.servId?.serviceName,
            },
            procedure: item.procedure?.map((p) => ({
                procedureName: p.procedId?.procedureName,
            })),
        };

        tooth.forEach((t) => {
            if (!toothMap.has(t)) {
                toothMap.set(t, { tooth: t, service: [], total: 0, completed: 0 });
            }

            const toothEntry = toothMap.get(t);
            const existingService = toothEntry.service.find(
                (sv) => sv.service.serviceName === service.serviceName
            );

            if (existingService) {
                const existingProcedures = existingService.procedure.map((p) => p.procedureName);
                procedure.forEach((p) => {
                    if (!existingProcedures.includes(p.procedureName)) {
                        existingService.procedure.push(p);
                        toothEntry.total += 1; // Increment total for new procedures
                    }
                });
            } else {
                toothEntry.service.push({
                    service,
                    procedure,
                });
                toothEntry.total += 1; // Increment total for a new service
            }
        });
    });

    return Array.from(toothMap.values());
}








// 3
// function transformArr2(existingData, newProcedures) {
//     const toothMap = new Map();

//     // Populate the map with existing treatmentData2
//     existingData.forEach(({ tooth, service, total, completed }) => {
//         if (!toothMap.has(tooth)) {
//             toothMap.set(tooth, { tooth: tooth, service: [], total, completed });
//         }
//         service.forEach((s) => {
//             const existingService = toothMap.get(tooth).service.find(
//                 (sv) => sv.service.serviceName === s.service.serviceName
//             );
//             if (existingService) {
//                 existingService.procedure.push(...s.procedure);
//             } else {
//                 toothMap.get(tooth).service.push(s);
//             }
//         });
//     });

//     // Add new data from newProcedures
//     newProcedures.forEach((item) => {
//         const { tooth, service, procedure, prposedTime } = {
//             tooth: item.tooth,
//             service: {
//                 serviceName: item.service.servId?.serviceName,
//             },
//             procedure: item.procedure?.map((p) => ({
//                 procedureName: p.procedId?.procedureName,
//                 prposedTime: p.prposedTime || null,
//                 finished: p.finished || false,
//             })),
//         };

//         tooth.forEach((t) => {
//             if (!toothMap.has(t)) {
//                 toothMap.set(t, { tooth: t, service: [], total: 0, completed: 0 });
//             }

//             const toothEntry = toothMap.get(t);
//             const existingService = toothEntry.service.find(
//                 (sv) => sv.service.serviceName === service.serviceName
//             );

//             if (existingService) {
//                 procedure.forEach((p) => {
//                     const existingProcedure = existingService.procedure.find(
//                         (ep) => ep.procedureName === p.procedureName && ep.prposedTime?.toISOString() === p.prposedTime?.toISOString()
//                     );

//                     if (!existingProcedure) {
//                         existingService.procedure.push(p);
//                         toothEntry.total += 1; // Increment total for new procedures
//                     }
//                 });
//             } else {
//                 toothEntry.service.push({
//                     service,
//                     procedure,
//                 });
//                 toothEntry.total += procedure.length; // Increment total for new service and its procedures
//             }
//         });
//     });

//     return Array.from(toothMap.values());
// }



// function transformArr2(arr1) {
//     const filteredData = arr1.map((item) => {
//         const service = {
//             serviceName: item?.service?.servId?.serviceName,
//         };
//         const procedure = item?.procedure?.map((item) => {
//             return {
//                 procedureName: item?.procedId?.procedureName,
//             }
//         });
//         return {
//             tooth: item?.tooth,
//             service: service,
//             procedure: procedure,
//         }

//     });
//     const toothMap = new Map();
//     filteredData.forEach(({ tooth, service, procedure }) => {
//         tooth.forEach((t) => {
//             if (!toothMap.has(t)) {
//                 toothMap.set(t, { tooth: t, service: [] });
//             }
//             toothMap.get(t).service.push({
//                 service,
//                 procedure: procedure,
//             });
//         });
//     });
//     return Array.from(toothMap.values())
// }

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


        const existingTreatmentData = populatedCaseSheet.treatmentData3 || [];
        const result = transformArr3(existingTreatmentData, populatedCaseSheet.procedures);
        console.dir("result", result);


        populatedCaseSheet.treatmentData3 = result;
        await populatedCaseSheet.save();

        return populatedCaseSheet
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const list = async (clientId, filters = {}, options = { page: 1, limit: 10 }) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const User = clientConnection.model('clientUsers', clinetUserSchema);


        const { page, limit } = options;
        const skip = (page - 1) * limit;
        const [caseSheets, total] = await Promise.all([
            CaseSheet.find(filters).skip(skip).limit(limit).sort({ _id: -1 }).populate({
                path: 'patientId',
                model: Patient,
                select: 'firstName lastName patientGroup _id displayId'
            }).populate({
                path: 'branchId',
                model: Branch,
                select: 'name _id'
            }).populate({
                path: 'createdBy',
                model: User,
                select: 'firstName lastName _id'
            }),
            CaseSheet.countDocuments(filters),
        ]);
        return { count: total, caseSheets };
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
        const Complaint = clientConnection.models.complaint || clientConnection.model('complaint', complaintSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const Medical = clientConnection.model('medical', medicalSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema)


        const caseSheet = await CaseSheet.findById(caseSheetId)
            .
            populate({
                path: 'cheifComplaints.complaints.compId',
                model: Complaint,
                select: 'complaintName _id'
            }).populate({
                path: 'clinicalFindings.findings.findId',
                model: Finding,
                select: 'findingsName _id'
            }).populate({
                path: 'diagnosis.findings.findId',
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
            })
            .populate({
                path: 'services.service.servId',
                model: Service,
                select: 'serviceName _id'
            })
            .populate({
                path: 'procedures.procedure.procedId',
                model: procedures,
                select: 'procedureName _id'
            })
            .populate({
                path : "procedures.service.servId",
                modle : Service,
                select : "serviceName _id"
            })

        if (!caseSheet) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        return caseSheet;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error getting case sheet: ${error.message}`);
    }
};






// const getById = async (clientId, caseSheetId) => { 
//     try {
//         const clientConnection = await getClientDatabaseConnection(clientId);
//         const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
//         const Complaint = clientConnection.model('complaint', complaintSchema);
//         const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
//         const Medical = clientConnection.model('medical', medicalSchema);
//         const Department = clientConnection.model('department', departmentSchema);
//         const Service = clientConnection.model('services', serviceSchema);
//         const procedures = clientConnection.model('procedure', procedureSchema)


//         const caseSheet = await CaseSheet.findById(caseSheetId).populate({
//             path: 'cheifComplaints.complaints.compId',
//             model: Complaint,
//             select: 'complaintName _id'
//         }).populate({
//             path: 'clinicalFindings.findings.findId',
//             model: Finding,
//             select: 'findingsName _id'
//         }).populate({
//             path: 'diagnosis.findings.findId',
//             model: Finding,
//             select: 'findingsName _id'
//         }).populate({
//             path: 'medicalHistory.medicals.medId',
//             model: Medical,
//             select: 'caseName _id'
//         }).populate({
//             path: 'services.department.deptId',
//             model: Department,
//             select: 'deptName _id'
//         }).populate({
//             path: 'services.service.servId',
//             model: Service,
//             select: 'serviceName _id'
//         }).populate({
//             path: 'procedures.procedure.procedId',
//             model: procedures,
//             select: 'procedureName _id'
//         }).populate({
//             path: 'procedures.service.servId',
//             model: Service,
//             select: 'serviceName _id'
//         }).populate({
//             path: 'otherAttachment.procedure.procedId',
//             model: procedures,
//             select: 'procedureName _id'
//         }).populate({
//             path: 'otherAttachment.service.servId',
//             model: Service,
//             select: 'serviceName _id'
//         }).populate({
//             path: 'treatmentData3.service.department.deptId',
//             model: Department,
//             select: 'deptName _id'
//         }).populate({
//             path: 'treatmentData3.service.service.serviceName.servId',
//             model: Service,
//             select: 'serviceName _id'
//         })

//         if (!caseSheet) {
//             throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
//         }
//         return caseSheet;
//     } catch (error) {
//         throw new CustomError(error.statusCode || 500, `Error getting case sheet: ${error.message}`);
//     }
// };

const getCaseDetail = async (clientId, caseSheetId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const Medical = clientConnection.model('medical', medicalSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema);
        const User = clientConnection.model('clientUsers', clinetUserSchema);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const Patient = clientConnection.model('patient', clinetPatientSchema);



        const caseSheet = await CaseSheet.findById(caseSheetId).populate({
            path: 'createdBy',
            model: User,
            select: 'firstName lastName email _id'
        }).populate({
            path: 'branchId',
            model: Branch,
            select: 'name city state country ZipCode address emailContact contactNumber branchLogo _id'
        }).populate({
            path: 'patientId',
            model: Patient,
            select: 'firstName lastName gender age bloodGroup patientGroup _id'
        }).populate({
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

const deleteCaseSheet = async (clientId, caseSheetId, softDelete = false) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);

        const caseSheet = await CaseSheet.findById(caseSheetId);
        if (!caseSheet) {
            throw new Error('Case sheet not found');
        }

        if (softDelete) {
            caseSheet.deletedAt = new Date();
            await caseSheet.save();
        } else {
            await caseSheet.deleteOne(); // Avoid using `remove()` as it's deprecated
        }

        return true;
    } catch (error) {
        console.error(`Error deleting case sheet for client ${clientId}:`, error.message);
        throw new Error(`Failed to delete case sheet: ${error.message}`);
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


const updateTreatment = async (clientId, caseSheetId, treatmentData) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const Medical = clientConnection.model('medical', medicalSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema)
        const existing = await CaseSheet.findById(caseSheetId).populate({
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
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        //handling if fineshed = opted && estimateId is nonexistatnt then random estimateId is generated and inserted:
        const Branch = await clientConnection.model("branch", clinetBranchSchema);
        const branchObj = await Branch.findOne({ _id: existing?.branchId }).lean();
        if (!branchObj) return { status: false, message: 'Error fetching Branch of case sheet overview!!' };
        // console.log("branchObjbranchObj=>>",branchObj);
        console.log("hittttt");
        
        for (const toothEntry of treatmentData) {
            for (const serviceArrObj of toothEntry?.service) {
                // console.log(toothEntry.tooth,"->>",serviceArrObj?.service?.finished,"tooth, finished");
                if ((String(serviceArrObj?.service?.finished) == "Opted" || String(serviceArrObj?.service?.finished) == "Completed") && (serviceArrObj?.service?.estimateId == null || serviceArrObj?.service?.estimateId == '')) {
                    // console.log(clientId,  existing?.branchId, branchObj?.businessUnit,"clientId, branchId, buid");
                    const random = await getserialNumber("estimate", clientId, existing?.branchId, branchObj?.businessUnit);
                    // const random = await getserialNumber("testCollection", clientId, existing?.branchId, branchObj?.businessUnit);

                    if (!random) return { status: false, message: 'Error generating estimate!!' };
                    // console.log("random=>>", random);
                    serviceArrObj.service.estimateId = random;
                }
            }
        }
        existing.treatmentData3 = treatmentData;











        existing.status = "In Progress";
        return await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error in updating treatment procedure: ${error.message}`);
    }
};

const updateTreatmentAndCloseCase = async (clientId, caseSheetId, treatmentData) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const Medical = clientConnection.model('medical', medicalSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema)
        const existing = await CaseSheet.findById(caseSheetId).populate({
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
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        existing.treatmentData3 = treatmentData;
        existing.status = "Completed";
        return await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error in updating treatment procedure: ${error.message}`);
    }
};

const closeCase = async (clientId, caseSheetId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const Medical = clientConnection.model('medical', medicalSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema)
        const existing = await CaseSheet.findById(caseSheetId).populate({
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
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        existing.status = "Completed";
        return await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error in updating treatment procedure: ${error.message}`);
    }
};




const markedCompleted = async (clientId, caseSheetId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const Medical = clientConnection.model('medical', medicalSchema);
        const Department = clientConnection.model('department', departmentSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema)
        const existing = await CaseSheet.findById(caseSheetId).populate({
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
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        existing.status = "Completed";
        existing.drafted = false;
        return await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error in updating treatment procedure: ${error.message}`);
    }
};


// old
function transformArr(arr1) {
    const filteredData = arr1.map((item) => {
        const service = {
            serviceName: item?.service?.servId?.serviceName,
            // _id: item?.service?.servId?._id
        };
        const procedure = item?.procedure?.map((item) => {

            return {
                procedureName: item?.procedId?.procedureName,
                // _id: item?.procedId?._id,
                // id: item?._id,
                // finished: false,
                // uniqueId : count++,

            }
        });
        return {
            tooth: item?.tooth,
            service: service,
            procedure: procedure,

        }

    });


    const toothMap = new Map();

    filteredData.forEach(({ tooth, service, procedure }) => {
        tooth.forEach((t) => {
            if (!toothMap.has(t)) {
                toothMap.set(t, { tooth: t, service: [] });
            }

            toothMap.get(t).service.push({
                service,
                procedure: procedure,
            });
        });
    });

    return Array.from(toothMap.values())
}

// new
// function transformArr(arr1) {
//     let count = 1; // Initialize the counter outside the map scope

//     const filteredData = arr1.map((item) => {
//         const service = {
//             serviceName: item?.service?.servId?.serviceName,
//             _id: item?.service?.servId?._id,
//         };

//         const procedure = item?.procedure?.map((item) => {
//             return {
//                 procedureName: item?.procedId?.procedureName,
//                 _id: item?.procedId?._id,
//                 id: item?._id,
//                 finished: false,
//                 uniqueId: count++, // Increment the counter for each procedure
//             };
//         });

//         return {
//             tooth: item?.tooth,
//             service: service,
//             procedure: procedure,
//         };
//     });

//     return filteredData;
// }




const updateDraft = async (clientId, caseSheetId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema);
        const Department = clientConnection.model('department', departmentSchema);


        // updating service in resume case sheet starts here

        const populatedCaseSheet = await CaseSheet.findById(caseSheetId).populate({
            path: 'services.department.deptId',
            model: Department,
            select: 'deptName _id'
        }).populate({
            path: 'services.service.servId',
            model: Service,
            select: 'serviceName _id'
        })


        let existingTreatmentData3 = populatedCaseSheet.treatmentData3 || [];
        let newServices = populatedCaseSheet.services;

        // Map existing treatmentData3 for quick lookup
        // let treatmentMap = new Map();
        // existingTreatmentData3.forEach(item => {
        //     treatmentMap.set(item.tooth, item);
        // });
        let treatmentMap = {};
        existingTreatmentData3.forEach(item => {
            treatmentMap[item.tooth] = item;
        });

        newServices.forEach(serviceItem => {
            let { tooth, service, rate, department, prposedDate,discount } = serviceItem;
            const teethCount = parseInt(serviceItem?.tooth?.length);
            if(teethCount == 0) return {status : false, message: "Atleast one tooth is required" };
            const discountForEachTooth = (discount/teethCount);
            tooth.forEach(t => {
                if (treatmentMap[t]) {
                    // Update existing tooth services
                    let existingToothData = treatmentMap[t];
                    let serviceExists = existingToothData.service.some(s => {
                        console.log("kasif", service);
                        console.log("aatif", s);

                        if (String(s?.service?.serviceName) === String(service?.servId?.serviceName)) {
                            return s
                        }
                    });
                    if (!serviceExists) {
                        const newPush = {
                            service: {
                                // service: { serviceName: service.servId.serviceName },
                                serviceName: service.servId?.serviceName,//fix
                                serviceId: service.servId?._id,//fix
                                finished: "Proposed",//in code it was 'In Progress'
                                unitPrice: rate,
                                discount :  parseFloat(discountForEachTooth.toFixed(2)),
                                updatedAt: new Date(),
                                prposedDate : prposedDate ? prposedDate : null,
                                departmentId : department?.deptId
                            }
                        };
                        treatmentMap[t].service.push(newPush);
                        // existingToothData.service.push({
                        //     service: { serviceName: service.servId.serviceName },
                        //     finished: "In Progress",
                        //     unitPrice: rate,
                        //     updatedAt: new Date(),
                        // });
                    }
                } else {
                    // Add new tooth entry
                    treatmentMap[t] = {
                        tooth: t,
                        service: [{
                            service: {
                                // service: { serviceName: service.servId.serviceName },
                                serviceName: service.servId?.serviceName,//fix
                                serviceId: service.servId?._id,//fix
                                finished: "Proposed",//in code it was 'In Progress'
                                updatedAt: new Date(),
                                unitPrice: rate,
                                discount :  parseFloat(discountForEachTooth.toFixed(2)),
                                prposedDate : prposedDate ? prposedDate : null,
                                departmentId : department?.deptId
                            }
                        }
                            // {
                            //     service: { serviceName: service.servId.serviceName },
                            //     finished: "In Progress",
                            //     unitPrice: rate,
                            //     updatedAt: new Date(),
                            // }
                        ],
                        total: 1,
                        completed: 0,
                    };
                }
            });
        });

        // Convert map back to array
        populatedCaseSheet.treatmentData3 = Object.values(treatmentMap);
        populatedCaseSheet.markModified('treatmentData3');
        // populatedCaseSheet.treatmentData3 = Array.from(treatmentMap.values());
        await populatedCaseSheet.save();

        // updating service in resume case sheet ends here

        const existing = await CaseSheet.findById(caseSheetId).populate({
            path: 'procedures.procedure.procedId',
            model: procedures,
            select: 'procedureName _id'
        }).populate({
            path: 'procedures.service.servId',
            model: Service,
            select: 'serviceName _id'
        });

        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }


        // updating procedures in resume case sheet starts here 
        const existingTreatmentData = existing.treatmentData3 || [];
        const result = transformArr2(existingTreatmentData, existing.procedures);
        existing.treatmentData3 = result;
        await existing.save();
        // updating procedure in resume case sheet ends here


        Object.assign(existing, data);
        const patientId = existing?.patientId;

        const Appointment = await clientConnection.model('appointment', appointmentSchema)
        const latestAppointment = await Appointment.findOne({
            patientId,
            isActive: true,
            deletedAt: null,
            status: { $nin: ['Scheduled', 'Cancelled'] },
        }).sort({ createdAt: -1 }).exec();

        if (latestAppointment) {
            latestAppointment.caseSheetId = existing._id;
            await latestAppointment.save();
        }

        return await existing.save();

    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error in updatin as draft: ${error.message}`);
    }
};



function mergeToothData(array1, array2) {
    // Helper function to merge procedures
    const mergeProcedures = (existingProcedures, newProcedures) => {
        const procedureMap = new Map();

        console.log("existingProcedures", existingProcedures);
        console.log("newProcedures", newProcedures);


        // Add existing procedures
        existingProcedures.forEach(proc => {
            procedureMap.set(proc.procedureName, proc);
        });

        // Add or update with new procedures
        newProcedures.forEach(proc => {
            // if (!procedureMap.has(proc.procedureName)) {
            //     procedureMap.set(proc.procedureName, {
            //         procedureName: proc.procedureName,
            //         finished: false,
            //         updatedAt: null
            //     });
            // }

            procedureMap.set(proc.procedureName, ({
                procedureName: proc.procedureName,
                finished: false,
                updatedAt: null
            }));


        });

        console.log("procedureMap aaa", procedureMap);


        return Array.from(procedureMap.values());
    };

    // Helper function to merge services
    const mergeServices = (existingServices, newServices) => {
        const serviceMap = new Map();

        // console.log("existingServices", existingServices);
        // console.log("newServices", newServices);


        // Add existing services
        existingServices.forEach(service => {
            serviceMap.set(service.service?.serviceName, service);
        });

        // console.log("serviceMap",serviceMap);




        // Add or update with new services
        newServices.forEach(newService => {
            const serviceName = newService.service?.serviceName;
            if (serviceMap.has(serviceName)) {
                // console.log("coming");

                const existingService = serviceMap.get(newService.service?.serviceName);
                // console.log("existingService",existingService);

                existingService.procedure = mergeProcedures(
                    existingService.procedure,
                    newService.procedure
                );
            } else {
                // console.log("vvv");

                serviceMap.set(newService.service, newService);
                // console.log("serviceMap",serviceMap);
            }
        });

        // return Array.from(serviceMap.values());
    };

    // Merge the arrays
    const toothMap = new Map();

    // Add existing teeth
    array1.forEach(tooth => {
        toothMap.set(tooth.tooth, tooth);
    });

    // console.log("toothMap",toothMap);


    // Add or update with new teeth
    array2.forEach(newTooth => {
        if (toothMap.has(newTooth.tooth)) {
            const existingTooth = toothMap.get(newTooth.tooth);
            // console.log("existingTooth",existingTooth);

            existingTooth.service = mergeServices(
                existingTooth.service,
                newTooth.service
            );
            // existingTooth.total += newTooth.total;
        } else {
            toothMap.set(newTooth.tooth, newTooth);
        }
    });

    console.log("tooth", Array.from(toothMap.values()));

    return Array.from(toothMap.values())

}

const updateCaseSheet = async (clientId, caseSheetId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const procedures = clientConnection.model('procedure', procedureSchema)

        const existing = await CaseSheet.findById(caseSheetId).populate({
            path: 'procedures.procedure.procedId',
            model: procedures,
            select: 'procedureName _id'
        }).populate({
            path: 'procedures.service.servId',
            model: Service,
            select: 'serviceName _id'
        });
        ;
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }

        let transformedData = [];
        let result = []
        if (existing?.procedures && existing?.procedures?.length > 0) {
            transformedData = transformArr(existing?.procedures);

            result = mergeToothData(existing?.treatmentData2, transformedData)

            //  console.log("transformedData", JSON.stringify(transformedData));
            //  console.log("existing?.treatmentData2", JSON.stringify(existing?.treatmentData2) );



            // existing.treatmentData = JSON.stringify(transformedData);
            // existing.treatmentData2 = transformedData;
        }

        return result


        // Object.assign(existing, data);


    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating updating case sheet: ${error.message}`);
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

        console.log(filters, 'filters')
        const [caseSheets] = await Promise.all([
            CaseSheet.find({ ...filters }).sort({ _id: -1 }).populate({
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

        console.log(caseSheets, caseSheets?.length, 'caseSheetscaseSheets')

        return { caseSheets };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing patient: ${error.message}`);
    }
};

// new
const listAllCasesOfPatient = async (clientId, filters = {}, options = { page: 1, limit: 10 }) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const Complaint = clientConnection.model.complaint ||   clientConnection.model('complaint', complaintSchema);
        const User = clientConnection.model('clientUsers', clinetUserSchema);
        const { page, limit } = options;
        const skip = (page - 1) * limit;
        const [caseSheets, total] = await Promise.all([
            CaseSheet.find({ ...filters }).skip(skip).limit(limit).sort({ _id: -1 }).populate({
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
            CaseSheet.countDocuments(filters),
        ]);
        return { count: total, caseSheets };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing case sheet: ${error.message}`);
    }
};


const getPatientMedicalHistory = async (clientId, patientId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const patient = await Patient.findById(patientId);
        if (!patient) {
            throw new CustomError(statusCode.NotFound, message.lblPatientNotFound);
        }
        return patient
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing patient: ${error.message}`);
    }
};

const updatePatientMedicalHistory = async (clientId, patientId, medicalHistoryData) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const patient = await Patient.findById(patientId);
        if (!patient) {
            throw new CustomError(statusCode.NotFound, message.lblPatientNotFound);
        }
        patient.medicalHistory = medicalHistoryData;
        return await patient.save()
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing patient: ${error.message}`);
    }
};

const getByPatientId = async ({ clientId, patientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const result = await CaseSheet.findOne({ patientId: patientId });
        if (!result) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }

        return { status: true, message: 'success ', data: result }
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing patient: ${error.message}`);
    }
}

const caseSheetOverView = async ({ clientId, patientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const CaseSheet = db.model('caseSheet', caseSheetSchema);
        const chair = db.model('chair', clinetChairSchema);
        const User = await db.model('clientUsers', clinetUserSchema);
        const patientregister = db.model('patient', clinetPatientSchema);
        const result = await CaseSheet.findOne({
            patientId: new mongoose.Types.ObjectId(patientId),
            status: { $in: ['In Progress', 'Proposed'] },
            isActive: true,
            deletedAt: null,
        });
        const latestAppointment = await appointment.find({
            patientId: new mongoose.Types.ObjectId(patientId),
            isActive: true,
            deletedAt: null,
            caseSheetId: result?._id,
        })
            .populate('dutyDoctorId', 'firstName lastName phone')
            .populate('dentalAssistant', 'firstName lastName phone')
            .populate('chairId')
            .populate('patientId', 'firstName lastName displayId')
            .populate('caseSheetId')
            .sort({ createdAt: -1 })
            .exec();

        console.log(latestAppointment, 'Appointments with Populated Data');

        return {
            status: true,
            message: message.lblCaseOverViewListed,
            data: latestAppointment,
        };
    } catch (error) {
        console.error(error);
        return { status: false, message: 'Error fetching case sheet overview.' };
    }
};


const appointmentsWithCase = async ({ clientId, patientId, caseSheetId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId)
        const appointment = await db.model('appointment', appointmentSchema)
        const CaseSheet = db.model('caseSheet', caseSheetSchema);
        const chair = db.model('chair', clinetChairSchema);
        const User = await db.model('clientUsers', clinetUserSchema);
        const patientregister = db.model('patient', clinetPatientSchema);
        const result = await CaseSheet.findOne({
            patientId: new mongoose.Types.ObjectId(patientId),
            status: { $in: ['In Progress', 'Proposed'] },
            isActive: true,
            deletedAt: null,
        });
        const appointmentWithCase = await appointment.find({
            patientId: new mongoose.Types.ObjectId(patientId),
            isActive: true,
            deletedAt: null,
            caseSheetId: caseSheetId,
        })
            .populate('dutyDoctorId', 'firstName lastName phone')
            .populate('dentalAssistant', 'firstName lastName phone')
            .populate('chairId')
            .populate('patientId', 'firstName lastName displayId')
            .populate('caseSheetId')
            .sort({ createdAt: -1 })
            .exec();

        return {
            status: true,
            message: message.lblAppointmentWithCaseFoundSuccessfully,
            data: appointmentWithCase,
        };
    } catch (error) {
        console.error(error);
        return { status: false, message: 'Error fetching appointment by case.' };
    }
};



// // const caseSheetOverView = async ({ clientId, branchId, buId, patientId})=>{
//     try {
//         console.log({ patientId:patientId, buId: buId, branchId: branchId, clientId: clientId },'zaadddddddddddddddsaasazaz')
//  if (! await validateObjectId({ clientid: clientId, objectId: clientId, collectionName: 'clientId' })) return { status: false, message: message.lblClinetIdInvalid, statusCode: httpStatusCode.Unauthorized }
//         // if (! await validateObjectId({ clientid: clientId, objectId: buId, collectionName: 'businessunit' })) return { status: false, message: message.lblBusinessUnitNotFound, statusCode: httpStatusCode.Unauthorized }
//         // if (! await validateObjectId({ clientid: clientId, objectId: branchId, collectionName: 'branch' })) return { status: false, message: message.lblBranchNotFound, statusCode: httpStatusCode.Unauthorized }
//         if (! await validateObjectId({ clientid: clientId, objectId: patientId, collectionName: 'patient' })) return { status: false, message: message.lblPatientNotFound, statusCode: httpStatusCode.Unauthorized }
//         const db = await getClientDatabaseConnection(clientId)
// const appointment = await db.model('appointment', appointmentSchema)
//         const CaseSheet = db.model('caseSheet', caseSheetSchema);

//         const result = await appointment?.find({
//             patientId: patientId,
//          //   branchId: branchId,
//              isActive: true,
//              deletedAt: null,

//         }).populate({
//             path: 'caseSheetId',
//             model: CaseSheet,
//             select: 'createdAt'
//         })

//         .populate('dutyDoctorId', 'firstName lastName phone ')
//         .populate('dentalAssistant','firstName lastName phone ')
//         .populate('chairId' , 'chairNumber chairLocation ')
//         .populate('patientId', 'firstName lastName displayId ')


//         if (result) {
//             console.log(result,'result')     
//             return { status: true, message: 'status Updated', statusCode: httpStatusCode.OK, data: result }
//         }
//         else {
//             return { status: false, message: 'no appointment found on this id ', statusCode: 501, }
//         }


//     } catch (error) {
//         return { status: false, message: error.message, statusCode: 501, }
//     }
// }
















module.exports = {

    checkOngoing,

    create,
    update,
    deleteCheifComplaints,

    createClinicalFinding,
    updateClinicalFinding,
    deleteClinicalFinding,

    createDiagnosis,
    updateDiagnosis,
    deleteDiagnosis,

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
    createServiceNew,
    updateService,
    updateServiceNew,
    deleteServices,

    updateProcedure,
    deleteProcedure,

    list,
    getById,
    updateTreatmentProcedure,
    listDrafted,
    updateDraft,
    updateCaseSheet,
    updateTreatment,
    updateTreatmentAndCloseCase,
    closeCase,

    markedCompleted,

    listAllCases,
    listAllCasesOfPatient,
    deleteCaseSheet,


    getPatientMedicalHistory,
    updatePatientMedicalHistory,
    getByPatientId,


    getCaseDetail,
    caseSheetOverView,
    appointmentsWithCase,


    editServiceService

};
