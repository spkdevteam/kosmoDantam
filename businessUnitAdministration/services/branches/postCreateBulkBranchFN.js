const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");

const postCreateBulkBranchFN = async ({ clientId, buId, dataArr, mainUserId }) => {
    try {
        //establishing db connection :
        const db = await getClientDatabaseConnection(clientId);
        const Branch = await db.model('branch', clinetBranchSchema);
        let count = 0;
        if (Array.isArray(dataArr) && dataArr?.length > 0) {
            for (const element of dataArr) {
                count++;
                if (
                    element?.branchPrefix && String(element?.branchPrefix)?.length > 0 &&
                    element?.name && String(element?.name)?.length > 0 &&
                    element?.contactNumber && String(element?.contactNumber)?.length > 0 &&
                    element?.emailContact && String(element?.emailContact)?.length > 0
                ) {//branchPrefix, name, contactNumber, emailContact are mandatory
                    const insertData = {
                        branchPrefix: element?.branchPrefix,  //mandatory
                        name: element?.name,   //mandatory
                        city: element?.city,
                        state: element?.state,
                        country: element?.country,
                        contactNumber: element?.contactNumber, //mandatory
                        emailContact: element?.emailContact,  //mandatory
                        address: element?.address,
                        cinNumber: element?.cinNumber,
                        incorporationName: element?.incorporationName
                    }
                }
                else {
                    console.log(`branchPrefix, name, contactNumber, emailContact are mandatory but not sent from frontend for row :${count} `)
                }
            }
        }
        else {
            return { status: false, message: "No Import Data of present!!" };
        }
    }
    catch (error) {
        return { status: false, message: error.message || "Branches can't be fetched!!" };
    }
}
module.exports = postCreateBulkBranchFN