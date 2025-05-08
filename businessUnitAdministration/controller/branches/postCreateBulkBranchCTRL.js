const sanitizeBody = require("../../../utils/sanitizeBody");
const { mongoIdValidation, clientIdValidation, emptyStringValidation, isValidDate } = require("../../../utils/validation");
const postCreateBulkBranchFN = require("../../services/branches/postCreateBulkBranchFN");

const postCreateBulkBranchCTRL = async (req, res, next) => {
    try {
        console.log("hereeeeeeee")
        const mainUser = req?.user;
        const reqBody = await sanitizeBody(req?.body)
        const { clientId, buId, data } = reqBody;
        // const { clientId, name, emailContact, branchPrefix, contactNumber, country, state, city, ZipCode, address, incorporationName, cinNumber, gstNumber, businessUnit, branchHeadId } = req.body;
        const validation = [
            clientIdValidation({ clientId }),
            mongoIdValidation({ _id: buId, name: "buId" })
            // emptyStringValidation({string:data?.SearchKey, name: "searchKey"}),
        ];
        if (error.length > 0) {
            console.log("Validation failed:", error);
            return res.status(400).send({
                status: false,
                message: error.map(e => e.message).join(", ")
            });
        }
        console.log("here");
        const result = await postCreateBulkBranchFN({ clientId, buId, dataArr: data, mainUserId: mainUser?._id });
        console.log("result=>>>>", result)
        if (!result?.status) return res.status(500).send({
            message: result?.message,
            status: result?.status
        });
        return res.status(200).send({ message: result?.message, status: result?.status });
    }
    catch (error) {
        console.error("Error bulk Importing Branches:", error);
        return res.status(500).send({
            message: error?.message || 'Internal server error',
            status: false
        });
    }
}
module.exports = postCreateBulkBranchCTRL