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
        queryPipeline.push({
            $facet: {
                statusCounts: [
                    {
                        $project: {
                            status: "$_id",
                            count: 1,
                            _id: 0
                        }
                    }
                ],
                totalCount: [
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$count" }
                        }
                    }
                ]
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
        if ( !result || result[0]?.length < 1) {
            return {
                status: false,
                message: "CaseSheets Count can't be fetched!!",
                data: [],
                metadata: {},
            }
        }
        returnData = [
            {
                Type:'Total Cases',
                value: 0
            },
            {
                Type:'Proposed',
                value: 0
            },
            {
                Type:'In Progress',
                value: 0
            },
            {
                Type:'Completed',
                value: 0
            },
            {
                Type:'Cancelled',
                value: 0
            },
        ]
        for (const r of returnData){
            const index = result[0]?.statusCounts?.findIndex(item => String(item.status) == String(r.Type))
            if(index >-1 ){
                r.value = result[0]?.statusCounts[index]?.count
            }
        }
        // console.log("result[0]?.totalCount?.total",result[0]?.totalCount[0].total)
        returnData[0].value = result[0]?.totalCount[0]?.total || 0
        const metaData = {
            day : day ? day : null,
            totalCount: returnData[0]?.value
        }
        return {status : true , message : "CaseSheet counts fethced successfully!" , data : returnData, metaData : metaData}
    }
    catch (error) {
        console.log("error", error?.message)
        return { status: false, message: error?.message, data: [], metadata: {} }
    }
}
module.exports = getCaseSheetDashboardFN;