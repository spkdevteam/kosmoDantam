const updateInvoiceFn = require("../../services/caseSheet/updateInvoiceFn");

const patchUpdateInvoice = async (req, res, next) =>{
    try{
        const {caseSheetId, treatmentData3, clientId} = req?.body;
        if(!caseSheetId || !treatmentData3 || !clientId) return { status: false, message: "Bad request!!", data: {} }
        //console.log(caseSheetId, treatmentData3);
        const result = await updateInvoiceFn({caseSheetId, inputArrObj : treatmentData3, clientId});
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data});

    }
    catch(error){
        next(error);
    }
}

module.exports = patchUpdateInvoice