const sanitizeBody = require("../../../utils/sanitizeBody");
const mongoose = require("mongoose");
const getBusinessUnitSummaryFn = require("../../services/businessUnit/getBusinessUnitSummaryFn");


const getBusinessUnitSummary = async (req, res, next) =>{
    try{
        const data = await sanitizeBody(req.params);
        const { clientId, businessUnitId } = data;
        // console.log(clientId, businessUnitId);
        
        const clientIdValidation = ({ clientId }) => {
            if (!clientId || typeof clientId !== "string" || clientId.length !== 24 || !/^[A-Za-z0-9]+$/.test(clientId)) {
                return { status: false, message: "Some networking problem" };
            }
        }
        clientIdValidation({clientId});
        if (!mongoose.Types.ObjectId.isValid(businessUnitId)) {
            return { status: false, message: "Invalid businessUnitId" } 
        }

        const result = await getBusinessUnitSummaryFn({clientId, businessUnitId});
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data});
    }
    catch(error){
        next(error)
    }
}

module.exports = getBusinessUnitSummary