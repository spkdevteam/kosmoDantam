const clinetBranchSchema = require("../../../client/model/branch");
const departmentSchema = require("../../../client/model/department");
const { getClientDatabaseConnection } = require("../../../db/connection");
const getserialNumber = require("../../../model/services/getserialNumber");

const postCreateBulkDepartmentFN = async ({ clientId, buId, branchId, arrayObj, mainUser_id, stream }) => {
  try {
    const db = await getClientDatabaseConnection(clientId);
    const Branch = await db.model('branch', clinetBranchSchema);
    const Department = db.model("department", departmentSchema);

    let count = 0;
    let processed = 0;
    const total = arrayObj?.length;
    if (Array.isArray(arrayObj) && arrayObj?.length > 0) {
      for (const element of arrayObj) {
        count++;
        if (
          element?.departmentName && String(element?.departmentName)?.length > 0 &&
          element?.description && String(element?.description)?.length > 0
        ) {//departmentName, description  are mandatory 
          const insertData = {};
          //BRANCH handling:
          if (branchId) {//if branchId exists on root level of incoming request then direct insertion(user logged in from branch level)
            insertData.branchId = branchId;
          }
          else {
            const fetchBranchByName = await Branch.findOne({ name: String(element?.branchName), businessUnit: buId, deletedAt: null })
            if (fetchBranchByName && fetchBranchByName?._id) {
              insertData.branchId = fetchBranchByName?._id;
            }
            else {//ask sir what to do
              console.log(`Branch does not exist with name ${element?.branchName} for row : ${count}`);
            }
          }
          //Proceed only if branchId (is there or fetched) is present:
          if (insertData?.branchId) {//branchId is mandatory
            //prohibit duplicate Departmemnt entry
            const alreadyExistDepartment = await Department.findOne({ deptName: String(element?.departmentName), buId: buId, branchId: insertData?.branchId, deletedAt: null })
            //proceed if no duplicate Departmemnt
            if (!alreadyExistDepartment && !alreadyExistDepartment?._id) {
              const displayId = await getserialNumber('department', clientId, insertData?.branchId, buId)
              if (displayId) {
                insertData.deptName = String(element?.departmentName);//mandatory
                insertData.displayId = displayId; //mandatory and unique
                insertData.buId = buId;//mandatory
                insertData.description = String(element?.description);//mandatory
                insertData.createdBy = mainUser_id

                const insertedDepartment = await Department.create(insertData)
                if (insertedDepartment && insertedDepartment?._id) {
                  console.log(`Department ${insertedDepartment?.deptName} created of row : ${count}`)
                  processed++;
                }
              }
              else {
                console.log(`displayId for Department can not be generated of row : ${count}!!`);
              }
            }
            else {
              console.log(`Department already exist of row : ${count}!!`);
            }
          }
          else {
            console.log(`No Branch for row : ${count}!!`);
          }
        }
        else {
          console.log(`${branchId ? 'Branch, ' : ''}departmentName, description are mandatory but not sent from frontend for row :${count} `)
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
  }
  catch (error) {
    console.log(error)
    //Send error through SSE
    if (stream && stream.write) {
      stream.write(`event: error\ndata: ${JSON.stringify({ status: false, message: error?.message })}\n\n`);
    }
    return { status: false, message: error.message || "Departments can't be Created!!" };
  }
}

module.exports = postCreateBulkDepartmentFN