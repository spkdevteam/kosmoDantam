const httpStatusCode = require("../../../utils/http-status-code");
const message = require("../../../utils/message");
const sanitizeBody = require("../../../utils/sanitizeBody");
const { mongoIdValidation, clientIdValidation, emptyStringValidation, isValidDate } = require("../../../utils/validation");

const getPatientsDetailsctrl = async (req, res) => {
    try {
        const data = await sanitizeBody(req?.query);
        console.log("inputData==>>>", data);
        const {from_Date, toDate,  clientId,branchId, businessUnitId, mainPatientLinkedId, createdById} = data;
        //from_Date, toDate,SearchKey, page, perPage, clientId,branchId, businessUnitId, mainPatientLinkedId, createdById
        const validation = [
                    clientIdValidation({ clientId }),
                    emptyStringValidation({string:data?.SearchKey, name: "searchKey"}),
                ];
    }
    catch (error) {
        console.error("Error in list Patients:", error);
        return res.status(httpStatusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
}

module.exports = getPatientsDetailsctrl