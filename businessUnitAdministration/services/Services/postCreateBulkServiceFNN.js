const clinetBranchSchema = require("../../../client/model/branch");
const departmentSchema = require("../../../client/model/department");
const serviceSchema = require("../../../client/model/service");
const { getClientDatabaseConnection } = require("../../../db/connection");
const getserialNumber = require("../../../model/services/getserialNumber");

const postCreateBulkServiceFNN = async ({ clientId, buId, branchId, arrayObj, mainUser_id, stream }) => {
  try {
    //if branchId is there in the root level then insert for that branch otherwise insert for all branches of the Bu
    //if department exist at that bu, branch then find & use that _id or create a new depaartment for that bu, branch and use that _id 
    //in the excel sheet (arrayObj) will contain departmentName, serviceName, description (all are mandatory)
    const db = await getClientDatabaseConnection(clientId);
    const Branch = await db.model('branch', clinetBranchSchema);
    const Department = await db.model("department", departmentSchema);
    const Service = await db.model('services', serviceSchema);
    let count = 0;
    let processed = 0;
    let departmentProcessed = 0;
    const total = arrayObj?.length;
    //branch handling
    const branchArr = [];
    if (!branchId) {
      const branchFetch = await Branch.find({ businessUnit: buId, deletedAt: null })
      if (branchFetch && branchFetch?.length > 0) {
        branchFetch?.map(element => {
          branchArr.push(element?._id)
        })
      }
    } else {
      branchArr.push(branchId)
    }
    if (Array.isArray(arrayObj) && arrayObj?.length > 0) {
      for (const element of arrayObj) {
        count++;
        if (branchArr && branchArr?.length > 0) {
          for (const currentBranchId of branchArr) {
            const id = {};
            if (element?.departName && String(element?.departName)?.length > 0 &&
              element?.serviceName && String(element?.serviceName)?.length > 0 &&
              element?.description && String(element?.description)?.length > 0) {//DEPARTMENT & SERVICE are mandatory checking
              const departmentFetch = await Department.findOne({ deptName: String(element?.departName), buId: buId, branchId: currentBranchId, deletedAt: null })
              if (departmentFetch && departmentFetch?._id) {//department has been found at given branch, bu  by given deptName in excel 
                id.departmentId = departmentFetch?._id
                console.log("existing department fetched successfully")
              }
              else {//new dept is being created for the given branch & bu
                const displayIdDepartment = await getserialNumber('department', clientId, currentBranchId, buId)
                if (displayIdDepartment) {
                  const insertNewDepartment = {
                    deptName: String(element?.departName),
                    branchId: currentBranchId,
                    description: null,//?
                    displayId: displayIdDepartment,
                    buId: buId,
                    isActive: true,
                    createdBy: mainUser_id
                  }
                  const newlyCreatedDepartment = await Department.create(insertNewDepartment)
                  if (newlyCreatedDepartment && newlyCreatedDepartment?._id) {
                    id.departmentId = newlyCreatedDepartment?._id;
                    departmentProcessed++;
                    console.log(`New department created for row : ${count}`)
                  }
                  else {
                    console.log(`could not create new Department at row : ${count}`)
                  }
                }
                else {
                  console.log(`DisplayId for Department can not be created at row : ${count}`)
                }
              }
              //after dept now going to handle the service
              if (id?.departmentId) {
                const serviceFindQuery = {
                  buId: buId,
                  branchId: currentBranchId,
                  serviceName: String(element?.serviceName),
                  departmentId: id?.departmentId,
                  deletedAt: null
                }
                const serviceFetch = await Service.findOne(serviceFindQuery)
                if (serviceFetch) {//service already exist then not touching it
                  console.log(`Service ${String(element?.serviceName)} already exist at row : ${count}`)
                }
                else {//otherwise inserting new service
                  displayIdService = await getserialNumber('procedure', clientId, currentBranchId, buId)
                  if (displayIdService) {
                    const insertNewService = {
                      displayId: displayIdService,
                      departmentId: id?.departmentId,
                      branchId: currentBranchId,
                      serviceName: String(element?.serviceName),
                      description: element?.description,
                      price: 0.00,
                      buId: buId,
                      isActive: true,
                      createdBy: mainUser_id
                    }
                    const newlyCreatedService = await Service.create(insertNewService)
                    if (newlyCreatedService && newlyCreatedService?._id) {
                      processed++;
                      console.log(`New service ${String(element?.serviceName)} created at row : ${count}`)
                    }
                    else {//error_handled in the else block later
                      console.log(`could not create new service! at row ${count}`);
                    }
                  }
                  else {
                    console.log(`Display Id can not be generated for Service at row : ${count}`)
                  }
                }
              }
              else {
                console.log(`Department is mandatory but can not be created/ fetched from backend at row : ${count}`)
              }
            }
            else {
              console.log(`Department and Service are mandatory but not sent from frontend for row : ${count}!`)
            }
          }
        }
        else {
          return { status: false, message: 'No branch exists!!' }
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
    return { status: processed && processed > 0 ? true : false, message: `${processed} rows inserted with ${processed} new services created and ${departmentProcessed} new departments created` }
  }
  catch (error) {
    console.log(error?.message)
    //Send error through SSE
    if (stream && stream.write) {
      stream.write(`event: error\ndata: ${JSON.stringify({ status: false, message: error?.message })}\n\n`);
    }
    return { status: false, message: error.message || "Services can't be Created!!" };
  }
}

module.exports = postCreateBulkServiceFNN;
