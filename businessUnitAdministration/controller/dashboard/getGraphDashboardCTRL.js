const sanitizeBody = require("../../../utils/sanitizeBody");
const { mongoIdValidation, clientIdValidation, isValidDate } = require("../../../utils/validation");
const getGraphDashboardFN = require("../../services/dashboard/getGraphDashboardFN");

const getGraphDashboardCTRL = async (req, res, next) => {
    try {//clientId, buId, module, viewType, fromDate, toDate are mandatory
        const { clientId, buId, branchId, module, viewType, fromDate, toDate } = await sanitizeBody(req?.query);
        const validation = [
            clientIdValidation({ clientId }),
            mongoIdValidation({ _id: buId, name: "buId" })
        ];
        if (branchId) {
            validation.push(mongoIdValidation({ _id: branchId, name: "BranchId" }));
        }
        const error = validation.filter((e) => e && e.status == false);
        if (error.length > 0) return res.status(400).json({ status: false, message: error.map((e) => e.message).join(", "), data: [], metaData: {} })
        if (!isValidDate({ value: fromDate })?.status) return res.status(400).json({ status: false, message: "Invalid from date", data: [], metaData: {} });
        if (!isValidDate({ value: toDate })?.status) return res.status(400).json({ status: false, message: "Invalid to date", data: [], metaData: {} });
        if (new Date(fromDate) > new Date(toDate)) {
            return res.status(400).json({ status: false, message: "From date must be less than or equal to To date", data: [], metaData: {} });
        }
        if (typeof module !== "string" || module.length < 1) return res.status(400).json({ status: false, message: "Invalid module", data: [], metaData: {} });
        if (typeof viewType !== "string" || module.length < 1) return res.status(400).json({ status: false, message: "Invalid view Type", data: [], metaData: {} });

        //dummy
        // return res.status(200).json({
        //     status: 200, message: "CaseSheets counts fetched successfully", data: [
        //         { name: 'Mon', value: 4000, },
        //         { name: 'Tue', value: 3000, },
        //         { name: 'Wed', value: 2000, },
        //         { name: 'Thu', value: 2780, },
        //         { name: 'Fri', value: 1890, },
        //         { name: 'Sat', value: 1890, },],
        //     metaData: {
        //         module: "Appointment",
        //         viewType: "daily",
        //         fromDate: "2025-04-27",
        //         toData: "2025-04-28"
        //     }
        // });
        //dummy
        const result = await getGraphDashboardFN({ clientId, buId, branchId, module, viewType, fromDate, toDate })
        if (!result?.status) return res.status(400).json({ status: result?.status, message: result?.message, data: result?.data || [], metaData: result?.metaData || {} });
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data, metaData: result?.metaData });
    }
    catch (error) {
        next(error);

    }
}

module.exports = getGraphDashboardCTRL