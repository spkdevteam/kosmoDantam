const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation, mongoIdValidation } = require("../../../utils/validation");

const getCaseSheetDashboardCTRL = async (req, res, next) => {
    try {
        const { clientId, buId , branchId , day } = await sanitizeBody(req?.query);
        const validation = [
            clientIdValidation({ clientId })
        ];
        if(buId){
            validation.push(mongoIdValidation({_id: buId, name: "buId"}));
        }
        if(branchId){
            validation.push(mongoIdValidation({_id: branchId, name: "BranchId"}));
        }
        // if(branchId){

        // }
        

    }
    catch(error) {
        next(error);

    }
}
module.exports = getCaseSheetDashboardCTRL