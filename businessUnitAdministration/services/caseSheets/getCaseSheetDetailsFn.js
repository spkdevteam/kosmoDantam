const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const caseSheetSchema = require("../../../client/model/caseSheet");
const cheifComplaintSchema = require("../../../client/model/cheifcomplaint");
const complaintSchema = require("../../../client/model/complaint");
const departmentSchema = require("../../../client/model/department");
const patientFindingsSchema = require("../../../client/model/finding");
const medicalCasesSchema = require("../../../client/model/medicalCases");
const clinetPatientSchema = require("../../../client/model/patient");
const procedureSchema = require("../../../client/model/procedure");
const serviceSchema = require("../../../client/model/service");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");
const fnToExtractFirstNameOfCreatedAndEditedBy = require("../../../utils/fnToExtractFIrstnameOfCreatedAndEditedBy");

const getCaseSheetDetailsFn = async ({ from_Date = null, toDate = null, SearchKey = "", page = null, perPage = null, clientId, patientId, branchId, buId,
    createdBy, compId, clinicalFindingsFindId, diagnosisFindId, medicalHistoryFindId, deptId, servId, procedId, invoiceId, updatedBy, caseSheetId
}) => {
    try {
        let searchQuery = {};
        if (SearchKey) { 
            if (SearchKey.trim()) {
                const words = SearchKey.trim().split(/\s+/)//spiltting by space
                    .map(word =>
                        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special characters
                    );
                // const escapedSearchKey = SearchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchQuery = {
                    $or: words.flatMap(word => [//case insensitive searching and searching from anywhere of the target field
                        // { name: { $regex: word, $options: "i" } },
                        // { incorporationName: { $regex: word, $options: "i" } },
                        // { cinNumber: { $regex: word, $options: "i" } },
                        // { gstNumber: { $regex: word, $options: "i" } },
                        // { branchPrefix: { $regex: word, $options: "i" } },
                        // { emailContact: { $regex: word, $options: "i" } },
                        // { contactNumber: { $regex: word, $options: "i" } },
                        // { city: { $regex: word, $options: "i" } },
                        // { state: { $regex: word, $options: "i" } },
                        // { country: { $regex: word, $options: "i" } },
                        // { ZipCode: { $regex: word, $options: "i" } },
                        // { address: { $regex: word, $options: "i" } },
                        { displayId: { $regex: word, $options: "i" } }
                    ])
                }
            }
        }
        //date filter:
        // let from_DateSearchKey = {};
        // if (from_Date) {
        //     from_DateSearchKey = {
        //         createdAt: { $gte: new Date(from_Date) }
        //     }
        // }
        // let toDateSearchKey = {};
        // if (toDate) {
        //     toDateSearchKey = {
        //         createdAt: { $lte: new Date(toDate) }
        //     }
        // }
        let dateSearchKey = {};

        if (from_Date || toDate) {
            dateSearchKey.createdAt = {};

            if (from_Date) {
                dateSearchKey.createdAt.$gte = new Date(from_Date);
            }
            if (toDate) {
                dateSearchKey.createdAt.$lte = new Date(toDate);
            }
        }
        //db connection :
        const db = await getClientDatabaseConnection(clientId);
        const caseSheets = await db.model('casesheets', caseSheetSchema);
        const patientModel = await db.model('patient', clinetPatientSchema);
        const branchModel = await db.model('branch', clinetBranchSchema);
        const businessUnitModel = await db.model('businessUnit', clinetBusinessUnitSchema);
        const clientUsersModel = await db.model('clientUsers', clinetUserSchema);
        const complaintModel = db?.model?.complaint || await db.model('complaint', cheifComplaintSchema);
        const patientFindingModel = await db.model('patientFinding', patientFindingsSchema);
        const medicalCaseModel = await db.model('medicalCase', medicalCasesSchema);
        const departmentModel = await db.model('department', departmentSchema);
        const servicesModel = await db.model('services', serviceSchema);
        const procedureModel = await db.model('procedure', procedureSchema);

        let patientIdSearchKey = {};
        if (patientId) {
            patientIdSearchKey = { patientId: patientId }
        }
        let branchIdSearchKey = {};
        if (branchId) {
            branchIdSearchKey = { branchId: branchId }
        }
        let buIdSearchKey = {};
        if (buId) {
            buIdSearchKey = { buId: buId }
        }
        let createdBySearchKey = {};
        if (createdBy) {
            createdBySearchKey = { createdBy: createdBy }
        }
        let updatedBySearchKey = {};
        if (updatedBy) {
            updatedBySearchKey = { updatedBy: updatedBy }
        }
        let compIdSearchKey = {};
        if (compId) {
            compIdSearchKey = { "cheifComplaints.complaints.compId": compId }
        }
        let clinicalFindingsFindIdSearchKey = {};
        if (clinicalFindingsFindId) {
            clinicalFindingsFindIdSearchKey = { "clinicalFindings.findings.findId": clinicalFindingsFindId }
        }
        let diagnosisFindIdSearchKey = {};
        if (diagnosisFindId) {
            diagnosisFindIdSearchKey = { "diagnosis.findings.findId": diagnosisFindId }
        }
        let medicalHistoryFindIdSearchKey = {};
        if (medicalHistoryFindId) {
            medicalHistoryFindIdSearchKey = { "medicalHistory.medicals.medId": medicalHistoryFindId }
        }
        let deptIdSearchKey1 = {};
        if (deptId) {
            deptIdSearchKey1 = { "services.department.deptId": deptId }
        }
        let deptIdSearchKey2 = {};
        if (deptId) {
            deptIdSearchKey2 = { "treatmentData3.service.service.departmentId": deptId }
        }
        let servIdSearchKey1 = {};
        if (servId) {
            servIdSearchKey1 = { "services.service.servId": servId }
        }
        let servIdSearchKey2 = {};
        if (servId) {
            servIdSearchKey2 = { "procedures.service.servId": servId }
        }
        let servIdSearchKey3 = {};
        if (servId) {
            servIdSearchKey3 = { "treatmentData3.service.service.serviceId": servId }
        }
        let servIdSearchKey4 = {};
        if (servId) {
            servIdSearchKey4 = { "otherAttachment.service.servId": servId }
        }
        let procedIdSearchKey = {};
        if (procedId) {
            procedIdSearchKey = { "procedures.procedure.procedId": procedId }
        }
        let invoiceIdSearchKey = {};
        if (invoiceId) {
            invoiceIdSearchKey = { "treatmentData3.service.service.invoiceId": invoiceId };
        }
        // let caseSheetIdSearchKey = {};
        // if (caseSheetId) {
        //     caseSheetIdSearchKey = { _id: caseSheetId }
        // }
        // console.log("caseSheetIdSearchKey==>>>", caseSheetIdSearchKey);

        if (caseSheetId) {
            const fetchedCaseSheet = await caseSheets.find({ _id: caseSheetId, deletedAt: null })
                .populate("patientId", "firstName lastName displayId patientGroup")
                .populate("branchId", "name displayId businessUnit branchHead bookingContact incorporationName cinNumber gstNumber branchPrefix branchLogo emailContact contactNumber")
                .populate("buId", "name")
                .populate("createdBy", "firstName lastName")
                .populate("updatedBy", "firstName lastName")
                .populate("cheifComplaints.complaints.compId", "complaintName discription")
                .populate("clinicalFindings.findings.findId", "findingsName discription")
                .populate("medicalHistory.medicals.medId", "caseName remark")//where is collection
                .populate("services.department.deptId", "deptName")
                .populate("services.service.servId", "serviceName")
                .populate("procedures.procedure.procedId", "procedureName")
                .sort({ createdAt: -1 })
                .lean();
            const metaData = {
                currentPage: 1,
                perPage: 1,
                SearchKey: null,
                totalDocs: 1,
                totalPages: 1,
            }
            if (!fetchedCaseSheet) {
                return { status: false, data: [], metaData: {}, message: "CaseSheet could Not be found or deleted already!" }
            }
            return { status: true, data: fetchedCaseSheet, metaData: metaData, message: "CaseSheets details retrieved successfully." }

        }

        let query = caseSheets.find({
            ...searchQuery,
            // ...from_DateSearchKey,
            // ...toDateSearchKey,
            ...dateSearchKey,
            ...patientIdSearchKey,
            ...branchIdSearchKey,
            ...buIdSearchKey,
            ...createdBySearchKey,
            ...compIdSearchKey,
            ...clinicalFindingsFindIdSearchKey,
            ...diagnosisFindIdSearchKey,
            ...medicalHistoryFindIdSearchKey,
            ...deptIdSearchKey1,
            ...deptIdSearchKey2,
            ...servIdSearchKey1,
            ...servIdSearchKey2,
            ...servIdSearchKey3,
            ...servIdSearchKey4,
            ...procedIdSearchKey,
            ...invoiceIdSearchKey,
            ...updatedBySearchKey,
            // ...caseSheetIdSearchKey,
            deletedAt: null
        });
        const totalDocs = await caseSheets.countDocuments({
            ...searchQuery,
            // ...from_DateSearchKey,
            // ...toDateSearchKey,
            ...dateSearchKey,
            ...patientIdSearchKey,
            ...branchIdSearchKey,
            ...buIdSearchKey,
            ...createdBySearchKey,
            ...compIdSearchKey,
            ...clinicalFindingsFindIdSearchKey,
            ...diagnosisFindIdSearchKey,
            ...medicalHistoryFindIdSearchKey,
            ...deptIdSearchKey1,
            ...deptIdSearchKey2,
            ...servIdSearchKey1,
            ...servIdSearchKey2,
            ...servIdSearchKey3,
            ...servIdSearchKey4,
            ...procedIdSearchKey,
            ...invoiceIdSearchKey,
            ...updatedBySearchKey,
            // ...caseSheetIdSearchKey,
            deletedAt: null
        });
        console.log("totalDocs==>>>", totalDocs);
        const paginationObj = {};
        if (page && perPage) {
            // convert page and perPage to numbers
            paginationObj.pageNumber = parseInt(page, 10);
            paginationObj.perPageNumber = parseInt(perPage, 10);
            if (paginationObj.pageNumber <= 0 || paginationObj.pageNumber >= 500) return { status: false, message: "Invalid page number" };
            if (paginationObj.perPageNumber <= 0 || paginationObj.perPageNumber >= 500) return { status: false, message: "Invalid per page number" };
            paginationObj.skip = (paginationObj.pageNumber - 1) * paginationObj.perPageNumber;
            query = query.limit(paginationObj?.perPageNumber).skip(paginationObj?.skip);
        }
        const fetchedCaseSheets = await query
            .populate("patientId", "firstName lastName displayId patientGroup")
            .populate("branchId", "name displayId businessUnit branchHead bookingContact incorporationName cinNumber gstNumber branchPrefix branchLogo emailContact contactNumber")
            .populate("buId", "name")
            .populate("createdBy", "firstName lastName")
            .populate("updatedBy", "firstName lastName")
            .populate("cheifComplaints.complaints.compId", "complaintName discription")
            .populate("clinicalFindings.findings.findId", "findingsName discription")
            .populate("medicalHistory.medicals.medId", "caseName remark")//where is collection
            .populate("services.department.deptId", "deptName")
            .populate("services.service.servId", "serviceName")
            .populate("procedures.procedure.procedId", "procedureName")
            .sort({ createdAt: -1 })
            .lean();
        // .populate("invoiceId", "")
        // console.log("fetchedCaseSheet=>>>", fetchedCaseSheets);
        if (!fetchedCaseSheets) return { status: false, message: "CaseSheets can't be fetched!!" };


        const { createdByFirstNames, updatedByFirstNames } = fnToExtractFirstNameOfCreatedAndEditedBy(fetchedCaseSheets);



        let metaData = {};
        if (page && perPage) {
            const totalPages = Math.ceil(totalDocs / paginationObj?.perPageNumber);
            metaData = {
                currentPage: paginationObj?.pageNumber,
                perPage: paginationObj?.perPageNumber,
                SearchKey,
                totalDocs,
                totalPages,
                createdBy: createdByFirstNames,
                editedBy: updatedByFirstNames
            }
            if (fetchedCaseSheets?.length > 0)
                return { status: true, data: fetchedCaseSheets, metaData: metaData, message: "CaseSheets details retrieved successfully." }
            else
                return { status: false, data: [], metaData: metaData, message: "CaseSheets details Not Found!" }
        }
        else {
            metaData = {
                currentPage: 1,
                perPage: totalDocs,
                SearchKey,
                totalDocs,
                totalPages: 1,
            }

            if (fetchedCaseSheets?.length > 0)
                return { status: true, data: fetchedCaseSheets, metaData: metaData, message: "CaseSheets details retrieved successfully." }
            else
                return { status: false, data: [], metaData: metaData, message: "CaseSheets details Not Found!" }
        }

    }
    catch (error) {
        return { status: false, message: error.message || "CaseSheets can't be fetched!!" };
    }
}

module.exports = getCaseSheetDetailsFn