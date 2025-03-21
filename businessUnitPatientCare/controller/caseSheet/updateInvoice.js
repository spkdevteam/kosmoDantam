const updateInvoiceFn = require("../../services/caseSheet/updateInvoiceFn");
const mongoose = require("mongoose");
const patchUpdateInvoice = async (req, res, next) =>{
    try{
        const {caseSheetId, treatmentData3, clientId} = req?.body;
        if(!caseSheetId || !treatmentData3 || !clientId) return { status: false, message: "Bad request!!", data: {} }
        //console.log(caseSheetId, treatmentData3);
        if (!mongoose.Types.ObjectId.isValid(caseSheetId)) {
            return { status: false, message: "Invalid caseSheetId", data : {} }
        }
        const clientIdValidation = ({ clientId }) => {
            if (!clientId || typeof clientId !== "string" || clientId.length !== 24 || !/^[A-Za-z0-9]+$/.test(clientId)) {
                return { status: false, message: "Some networking problem",  data : {} };
            }
        }
        clientIdValidation({ clientId });
        const result = await updateInvoiceFn({caseSheetId, inputArrObj : treatmentData3, clientId});
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data});

    }
    catch(error){
        next(error);
    }
}

module.exports = patchUpdateInvoice