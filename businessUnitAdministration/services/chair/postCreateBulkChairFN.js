const clinetBranchSchema = require("../../../client/model/branch");
const clinetChairSchema = require("../../../client/model/chair");
const { getClientDatabaseConnection } = require("../../../db/connection");

const postCreateBulkChairFN = async ({ clientId, buId, branchId, arrayObj, mainUser_id, stream }) => {
  try {
    //if user loggedin from BU level then use then branch names will be taken from the excel sheet(arrayObj)
    //if user logged in from branch level then branch _id should taken from root level of request(branchId) ignoring the branch column of the excel(arrayObj)
    const db = await getClientDatabaseConnection(clientId);
    const Branch = await db.model('branch', clinetBranchSchema);
    const Chair = await db.model('chair', clinetChairSchema);

    let count = 0;
    let processed = 0;
    const total = arrayObj?.length;

    if (Array.isArray(arrayObj) && arrayObj?.length > 0) {
      for (const element of arrayObj) {
        count++;
        if (
          element?.chairLocation && String(element?.chairLocation)?.length > 0 &&
          element?.chairNumber && String(element?.chairNumber)?.length > 0
        ) {//chairLocation, chairNumber are mandatory 
          const insertData = {};
          //BRANCH handling:

          if (branchId) {//if branchId exists on root level of incoming request then direct insertion(user logged in from branch level)
            insertData.branch = branchId;
          }
          else {
            const fetchBranchByName = await Branch.findOne({ name: String(element?.branchName), businessUnit: buId, deletedAt: null })
            if (fetchBranchByName && fetchBranchByName?._id) {
              insertData.branch = fetchBranchByName?._id;
            }
            else {//ask sir what to do
              console.log(`Branch does not exist with name ${element?.branchName} for row : ${count}`);
            }
          }
          //Proceed only if branchId (is there or fetched) is present:
          if (insertData?.branch) {
            //prohibit duplicate Chair entry
            const alreadyExistChair = await Chair.findOne({ branch: insertData?.branch, businessUnit: buId, chairNumber: String(element?.chairNumber), deletedAt: null })
            //proceed if no duplicate Chair
            if (!alreadyExistChair && !alreadyExistChair?._id) {
              insertData.businessUnit = buId
              insertData.chairLocation = element?.chairLocation//mandatory
              insertData.chairNumber = element?.chairNumber//mandatory
              insertData.createdBy = mainUser_id

              const insertedChair = await Chair.create(insertData);
              if (insertedChair && insertedChair?._id) {
                console.log(`Chair ${insertedChair?.chairNumber} created of row : ${count}`)
                processed++;
              }
            }
            else {
              console.log(`Chair already exist of row : ${count}!!`);
            }
          }
          else {
            console.log(`No Branch for row : ${count}!!`);
          }
        }
        else {
          console.log(`${branchId ? 'Branch, ' : ''}chairLocation, chairNumber are mandatory but not sent from frontend for row :${count} `)
        }
        const percentage = parseFloat((count / total) * 100)?.toFixed(0);
        if (stream && stream.write) {//Send progress update via SSE
          stream.write(`event: progress\ndata: ${JSON.stringify({ percentage })}\n\n`);
        }
      }
    }
    else {
      return { status: false, message: "Import Data not found!!" };
    }
    return { status: processed && processed > 0 ? true : false, message: `${processed} rows inserted` }
  } catch (error) {
    console.log(error)
    //Send error through SSE
    if (stream && stream.write) {
      stream.write(`event: error\ndata: ${JSON.stringify({ status: false, message: error?.message })}\n\n`);
    }
    return { status: false, message: error.message || "Chairs can't be Created!!" };
  }
}

module.exports = postCreateBulkChairFN