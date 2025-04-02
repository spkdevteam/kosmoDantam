const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");
const getBranchDetailsFn = async ({ from_Date = null, toDate = null, SearchKey = "", page = null, perPage = null,
    clientId, businessUnitId = null }) => {
    try {
        let searchQuery = {};
        if (SearchKey) {
            if (SearchKey.trim()) {
                const escapedSearchKey = SearchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                if (isNaN(SearchKey)) {
                    searchQuery = {
                        $or: [//case insensitive searching and searching from anywhere of the target field
                            { name: { $regex: escapedSearchKey, $options: "i" } },
                            { incorporationName: { $regex: escapedSearchKey, $options: "i" } },
                            { cinNumber: { $regex: escapedSearchKey, $options: "i" } },
                            { gstNumber: { $regex: escapedSearchKey, $options: "i" } },
                            { branchPrefix: { $regex: escapedSearchKey, $options: "i" } },
                            { emailContact: { $regex: escapedSearchKey, $options: "i" } },
                            { contactNumber: { $regex: escapedSearchKey, $options: "i" } },
                            { city: { $regex: escapedSearchKey, $options: "i" } },
                            { state: { $regex: escapedSearchKey, $options: "i" } },
                            { country: { $regex: escapedSearchKey, $options: "i" } },
                            { ZipCode: { $regex: escapedSearchKey, $options: "i" } },
                            { address: { $regex: escapedSearchKey, $options: "i" } },
                        ]
                    }
                }
            }
        }


        let from_DateSearchKey = {};
        if (from_Date) {
            from_DateSearchKey = {
                createdAt: { $gte: new Date(from_Date) }
            }
        }
        let toDateSearchKey = {};
        if (toDate) {
            toDateSearchKey = {
                createdAt: { $lte: new Date(toDate) }
            }
        }
        //establishing db connection :
        const db = await getClientDatabaseConnection(clientId);
        const branch = await db.model('branch', clinetBranchSchema);
        const business = await db.model('businessUnit', clinetBusinessUnitSchema);
        let businessSearchKey = {};
        if (businessUnitId) {
            console.log("iiiiiiiiiiiiiiiiiiiiiiiii");
            const fetchedBusiness = await business.find({ _id: businessUnitId, deletedAt: null });
            console.log("fetchedBusiness=>>>>", fetchedBusiness);

            if (!fetchedBusiness) {
                return { status: false, message: "Bunsiness doesn't exist or deleted alreday" };
            }
            businessSearchKey = { businessUnit: businessUnitId }
        }
        let query = branch.find({
            ...searchQuery,
            ...businessSearchKey,
            ...from_DateSearchKey,
            ...toDateSearchKey
        });
        const paginationObj = {};
        if (page && perPage) {

            // convert page and perPage to numbers
            paginationObj.pageNumber = parseInt(page, 10);
            paginationObj.perPageNumber = parseInt(perPage, 10);
            if (paginationObj.pageNumber <= 0 || paginationObj.pageNumber >= 500) return { status: false, message: "Invalid page number" };
            if (paginationObj.perPageNumber <= 0 || paginationObj.perPageNumber >= 500) return { status: false, message: "Invalid per page number" };
            paginationObj.skip = (paginationObj.pageNumber - 1) * paginationObj.perPageNumber;
            query = query.limit(paginationObj?.perPageNumber).skip(paginationObj?.skip);
        }
        const fetchedBranch = await query.populate('businessUnit', 'name').lean();
        console.log("fetchedBranch=>>>", fetchedBranch);
        if (!fetchedBranch) return { status: false, message: "Branches can't be fetched!!" };

        const totalDocs = fetchedBranch?.length || 0;
        let metaData = {};
        if (page && perPage) {
            const totalPages = Math.ceil(totalDocs / paginationObj?.perPageNumber);
            metaData = {
                currentPage: paginationObj?.pageNumber,
                perPage: paginationObj?.perPageNumber,
                SearchKey,
                totalDocs,
                totalPages,
            }
            if (fetchedBranch?.length > 0)
                return { status: true, data: fetchedBranch, metaData: metaData, message: "Branch details retrieved successfully." }
            else
                return { status: false, data: [], metaData: metaData, message: "Branch details Not Found!" }
        }
        else {
            if (fetchedBranch?.length > 0)
                return { status: true, data: fetchedBranch, metaData: {}, message: "Branch details retrieved successfully." }
            else
                return { status: false, data: [], metaData: {}, message: "Branch details Not Found!" }
        }


    }
    catch (error) {
        return { status: false, message: error.message || "Branches can't be fetched!!" };
    }

}


module.exports = getBranchDetailsFn