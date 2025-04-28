const sanitizeBody = require("../../../utils/sanitizeBody");
const { mongoIdValidation, clientIdValidation } = require("../../../utils/validation");

const getGraphDashboardCTRL = async (req, res, next) => {
    try{
        const { clientId ,
            buId ,
            branchId, module ,viewType , fromDate,toDate   } = await sanitizeBody(req?.query);
        const validation = [
            clientIdValidation({ clientId })
        ];
        if (buId) {
            validation.push(mongoIdValidation({ _id: buId, name: "buId" }));
        }
        if (branchId) {
            validation.push(mongoIdValidation({ _id: branchId, name: "BranchId" }));
        }
        // if(branchId){

        // }
        const error = validation.filter((e) => e && e.status == false);
        if (error.length > 0) return res.status(400).json({ status: false, message: error.map((e) => e.message).join(", "), data: [], metaData: {} })
        //dummy
        return res.status(200).json({
            status: 200, message: "CaseSheets counts fetched successfully", data: [
                { name: 'Mon', value: 4000, },
                { name: 'Tue', value: 3000, },
                { name: 'Wed', value: 2000, },
                { name: 'Thu', value: 2780, },
                { name: 'Fri', value: 1890, },
                { name: 'Sat', value: 1890, },],
            metaData: {
                module: "Appointment",
                viewType: "daily",
                fromDate: "2025-04-27",
                toData: "2025-04-28"
            }
        });
        //dummy
    }
    catch(error){
        next(error);

    }
}

module.exports = getGraphDashboardCTRL