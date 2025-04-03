const httpStatusCode = require("../../../utils/http-status-code");
const message = require("../../../utils/message");
const sanitizeBody = require("../../../utils/sanitizeBody");
const { mongoIdValidation, clientIdValidation, emptyStringValidation, isValidDate } = require("../../../utils/validation");
const getPatientsDetailsFn = require("../../services/patients/getPatientsDetailsFn");

const getPatientsDetailsctrl = async (req, res) => {
    try {
        const data = await sanitizeBody(req?.query);
        console.log("inputData==>>>", data);
        const { from_Date, toDate, clientId, branchId, businessUnitId, mainPatientLinkedId, createdUser, updatedUser } = data;
        //from_Date, toDate,SearchKey, page, perPage, clientId,branchId, businessUnitId, mainPatientLinkedId, createdById
        const validation = [
            clientIdValidation({ clientId }),
            emptyStringValidation({ string: data?.SearchKey, name: "searchKey" }),
        ];
        if (from_Date) {
            validation.push(isValidDate({ value: from_Date }));
        }
        if (toDate) {
            validation.push(isValidDate({ value: toDate }));
        }
        if (businessUnitId) {
            validation.push(mongoIdValidation({ _id: businessUnitId, name: "businessUnitId" }));
        }
        if (branchId) {
            validation.push(mongoIdValidation({ _id: branchId, name: "branchId" }));
        }
        if (mainPatientLinkedId) {
            validation.push(mongoIdValidation({ _id: mainPatientLinkedId, name: "mainPatientLinkedId" }));
        }
        if (createdUser) {
            validation.push(mongoIdValidation({ _id: createdUser, name: "createdUser" }));
        }
        if (updatedUser) {
            validation.push(mongoIdValidation({ _id: updatedUser, name: "updatedUser" }));
        }
        const error = validation.filter((e) => e && e.status == false);
        if (error.length > 0) return { status: false, message: error.map(e => e.message).join(", ") };
        console.log("here");
        const cleanQuery = {
            page: data.page ? data.page.replace(/^"|"$/g, "") : null, // default to null if missing
            perPage: data.perPage ? data.perPage.replace(/^"|"$/g, "") : null, // default to null
            SearchKey: data.SearchKey ? String(data.SearchKey.replace(/^"|"$/g, "")) : "", // default to empty string
        };
        const { page, perPage, SearchKey } = cleanQuery;
        const result = await getPatientsDetailsFn({
            from_Date, toDate, SearchKey, page, perPage,
            clientId, branchId, businessUnitId, mainPatientLinkedId, createdById : createdUser, updatedById : updatedUser
        });
        console.log("result=>>>>", result)
        if (!result?.status) return res.status(httpStatusCode.InternalServerError).send({
            message: result?.message, status : false
        });
        return res.status(200).send({ message: result?.message, data: { patients: result?.data, metaData: result?.metaData }, status: true });

    }
    catch (error) {
        console.error("Error in list Patients:", error);
        return res.status(httpStatusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,status : false
        });
    }
}

module.exports = getPatientsDetailsctrl