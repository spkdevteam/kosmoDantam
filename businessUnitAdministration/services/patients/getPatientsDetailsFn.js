const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const clinetPatientSchema = require("../../../client/model/patient");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");

const getPatientsDetailsFn = async ({ from_Date = null, toDate = null, SearchKey = "", page = null,
    perPage = null, clientId, branchId, businessUnitId, mainPatientLinkedId, createdById, updatedById,status }) => {
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
                    $or: words.flatMap(word => {
                        const numWord = Number(word); // Convert word to number
                        const boolWord = word.toLowerCase() === "true" ? true : word.toLowerCase() === "false" ? false : null; // Convert word to Boolean
                        return [//case insensitive searching and searching from anywhere of the target field
                            { relation: { $regex: word, $options: "i" } },
                            { firstName: { $regex: word, $options: "i" } },
                            { lastName: { $regex: word, $options: "i" } },
                            { email: { $regex: word, $options: "i" } },
                            { phone: { $regex: word, $options: "i" } },
                            { gender: { $regex: word, $options: "i" } },
                            // { age: { $regex: word, $options: "i" } },
                            { bloodGroup: { $regex: word, $options: "i" } },
                            { patientGroup: { $regex: word, $options: "i" } },
                            { referedBy: { $regex: word, $options: "i" } },
                            { city: { $regex: word, $options: "i" } },
                            { state: { $regex: word, $options: "i" } },
                            { country: { $regex: word, $options: "i" } },
                            { ZipCode: { $regex: word, $options: "i" } },
                            { address: { $regex: word, $options: "i" } },
                            { "medicalHistory.name": { $regex: word, $options: "i" } },
                            { "medicalHistory.note": { $regex: word, $options: "i" } },
                            // { "medicalHistory.positive": { $regex: word, $options: "i" } },
                            // { "medicalHistory.negative": { $regex: word, $options: "i" } },
                            // { "medicalHistory.unknown": { $regex: word, $options: "i" } },
                            ...(isNaN(numWord) ? [] : [{ age: numWord }]), // Only add age condition if word is a valid number
                            ...(boolWord === null ? [] : [
                                { "medicalHistory.positive": boolWord },
                                { "medicalHistory.negative": boolWord },
                                { "medicalHistory.unknown": boolWord }
                            ]) // Only add Boolean conditions if the word is "true" or "false"
                        ]
                    })
                }
            }
        }
        console.log("searchQuery=>>>", searchQuery);
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
        let statusSearchKey = {};
        const statusBool = status.toLowerCase() === "true" ? true : status.toLowerCase() === "false" ? false : null;
        if(statusBool !== null){
            statusSearchKey = {isActive : statusBool}
        }
        console.log("statusSearchKey=>>>",statusSearchKey);
        console.log("statusBool====>>>",statusBool);
        
        
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
        //establishing db connection :
        const db = await getClientDatabaseConnection(clientId);
        const patientsModel = db.model('patient', clinetPatientSchema);
        const branchModel = await db.model('branch', clinetBranchSchema);
        const businessUnitModel = await db.model('businessUnit', clinetBusinessUnitSchema);
        const clientUsersModel = await db.model('clientUsers', clinetUserSchema);
        //filterings:
        let branchIdSearchKey = {}
        if (branchId) {
            branchIdSearchKey = { branch: branchId }
        }
        let businessUnitIdSearchKey = {}
        if (businessUnitId) {
            businessUnitIdSearchKey = { businessUnit: businessUnitId }
        }
        let mainPatientLinkedIdSearchKey = {}
        if (mainPatientLinkedId) {
            mainPatientLinkedIdSearchKey = { mainPatientLinkedid: mainPatientLinkedId }
        }
        let createdByIdSearchKey = {}
        if (createdById) {
            createdByIdSearchKey = { createdBy: createdById }
        }
        let updatedByIdSearchKey = {}
        if(updatedById){
            updatedByIdSearchKey = { updatedBy: updatedById }
        }
        //query building
        let query = patientsModel.find({
            ...searchQuery,
            // ...from_DateSearchKey,
            // ...toDateSearchKey,
            ...dateSearchKey,
            ...branchIdSearchKey,
            ...businessUnitIdSearchKey,
            ...mainPatientLinkedIdSearchKey,
            ...createdByIdSearchKey,
            ...updatedByIdSearchKey,
            ...statusSearchKey,
            deletedAt: null
        });
        const totalDocs = await patientsModel.countDocuments({
            ...searchQuery,
            // ...from_DateSearchKey,
            // ...toDateSearchKey,
            ...dateSearchKey,
            ...branchIdSearchKey,
            ...businessUnitIdSearchKey,
            ...mainPatientLinkedIdSearchKey,
            ...createdByIdSearchKey,
            ...updatedByIdSearchKey,
            ...statusSearchKey,
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
        const fetchedPatient = await query
            .populate('branch', 'name incorporationName')
            .populate('businessUnit', 'name emailContact contactNumber')
            .populate('mainPatientLinkedid', 'firstName lastName email phone')
            .populate('createdBy', 'firstName lastName email phone')
            .populate('updatedBy', 'firstName lastName email phone').sort({createdAt: -1});
        // console.log("fetchedPatient=>>>", fetchedPatient);
        if (!fetchedPatient) return { status: false, message: "Patients can't be fetched!!" };

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
            if (fetchedPatient?.length > 0)
                return { status: true, data: fetchedPatient, metaData: metaData, message: "Patients details retrieved successfully." }
            else
                return { status: false, data: [], metaData: metaData, message: "Patients details Not Found!" }
        }
        else {
            metaData = {
                currentPage: 1,
                perPage: totalDocs,
                SearchKey,
                totalDocs,
                totalPages: 1,
            }

            if (fetchedPatient?.length > 0)
                return { status: true, data: fetchedPatient, metaData: metaData, message: "Patients details retrieved successfully." }
            else
                return { status: false, data: [], metaData: metaData, message: "Patients details Not Found!" }
        }

    }
    catch (error) {
        return { status: false, message: error.message || "Patients can't be fetched!!" };
    }
}
module.exports = getPatientsDetailsFn