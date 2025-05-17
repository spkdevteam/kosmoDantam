const sanitizeBody = require("../../../utils/sanitizeBody");
const { mongoIdValidation, clientIdValidation, emptyStringValidation, isValidDate } = require("../../../utils/validation");
const postCreateBulkBranchFN = require("../../services/branches/postCreateBulkBranchFN");

const postCreateBulkBranchCTRL = async (req, res, next) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
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
        const errors = validation.filter((e) => !e.status);
        if (errors.length > 0) {
            console.log("Validation failed:", errors);
            res.write(`event: error\ndata: ${JSON.stringify({ status: false, message: errors.map((e) => e.message).join(", ") })}\n\n`);
            return res.end();
            // return res.status(400).send({
            //     status: false,
            //     message: errors.map(e => e.message).join(", ")
            // });
        }
        console.log("here");
        const result = await postCreateBulkBranchFN({ clientId, buId, dataArr: data, mainUserId: mainUser?._id, stream: res });
        console.log("result=>>>>", result)
        res.write(`event: done\ndata: ${JSON.stringify({ status: result?.status, message: result?.message })}\n\n`);
        res.end(); // Close SSE stream
        // if (!result?.status) return res.status(500).send({
        //     message: result?.message,
        //     status: result?.status
        // });
        // return res.status(200).send({ message: result?.message, status: result?.status });
    }
    catch (error) {
        console.error("Bulk Branch creation error:", error);

        // Fallback error event for SSE
        res.write(`event: error\ndata: ${JSON.stringify({ status: false, message: error?.message || "Internal Server Error" })}\n\n`);
        res.end();
        // console.error("Error bulk Importing Branches:", error);
        // return res.status(500).send({
        //     message: error?.message || 'Internal server error',
        //     status: false
        // });
    }
}
module.exports = postCreateBulkBranchCTRL