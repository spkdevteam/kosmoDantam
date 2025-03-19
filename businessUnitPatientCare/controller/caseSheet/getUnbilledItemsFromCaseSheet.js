const getUnbilledItemsFromCaseSheetFn = require("../../services/caseSheet/getUnbilledItemsFromCaseSheetFn");

const getUnbilledItemsFromCaseSheet = async (req, res, next)=>{
    try{
        const { clientId, caseSheetId} = req?.params;
        console.log(clientId, caseSheetId);
        if(!clientId || !caseSheetId ) return res.status(200).json({ status: false, message: "Bad request!!", data: {}});
        const result = await getUnbilledItemsFromCaseSheetFn({clientId, caseSheetId});
        return res.status(200).json({ status: result?.status, message: result?.message, itemKart: result?.itemKart});
    }
    catch(error){
        next(error);
    }
}

module.exports = getUnbilledItemsFromCaseSheet;