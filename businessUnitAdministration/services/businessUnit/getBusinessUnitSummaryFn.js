const clinetBusinessUnitSchema = require("../../../client/model/businessUnit")
const { getClientDatabaseConnection } = require("../../../db/connection")
const mongoose = require("mongoose");
const getBusinessUnitSummaryFn = async ({ clientId, businessUnitId }) => {
    try {
        //estaslishing db connection:
        const db = await getClientDatabaseConnection(clientId);
        const businessUnitModel = await db.model('businessunit', clinetBusinessUnitSchema);
        const result = await businessUnitModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(businessUnitId.toString()) }
            },
            //branch count
            {
                $lookup: {
                    from: "branches",
                    let: { lookUpField: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$businessUnit", "$$lookUpField"] } } },
                        { $match: { deletedAt: null } }
                    ],
                    as: "branches"
                }
            },
            { $addFields: { branchesCount: { $size: "$branches" } } },
            //Employees count
            {
                $lookup: {
                    from: "clientusers",
                    let: { lookUpField: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$businessUnit", "$$lookUpField"] } } },
                        { $match: { deletedAt: null } }
                    ],
                    as: "clientusers"
                }
            },
            { $addFields: { clientusersCount: { $size: "$clientusers" } } },
            //Chairs count
            {
                $lookup: {
                    from: "chairs",
                    let: { lookUpField: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$businessUnit", "$$lookUpField"] } } },
                        { $match: { deletedAt: null } }
                    ],
                    as: "chairs"
                }
            },
            { $addFields: { chairsCount: { $size: "$chairs" } } },
            //Departments count
            {
                $lookup: {
                    from: "departments",
                    let: { lookUpField: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$buId", "$$lookUpField"] } } },
                        { $match: { deletedAt: null } }
                    ],
                    as: "departments"
                }
            },
            { $addFields: { departmentsCount: { $size: "$departments" } } },
            //Services count
            {
                $lookup: {
                    from: "services",
                    let: { lookUpField: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$buId", "$$lookUpField"] } } },
                        { $match: { deletedAt: null } }
                    ],
                    as: "services"
                }
            },
            { $addFields: { servicesCount: { $size: "$services" } } },
            //Procedures count
            {
                $lookup: {
                    from: "procedures",
                    let: { lookUpField: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$buId", "$$lookUpField"] } } },
                        { $match: { deletedAt: null } }
                    ],
                    as: "procedures"
                }
            },
            { $addFields: { proceduresCount: { $size: "$procedures" } } },
            //patients count
            {
                $lookup: {
                    from: "patients",
                    let: { lookUpField: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$businessUnit", "$$lookUpField"] } } },
                        { $match: { deletedAt: null } }
                    ],
                    as: "patients"
                }
            },
            { $addFields: { patientsCount: { $size: "$patients" } } },
            //Cases count
            {
                $lookup: {
                    from: "casesheets",
                    let: { lookUpField: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$buId", "$$lookUpField"] } } },
                        { $match: { deletedAt: null } }
                    ],
                    as: "casesheets"
                }
            },
            { $addFields: { casesheetsCount: { $size: "$casesheets" } } },


            {
                $project: { branches: 0, clientusers: 0, chairs: 0, departments: 0, services: 0, procedures: 0, patients: 0, casesheets: 0 }
            }
        ]);
        // console.log("result=>>>", result);
        const returnData = {
                Branches: result[0]?.branchesCount,
                Employees: result[0]?.clientusersCount,
                Chairs: result[0]?.chairsCount,
                Departments: result[0]?.departmentsCount,
                Services: result[0]?.servicesCount,
                Procedures: result[0]?.proceduresCount,
                Patients: result[0]?.patientsCount,
                Cases: result[0]?.casesheetsCount
        };
        // console.log("returnData==>",returnData);
        
        if (!result) return { status: false, message: "Businessunit either deleted or couldn't be foound!!", data: {} };
        return { status: true, message: "success", data: returnData };
    }
    catch (error) {
        return { status: false, message: error?.message || "Couldn't update CaseSheet", data: {} }
    }
}

module.exports = getBusinessUnitSummaryFn 