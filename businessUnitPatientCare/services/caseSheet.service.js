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
        });

        const existingTreatmentData = populatedCaseSheet.treatmentData2 || [];
        const result = transformArr2(existingTreatmentData, populatedCaseSheet.procedures);

        populatedCaseSheet.treatmentData2 = result;
        await populatedCaseSheet.save();


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


// 2
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
        existing.treatmentData2 = treatmentData;
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
        existing.treatmentData2 = treatmentData;
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

        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }

        // if (existing?.procedures && existing?.procedures?.length > 0) {
        //     const transformedData = transformArr(existing?.procedures);

        //     existing.treatmentData = JSON.stringify(transformedData);
        //     existing.treatmentData2 = transformedData;
        // }


        Object.assign(existing, data);
        const patientId = existing?.patientId;


        const Appointment = await clientConnection.model('appointment', appointmentSchema)
        const latestAppointment = await Appointment.findOne({
            patientId,
            isActive: true,
            deletedAt: null,
            status: { $nin: ['Scheduled', 'Cancelled'] }, 
        }).sort({ createdAt: -1 }).exec();

        if(latestAppointment){
            
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

const getByPatientId = async ({clientId,patientId})=>{
    try {
        const db = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const result  = await CaseSheet.findOne({patientId:patientId});
        if (!result) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
         
        return  {status:true,message:'success ',data:result}
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
    const User =await db.model('clientUsers', clinetUserSchema);
    const patientregister = db.model('patient', clinetPatientSchema);
    const result = await CaseSheet.findOne({
        patientId: new mongoose.Types.ObjectId(patientId),
        status: 'In Progress',
        isActive: true,
        deletedAt: null,
      });
  
      console.log(result, 'CaseSheet Result');
  
      const latestAppointment = await appointment.find({
        patientId: new mongoose.Types.ObjectId(patientId),
        isActive: true,
        deletedAt: null,
        caseSheetId: result?._id,
      })
         .populate('dutyDoctorId','firstName lastName phone')
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
    updateCaseSheet,
    updateTreatment,
    updateTreatmentAndCloseCase,
    closeCase,

    markedCompleted,

    listAllCases,
    deleteCaseSheet,


    getPatientMedicalHistory,
    updatePatientMedicalHistory,
    getByPatientId,


    getCaseDetail,
    caseSheetOverView

};
