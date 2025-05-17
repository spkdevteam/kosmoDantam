const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation, mongoIdValidation } = require("../../../utils/validation");
const postCreateBulkChairFN = require("../../services/chair/postCreateBulkChairFN");

const postCreateBulkChairCNTRL = async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    try {
        const { clientId, buId, branchId, data } = await sanitizeBody(req?.body)//data will contain chairLocation, chairNumber, branchName
        const validation = [
            clientIdValidation({ clientId }),
            mongoIdValidation({ _id: buId, name: "buId" })
        ];
        if (branchId) {
            validation.push(mongoIdValidation({ _id: branchId, name: "branchId" }));
        }
        const errors = validation.filter((e) => !e.status);
        if (errors.length > 0) {
            console.log("Validation failed:", errors);
            res.write(`event: error\ndata: ${JSON.stringify({ status: false, message: errors.map((e) => e.message).join(", ") })}\n\n`);
            return res.end();
        }
        console.log('reached Backend')
        const mainUser = req?.user;
        const result = await postCreateBulkChairFN({ clientId, buId, branchId, arrayObj: data, mainUser_id: mainUser?._id, stream: res })
        res.write(`event: done\ndata: ${JSON.stringify({ status: result?.status, message: result?.message })}\n\n`);
        res.end(); // Close SSE stream
    }
    catch (error) {
        console.error("Bulk Chair creation error:", error);

        // Fallback error event for SSE
        res.write(`event: error\ndata: ${JSON.stringify({ status: false, message: error?.message || "Internal Server Error" })}\n\n`);
        res.end();
    }

}

module.exports = postCreateBulkChairCNTRL