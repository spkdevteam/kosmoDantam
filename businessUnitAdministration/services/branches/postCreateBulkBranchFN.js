const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");
const getserialNumber = require("../../../model/services/getserialNumber");

const postCreateBulkBranchFN = async ({ clientId, buId, dataArr, mainUserId, stream }) => {
    try {
        //establishing db connection :
        const db = await getClientDatabaseConnection(clientId);
        const Branch = await db.model('branch', clinetBranchSchema);
        let count = 0;
        let processed = 0;
        const total = dataArr?.length;
        if (Array.isArray(dataArr) && dataArr?.length > 0) {
            //fetch all the emails from db as email is unique 
            const fetchedEmails = await Branch.find(
                { businessUnit: buId, deletedAt: null },
                { emailContact: 1, _id: 0 }
            )
            const fetchedEmailArr = fetchedEmails?.map(element => element?.emailContact)
            console.log("fetchedEmails==>>>", fetchedEmailArr)

            for (const element of dataArr) {
                count++;
                if (
                    element?.branchPrefix && String(element?.branchPrefix)?.length > 0 &&
                    element?.name && String(element?.name)?.length > 0 &&
                    element?.contactNumber && String(element?.contactNumber)?.length > 0 &&
                    element?.emailContact && String(element?.emailContact)?.length > 0 &&
                    element?.incorporationName && String(element?.incorporationName)?.length > 0
                ) {//branchPrefix, name, contactNumber, emailContact, incorporationName are mandatory
                    if (!fetchedEmailArr?.includes(String(element?.emailContact))) {//check if email unique or not
                        //prohibit duplicate Branch entry
                        const alreadyExistBranch = await Branch.findOne({ name: String(element?.name), businessUnit: buId, deletedAt: null })
                        //proceed if no duplicate Branch
                        if (!alreadyExistBranch && !alreadyExistBranch?._id) {
                            const displayId = await getserialNumber('branch', clientId, "", buId);
                            if (displayId) {
                                const insertData = {
                                    businessUnit: buId,
                                    displayId: displayId, // unique
                                    branchPrefix: element?.branchPrefix,  //mandatory
                                    name: element?.name,   //mandatory
                                    city: element?.city,
                                    state: element?.state,
                                    country: element?.country,
                                    contactNumber: element?.contactNumber, //mandatory
                                    emailContact: element?.emailContact,  //mandatory & unique
                                    address: element?.address,
                                    cinNumber: element?.cinNumber,
                                    incorporationName: element?.incorporationName,//mandatory
                                    createdBy: mainUserId
                                }
                                const insertedBranch = await Branch.create(insertData);
                                if (insertedBranch && insertedBranch?._id) {
                                    console.log(`Branch ${insertedBranch?.name} created `)
                                    fetchedEmailArr.push(insertedBranch?.emailContact);
                                    processed++;
                                }
                            }
                            else {
                                console.log(`Display Id can not be generated for row : ${count}!! `)
                            }
                        }
                        else {
                            console.log(`Branch already exist of row : ${count}!!`);
                        }
                    }
                    else {
                        console.log(`Email Id ${element?.emailContact} for row : ${count} already exists!! `)
                    }
                }
                else {
                    console.log(`branchPrefix, name, contactNumber, emailContact, incorporationName are mandatory but not sent from frontend for row :${count} `)
                }
                const percentage = parseFloat((count / total) * 100)?.toFixed(0);
                //Send progress update via SSE
                if (stream && stream.write) {
                    stream.write(`event: progress\ndata: ${JSON.stringify({ percentage })}\n\n`);
                }
            }
        }
        else {
            return { status: false, message: "Import Data not found!!" };
        }
        return { status: processed && processed > 0 ? true : false, message: `${processed} rows inserted` }
    }
    catch (error) {
        console.log(error?.message)
        //Send error through SSE
        if (stream && stream.write) {
            stream.write(`event: error\ndata: ${JSON.stringify({ status: false, message: error?.message })}\n\n`);
        }
        return { status: false, message: error.message || "Branches can't be Created!!" };
    }
}
module.exports = postCreateBulkBranchFN