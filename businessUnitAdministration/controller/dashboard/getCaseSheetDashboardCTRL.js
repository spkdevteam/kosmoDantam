const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation, mongoIdValidation, isValidDate } = require("../../../utils/validation");
const getCaseSheetDashboardFN = require("../../services/dashboard/getCaseSheetDashboardFN");

const getCaseSheetDashboardCTRL = async (req, res, next) => {
    try {
        const { clientId, buId, branchId, day } = await sanitizeBody(req?.query);//buId, branchId, day aren't mandatory..day isn't being used
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
        if (day && !isValidDate({ value: day })?.status) return res.status(400).json({ status: false, message: "Invalid date", data: [], metaData: {} });
        //dummy
        // return res.status(200).json({ status: 200, message: "CaseSheets counts fetched successfully", data: [ {
        //     Type:'Total Cases ',
        //     value:100

        // },
        // {
        //     Type:'Proposed ',
        //     value:10

        // },
        // {
        //     Type:'In Progress',
        //     value:20

        // },
        // {
        //     Type:"Completed",
        //     value:30

        // },
        // {
        //     Type:'Cancelled ',
        //     value:40

        // }], 
        // metaData : {
        //     day : '2025-04-28', 
        //     totalCount : 100
        // } });
        //dummy
        const result = await getCaseSheetDashboardFN({ clientId, buId, branchId, day })
        if (!result?.status) return res.status(400).json({ status: result?.status, message: result?.message, data: result?.data || [], metaData: result?.metaData || {} });
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data, metaData: result?.metaData });
    }
    catch (error) {
        next(error);

    }
}
module.exports = getCaseSheetDashboardCTRL