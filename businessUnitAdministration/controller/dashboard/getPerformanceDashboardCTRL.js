const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation, mongoIdValidation, isValidDate } = require("../../../utils/validation");
const getPerformanceDashboardFN = require("../../services/dashboard/getPerformanceDashboardFN");

const getPerformanceDashboardCTRL = async (req, res, next) => {
    try {//clientId, buId, fromDate, toDate mandatory
        const { clientId, buId, branchId, fromDate, toDate } = await sanitizeBody(req?.query);
        const validation = [
            clientIdValidation({ clientId }),
            mongoIdValidation({ _id: buId, name: "buId" })
        ];
        if (branchId) {
            validation.push(mongoIdValidation({ _id: branchId, name: "BranchId" }));
        }
        // if(branchId){

        // }
        const error = validation.filter((e) => e && e.status == false);
        if (error.length > 0) return res.status(400).json({ status: false, message: error.map((e) => e.message).join(", "), data: [], metaData: {} })
        if (!isValidDate({ value: fromDate })?.status) return res.status(400).json({ status: false, message: "Invalid From Date", data: [], metaData: {} });
        if (!isValidDate({ value: toDate })?.status) return res.status(400).json({ status: false, message: "Invalid To Date", data: [], metaData: {} });
        const fromDateStr = new Date(fromDate);
        const toDateStr = new Date(toDate);
        if (fromDateStr > toDateStr) return res.status(400).json({ status: false, message: "From Date can not be greater than To Date", data: [], metaData: {} });

        //dummy
        // return res.status(200).json({
        //     status: 200, message: "CaseSheets counts fetched successfully", data: [{
        //         Module: 'Chair',
        //         Message: 'Chair Occupancy Rate',
        //         value: '50%'
        //     },
        //     {
        //         Module: 'Patient',
        //         Message: 'Avg. Inpatient TAT',
        //         value: '50 minutes'
        //     },
        //     {
        //         Module: 'Employee',
        //         Message: ' Registered Employees',
        //         value: '10'
        //     },
        //     {
        //         Module: 'Services',
        //         Message: ' Services Count',
        //         value: '11'
        //     },],
        //     metaData: {
        //         day: "2025-04-27",
        //         totalCount: 100,
        //     }
        // })
        const result = await getPerformanceDashboardFN({ clientId, buId, branchId, fromDate, toDate })
        if (!result?.status) return res.status(400).json({ status: result?.status, message: result?.message, data: result?.data || [], metaData: result?.metaData || {} });
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data, metaData: result?.metaData });


    }
    catch (error) {
        next(error);

    }
}
module.exports = getPerformanceDashboardCTRL