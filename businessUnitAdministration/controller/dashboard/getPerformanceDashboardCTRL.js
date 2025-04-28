const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation, mongoIdValidation } = require("../../../utils/validation");

const getPerformanceDashboardCTRL = async (req, res, next) => {
    try {
        const { clientId,
            buId,
            branchId, module, viewType, fromDate, toDate } = await sanitizeBody(req?.query);
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
            status: 200, message: "CaseSheets counts fetched successfully", data: [{
                Module: 'Chair',
                Message: 'Chair Occupancy Rate',
                value: '50%'
            },
            {
                Module: 'Patient',
                Message: 'Avg. Inpatient TAT',
                value: '50 minutes'
            },
            {
                Module: 'Employee',
                Message: ' Registered Employees',
                value: '10'
            },
            {
                Module: 'Services',
                Message: ' Services Count',
                value: '11'
            },],
            metaData: {
                day: "2025-04-27",
                totalCount: 100,
            }
        })
    }
    catch (error) {
        next(error);

    }
}
module.exports = getPerformanceDashboardCTRL