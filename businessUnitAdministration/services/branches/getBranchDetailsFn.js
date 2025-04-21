const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");
const getBranchDetailsFn = async ({ from_Date = null, toDate = null, SearchKey = "", page = null, perPage = null,
    clientId, businessUnitId = null, createdBy, updatedBy, branchId }) => {
    try {
        let searchQuery = {};
        if (SearchKey) {
            if (SearchKey.trim()) {
                const words = SearchKey.trim().split(/\s+/)//spiltting by space
                    .map(word =>
                        word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special characters
                    );
                // const escapedSearchKey = SearchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                searchQuery = {
                    $or: words.flatMap(word => [//case insensitive searching and searching from anywhere of the target field
                        { name: { $regex: word, $options: "i" } },
                        { incorporationName: { $regex: word, $options: "i" } },
                        { bookingContact : { $regex: word, $options: "i" } }, 
                        { cinNumber: { $regex: word, $options: "i" } },
                        { gstNumber: { $regex: word, $options: "i" } },
                        { branchPrefix: { $regex: word, $options: "i" } },
                        { emailContact: { $regex: word, $options: "i" } },
                        { contactNumber: { $regex: word, $options: "i" } },
                        { city: { $regex: word, $options: "i" } },
                        { state: { $regex: word, $options: "i" } },
                        { country: { $regex: word, $options: "i" } },
                        { ZipCode: { $regex: word, $options: "i" } },
                        { address: { $regex: word, $options: "i" } },
                    ])
                }
            }
        }
        console.log("searchQuery=>>>", searchQuery);
        // return { status: true, data: searchQuery, message: "searchQuery" }
        // let from_DateSearchKey = {};
        // if (from_Date) {
        //     from_DateSearchKey = {
        //         createdAt: { $gte: new Date(from_Date) }
        //     }
        // }
        // let toDateSearchKey = {};
        // if (toDate) {
        //     toDateSearchKey = {
        //         createdAt: { $lte: new Date(toDate) }
        //     }
        // }
        
        let dateSearchKey = {};

        if (from_Date || toDate) {
            dateSearchKey.createdAt = {};

            if (from_Date) {
                dateSearchKey.createdAt.$gte = new Date(from_Date);
            }
            if (toDate) {
                dateSearchKey.createdAt.$lte = new Date(toDate);
            }
        }
        let createdBySearchKey = {};
        if (createdBy) {
            createdBySearchKey = { createdBy: createdBy }
        }
        let updatedBySearchKey = {};
        if (updatedBy) {
            updatedBySearchKey = { updatedBy: updatedBy }
        }
        let branchIdSearchKey = {};
        if (branchId){
            branchIdSearchKey = {_id : branchId}
        }
        //establishing db connection :
        const db = await getClientDatabaseConnection(clientId);
        const branch = await db.model('branch', clinetBranchSchema);
        const business = await db.model('businessUnit', clinetBusinessUnitSchema);
        const user = await db.model('clientUsers', clinetUserSchema);
        let businessSearchKey = {};
        if (businessUnitId) {
            businessSearchKey = { businessUnit: businessUnitId }
        }
        let query = branch.find({
            ...searchQuery,
            ...businessSearchKey,
            // ...from_DateSearchKey,
            // ...toDateSearchKey,
            ...dateSearchKey,
            ...createdBySearchKey,
            ...updatedBySearchKey,
            ...branchIdSearchKey,
            deletedAt: null
        });
        const totalDocs = await branch.countDocuments({
            ...searchQuery,
            ...businessSearchKey,
            // ...from_DateSearchKey,
            // ...toDateSearchKey,
            ...dateSearchKey,
            ...createdBySearchKey,
            ...updatedBySearchKey,
            ...branchIdSearchKey,
            deletedAt: null
        });
        console.log("totalDocs==>>>", totalDocs);

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
        const fetchedBranch = await query
            .populate('businessUnit', 'name')
            .populate('branchHead', 'firstName lastName')
            .populate('createdBy', 'firstName lastName')
            .populate('updatedBy', 'firstName lastName')
            .populate('deletedBy', 'firstName lastName')
            .sort({ createdAt: -1 })
            .lean();//createdBy, updatedBy
        console.log("fetchedBranch=>>>", fetchedBranch);
        if (!fetchedBranch) return { status: false, message: "Branches can't be fetched!!" };


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
                return { status: false, data: [], metaData: metaData, message: "Branch details Not Found!!!" }
        }
        else {
            metaData = {
                currentPage: 1,
                perPage: totalDocs,
                SearchKey,
                totalDocs,
                totalPages: 1,
            }

            if (fetchedBranch?.length > 0)
                return { status: true, data: fetchedBranch, metaData: metaData, message: "Branch details retrieved successfully." }
            else
                return { status: false, data: [], metaData: metaData, message: "Branch details Not Found!" }
        }


    }
    catch (error) {
        return { status: false, message: error.message || "Branches can't be fetched!!" };
    }

}


module.exports = getBranchDetailsFn