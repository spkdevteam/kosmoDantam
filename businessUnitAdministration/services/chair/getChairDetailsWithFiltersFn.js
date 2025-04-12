const appointmentSchema = require("../../../client/model/appointments");
const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const clinetChairSchema = require("../../../client/model/chair");
const clinetPatientSchema = require("../../../client/model/patient");
const clinetUserSchema = require("../../../client/model/user");

const { getClientDatabaseConnection } = require("../../../db/connection");
const { formatChair } = require("../../../utils/helperFunctions");
const statusConversion = require("../../../utils/statusConversion");

const getChairDetailsWithFiltersFn = async ({ page = null, perPage = null, searchKey, chairId, businessUnitId, branchId, status, fromDate, toDate, createdUser, updatedUser, deletedUser, clientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const Chair = await db.model("chair", clinetChairSchema);
        //, clinetBusinessUnitSchema, clinetBranchSchema, clinetUserSchema


        //these are user for populating the data
        const bussinessUnit = await db.model("businessUnit", clinetBusinessUnitSchema);
        const branch = await db.model("branch", clinetBranchSchema);
        const user = await db.model("clientUsers", clinetUserSchema);
        const appoinments = await db.model("appointments", appointmentSchema);
        const patient = db.model('patient', clinetPatientSchema);



        if(chairId){
            const specificChair = await Chair.findOne({ _id: chairId, deletedAt: null})
            .populate("businessUnit", "_id name")
            .populate("branch", "_id name")
            .populate("activePatientId", "_id firstName lastName")
            .populate("activeAppointmentId", "_id displayId")
            .populate("createdBy", "_id firstName lastName")
            .populate("updatedBy", "_id firstName lastName")
            .populate("deletedBy", "_id firstName lastName")
            .lean();

            if(!specificChair){
                return {status: false, message: "Chair not found"};
            }

            const formattedChair = formatChair(specificChair);

            return {
                status: true,
                message: "The chair retrieved successfully.",
                data: {
                    chairs: formattedChair,
                    metadata: {
                        page: 1,
                        perPage: 1,
                        totalCount: 1,
                        totalPages: 1
                    },
                },
            };
        };

        let searchQuery = {};
        if (searchKey) {
            if (searchKey.trim()) {
                const words = searchKey.trim().split(/\s+/)
                    .map(word =>
                        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim()
                    );
                //const escapedSearchKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchQuery = {
                    $or: words.flatMap(word => [
                        { chairNumber: { $regex: word, $options: "i" } },
                        { chairLocation: { $regex: word, $options: "i" } },
                        { status: { $regex: word, $options: "i" } },
                    ]),
                };
            }
        }

        //apply filters only if parameters exist
        // const businessSearchKey = businessUnitId ? { businessUnit: businessUnitId } : {};
        // const branchIdSearchKey = branchId ? { branch: branchId } : {};
        // //const statusSearchKey = statusForSearchKey ? { status: statusForSearchKey } : {};
        // const createdUserSearchKey = createdUser ? { createdBy: createdUser } : {};
        // const updatedUserSearchKey = updatedUser ? { updatedBy: updatedUser } : {};
        // const deletedUserSearchKey = deletedUser ? { deletedBy: deletedUser } : {};

        const filterQuery = {
            deletedAt: null,
            ...searchQuery,
          };
          
          if (businessUnitId) filterQuery.businessUnit = businessUnitId;
          if (branchId) filterQuery.branch = branchId;
          if (status) filterQuery.status = status;
          if (createdUser) filterQuery.createdBy = createdUser;
          if (updatedUser) filterQuery.updatedBy = updatedUser;
          if (deletedUser) filterQuery.deletedBy = deletedUser;
          
          if (fromDate || toDate) {
            filterQuery.createdAt = {};
            if (fromDate) filterQuery.createdAt.$gte = new Date(fromDate);
            if (toDate) filterQuery.createdAt.$lte = new Date(toDate);
          }
          


        //apply date filters
        // let dateSearchKey = {};
        // if (fromDate || toDate) {
        //     dateSearchKey = { createdAt: {} };
        //     if (fromDate) dateSearchKey.createdAt.$gte = new Date(fromDate);
        //     if (toDate) dateSearchKey.createdAt.$lte = new Date(toDate);
        // };

        // {
        //     ...searchQuery,
        //     ...businessSearchKey,
        //     //...statusSearchKey,
        //     ...branchIdSearchKey,
        //     ...dateSearchKey,
        //     ...createdUserSearchKey,
        //     ...updatedUserSearchKey,
        //     ...deletedUserSearchKey,
        //     deletedAt: null,
        // }


        if (!page || !perPage) {
            const allChairs = await Chair.find(filterQuery)
                .populate("businessUnit", "_id name")
                .populate("branch", "_id name")
                .populate("activePatientId", "_id firstName lastName")
                .populate("activeAppointmentId", "_id displayId")
                .populate("createdBy", "_id firstName lastName")
                .populate("updatedBy", "_id firstName lastName")
                .populate("deletedBy", "_id firstName lastName")
                .lean();

            const formattedChairs = allChairs.map((chair) => formatChair(chair));

            return {
                status: true,
                message: "All chairs retrieved successfully.",
                data: {
                    chairs: formattedChairs,
                    metadata: {
                        page: 1,
                        perPage: allChairs?.length,
                        totalCount: allChairs?.length,
                        totalPages: 1
                    },
                },
            };
        };


        //query the database
        let query = Chair.find(filterQuery)
            .populate("businessUnit", "_id name")
            .populate("branch", "_id name")
            .populate("activePatientId", "_id firstName lastName")
            .populate("activeAppointmentId", "_id displayId")
            .populate("createdBy", "_id firstName lastName")
            .populate("updatedBy", "_id firstName lastName")
            .populate("deletedBy", "_id firstName lastName")
            .lean();

        //apply pagination only if page & perPage are provided
        page = Number(page) || 1;
        perPage = Number(perPage) || 10;

        const skip = (page - 1) * perPage;

        // Fetch data
        const chairs = await query.skip(skip).limit(perPage);

        const formattedChairs = chairs.map((chair) => formatChair(chair));

        // Get total count properly
        const totalCount = await Chair.countDocuments(filterQuery);

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / perPage);

        return {
            status: true,
            message: totalCount < 1 ? "No Chairs found" : "Chair details retrieved successfully.",
            data: {
                chairs: formattedChairs,
                metadata: {
                    page,
                    perPage,
                    totalCount,
                    totalPages,
                },
            },
        };
        //return { status: true, data: result };
    } catch (error) {
        console.log("error", error?.message)
        return { status: false, message: error?.message }
    }
}

module.exports = getChairDetailsWithFiltersFn;