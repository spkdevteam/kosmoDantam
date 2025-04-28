const caseSheetSchema = require("../../../client/model/caseSheet");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");

const getCaseSheetDashboardFN = async ({ clientId, buId, branchId, day }) => {
    try {
        //db connection :
        const db = await getClientDatabaseConnection(clientId);
        const caseSheets = await db.model('casesheets', caseSheetSchema);
        const filterQuery = {
            deletedAt: null,
        };
        if (buId) filterQuery.buId = new mongoose.Types.ObjectId(buId);
        if (branchId) filterQuery.branchId = new mongoose.Types.ObjectId(branchId);
        const queryPipeline = [];
        queryPipeline.push({
            $match: {
                ...(filterQuery || {}), // fromDate, toDate, businessUnit, branch, etc.
            }
        });
        queryPipeline.push({
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        });
        // queryPipeline.push({
        //     $facet: {
        //         statusCounts: [
        //             {
        //                 $project: {
        //                     status: "$_id",
        //                     count: 1,
        //                     _id: 0
        //                 }
        //             }
        //         ],
        //         totalCount: [
        //             {
        //                 $group: {
        //                     _id: null,
        //                     total: { $sum: "$count" }
        //                 }
        //             }
        //         ]
        //     }
        // });
        // 2. Group by status
        queryPipeline.push({
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        });

        // 3. Project to clean up
        queryPipeline.push({
            $project: {
                Type: "$_id",
                value: "$count",
                _id: 0
            }
        });

        console.log("queryPipeline==>>", queryPipeline)
        const result = await caseSheets.aggregate(queryPipeline);
        // return {
        //     status : true,
        //     data : queryPipeline
        // metaData : {test : "test"}
        // } 
        console.log("resultresult==>>>>>", result)
        const fetchedCaseSheets = result[0]?.statusCounts || [];
        if (!result || result[0]?.length < 1) {
            return {
                status: false,
                message: "CaseSheets Count can't be fetched!!",
                data: {},
                metadata: {},
            }
        }
        //
        const expectedStatuses = ['In Progress', 'Cancelled', 'Completed', 'Proposed'];
        const dataMap = {};

        // map existing results
        result.forEach(item => {
            dataMap[item.Type] = item.value;
        });

        // build final data array
        const finalData = [];

        // push expected statuses
        expectedStatuses.forEach(status => {
            finalData.push({
                Type: status,
                value: dataMap[status] || 0
            });
        });

        // calculate total
        const total = finalData.reduce((acc, curr) => acc + curr.value, 0);

        // push total
        finalData.push({
            Type: 'Total Cases',
            value: total
        });


        //
        return { status: true, message: "CaseSheet counts fethced successfully!", data: finalData, metaData: {} }
    }
    catch (error) {
        console.log("error", error?.message)
        return { status: false, message: error?.message }
    }
}
module.exports = getCaseSheetDashboardFN;