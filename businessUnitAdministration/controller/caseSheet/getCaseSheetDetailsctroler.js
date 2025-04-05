const httpStatusCode = require("../../../utils/http-status-code");
const message = require("../../../utils/message");
const sanitizeBody = require("../../../utils/sanitizeBody");
const { mongoIdValidation, clientIdValidation, emptyStringValidation, isValidDate } = require("../../../utils/validation");
const getCaseSheetDetailsFn = require("../../services/caseSheets/getCaseSheetDetailsFn");

const getCaseSheetDetailsctrl = async (req, res) => {
    try {
        const data = await sanitizeBody(req?.query);
        console.log("inputData==>>>", data);
        const { from_Date, toDate, clientId, patientId, branchId, buId, compId,
            clinicalFindingsFindId, diagnosisFindId, medicalHistoryFindId, deptId, servId, procedId, invoiceId, updatedUser, createdUser } = data
        //from_Date, toDate,SearchKey, page, perPage, clientId, patientId, branchId, buId, createdBy, compId, clinicalFindingsFindId,
        //diagnosisFindId, medicalHistoryFindId, deptId, servId, procedId, invoiceId
        const validation = [
            clientIdValidation({ clientId }),
            // emptyStringValidation({ string: data?.SearchKey, name: "searchKey" }),
        ];
        if (from_Date) {
            validation.push(isValidDate({ value: from_Date }));
        }
        if (toDate) {
            validation.push(isValidDate({ value: toDate }));
        }
        if (patientId) {
            validation.push(mongoIdValidation({ _id: patientId, name: "patientId" }));
        }
        if (branchId) {
            validation.push(mongoIdValidation({ _id: branchId, name: "branchId" }));
        }
        if (buId) {
            validation.push(mongoIdValidation({ _id: buId, name: "buId" }));
        }
        if (compId) {
            validation.push(mongoIdValidation({ _id: compId, name: "compId" }));
        }
        if (clinicalFindingsFindId) {
            validation.push(mongoIdValidation({ _id: clinicalFindingsFindId, name: "clinicalFindingsFindId" }));
        }
        if (diagnosisFindId) {
            validation.push(mongoIdValidation({ _id: diagnosisFindId, name: "diagnosisFindId" }));
        }
        if (medicalHistoryFindId) {
            validation.push(mongoIdValidation({ _id: medicalHistoryFindId, name: "medicalHistoryFindId" }));
        }
        if (deptId) {
            validation.push(mongoIdValidation({ _id: deptId, name: "deptId" }));
        }
        if (servId) {
            validation.push(mongoIdValidation({ _id: servId, name: "servId" }));
        }
        if (procedId) {
            validation.push(mongoIdValidation({ _id: procedId, name: "procedId" }));
        }
        if (invoiceId) {
            validation.push(mongoIdValidation({ _id: invoiceId, name: "invoiceId" }));
        }
        if (createdUser) {
            validation.push(mongoIdValidation({ _id: createdUser, name: createdUser }))
        }
        if (updatedUser) {
            validation.push(mongoIdValidation({ _id: updatedUser, name: updatedUser }))
        }
        const error = validation.filter((e) => e && e.status == false);
        // if (error.length > 0) return { status: false, message: error.map(e => e.message).join(", ") };
        if (error.length > 0) {
            console.log("Validation failed:", error);
            return res.status(httpStatusCode.BadRequest).send({
                status: false,
                message: error.map(e => e.message).join(", ")
            });
        }
        console.log("here");
        const cleanQuery = {
            page: data.page ? data.page.replace(/^"|"$/g, "") : null, // default to "1" if missing
            perPage: data.perPage ? data.perPage.replace(/^"|"$/g, "") : null, // default to "10"
            SearchKey: data.SearchKey ? String(data.SearchKey.replace(/^"|"$/g, "")) : "", // default to empty string
        };
        const { page, perPage, SearchKey } = cleanQuery;
        const result = await getCaseSheetDetailsFn({
            from_Date, toDate, SearchKey, page, perPage, clientId, patientId, branchId, buId,
            compId, clinicalFindingsFindId, diagnosisFindId, medicalHistoryFindId, deptId, servId, procedId, invoiceId,
            createdBy: createdUser, updatedBy: updatedUser
        });
        // console.log("result=>>>>", result)
        if (!result?.status) return res.status(httpStatusCode.InternalServerError).send({
            message: result?.message, status: result?.status
        });
        return res.status(200).send({ message: result?.message, data: { caseSheets: result?.data, metaData: result?.metaData }, status: true });
    }
    catch (error) {
        console.error("Error in list caseSheets:", error);
        return res.status(httpStatusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
}

module.exports = getCaseSheetDetailsctrl