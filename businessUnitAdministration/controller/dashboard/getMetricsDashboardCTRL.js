const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation, mongoIdValidation, isValidDate } = require("../../../utils/validation");

const getMetricsDashboardCTRL = async (req, res, next) => {
    try {
        const { clientId ,
            buId ,
            branchId,
            day } = await sanitizeBody(req?.query);
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
        if (day && !isValidDate({ value: day })?.status) return res.status(400).json({ status: false, message: "Invalid date", data: [], metaData: {} });
        //dummy
        return res.status(200).json({
            status: 200, message: "CaseSheets counts fetched successfully", data: [
                {
                    module: 'Appointment',
                    Message:'Todays Appointment',
                    average:12,
                    value:24
            
                },
                {
                    module: 'Registration',
                    Message:'Todays Registration',
                    average:12,
                    value: 9,
            
            
                },
                {
                    module: 'Revenue',
                    Message:'Todays Revenue',
                    average:12,
                    value:3240
            
                },
                {
                    module: 'Payment',
                    Message:'Todays Payment',
                    average:12,
                    value:4240
            
                }],
            metaData: {
                module: "Appointment",
                viewType: "daily",
                fromDate: "2025-04-27",
                toData: "2025-04-28"
            }
        });
        //dummy
    }
    catch (error) {
        next(error);

    }
}

module.exports = getMetricsDashboardCTRL