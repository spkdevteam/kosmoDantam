const clinetBranchSchema = require("../../../client/model/branch");
const clientRoleSchema = require("../../../client/model/role");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const getserialNumber = require("../../../model/services/getserialNumber");

const postCreateBulkEmployeeFN = async ({ clientId, buId, branchId, arrayObj, mainUser_id, stream }) => {
  try {
    //if user loggedin from BU level then use then branch names will be taken from the excel sheet(arrayObj)
    //if user logged in from branch level then branch _id should taken from root level of request(branchId) ignoring the branch column of the excel(arrayObj)
    const db = await getClientDatabaseConnection(clientId);
    const User = await db.model("clientUsers", clinetUserSchema);
    const Branch = await db.model('branch', clinetBranchSchema);
    const Role = await db.model('clientRoles', clientRoleSchema);

    let count = 0;
    let processed = 0;
    const total = arrayObj?.length;
    if (Array.isArray(arrayObj) && arrayObj?.length > 0) {
      const fetchedEmployeeDetails = await User.find(
        { businessUnit: buId, deletedAt: null },
        { email: 1, phone: 1, _id: 0 }
      )
      const fetchedEmailArr = fetchedEmployeeDetails?.map(element => element?.email)
      const fetchedPhoneArr = fetchedEmployeeDetails?.map(element => element?.phone)
      console.log("fetchedEmailArr==>>", fetchedEmailArr)
      console.log("fetchedPhoneArr==>>", fetchedPhoneArr)
      for (const element of arrayObj) {
        count++;
        if (
          // element?.branchName && String(element?.branchName)?.length > 0 &&
          element?.role && String(element?.role)?.length > 0 &&
          element?.firstName && String(element?.firstName)?.length > 0 &&
          element?.lastName && String(element?.lastName)?.length > 0 &&
          element?.email && String(element?.email)?.length > 0 &&
          element?.phone && String(element?.phone)?.length > 0 &&
          element?.gender && String(element?.gender)?.length > 0 &&
          ['Male', 'Female', 'Other', 'Prefer not to say']?.includes(String(element?.gender))
          // &&
          // (!branchId || (branchId && element?.branchId === String(branchId)))
        ) {//role, firstName, lastName, email, phone, gender,tc(manage from backend) are mandatory . 
          // displayId, email, phone are unique
          const doesEmailExistAlready = fetchedEmailArr?.includes(String(element?.email).toLowerCase());
          const doesPhoneExistAlready = fetchedPhoneArr?.includes(String(element?.phone));
          if (!doesEmailExistAlready && !doesPhoneExistAlready) {
            const insertData = {};
            //BRANCH handling:
            if (branchId) {//if branchId exists on root level of incoming request then direct insertion(user logged in from branch level)
              insertData.branch = branchId;
            }
            else {//if branchId does not exist on root level of incoming request then fetch branch by name then use that _id(user logged in from BU level)
              const fetchBranchByName = await Branch.findOne({ name: String(element?.branchName), businessUnit: buId, deletedAt: null })
              if (fetchBranchByName && fetchBranchByName?._id) {
                insertData.branch = fetchBranchByName?._id;
              }
              else {//ask sir what to do
                console.log(`Branch doesnot exist with name ${element?.branchName} for row : ${count}`);
              }
            }
            //ROLE handling
            const fethchedRoleByRoleId = await Role.findOne({ name: String(element?.role), deletedAt: null })
            //Proceed only if branchId (is there or fetched) roleId(fetched) are present:
            if (insertData?.branch && fethchedRoleByRoleId?._id && fethchedRoleByRoleId?.id) {
              //as already unique checking for email and phone for a given BU is done so no need to implement duplicate entry logic anymore
              //same person can have multiple role only by using different email, phone..duplication is not possible
              const displayId = await getserialNumber('employee', clientId, '', buId);//display Id generation
              if (displayId) {//proceed only if displayId is generated

                insertData.tc = true //? mandatory
                insertData.businessUnit = buId
                insertData.displayId = displayId// unique
                insertData.role = fethchedRoleByRoleId?._id
                insertData.roleId = Number(fethchedRoleByRoleId?.id)
                insertData.firstName = element?.firstName//mandatory
                insertData.lastName = element?.lastName//mandatory
                insertData.email = element?.email?.toLowerCase()//mandatory & unique
                insertData.phone = element?.phone//mandatory & unique
                insertData.gender = element?.gender//mandatory
                insertData.age = element?.age
                insertData.bloodGroup = element?.bloodGroup
                insertData.city = element?.city
                insertData.state = element?.state
                insertData.country = element?.country
                insertData.ZipCode = element?.ZipCode
                insertData.address = element?.address
                insertData.panNumber = element?.panNumber
                insertData.adharNumber = element?.aadharNumber
                insertData.emergencyPhone = element?.emergencyPhone
                insertData.createdBy = mainUser_id // Index for admin/user relationships

                const insertedEmployee = await User.create(insertData);
                if (insertedEmployee && insertedEmployee?._id) {
                  console.log(`Employee ${insertedEmployee?.firstName} created of row : ${count}`)
                  fetchedEmailArr.push(String(insertedEmployee?.email));
                  fetchedPhoneArr.push(String(insertedEmployee?.phone));
                  processed++;
                }
              }
              else {
                console.log(`Display Id can not be generated for row : ${count}!! `)
              }
            }
            else {
              console.log(`No Branch for row : ${count}!!`);
            }

          }
          else {
            console.log(` ${doesEmailExistAlready ? 'Email Id : ' + element?.email + '' : ''} ${doesPhoneExistAlready ? 'Phone no : ' + element?.phone : ''} for row : ${count} already in use!! `)
          }
        }
        else {
          console.log(`${branchId ? 'Branch,' : ''}role, firstName, lastName, email, phone, gender are mandatory are mandatory but not sent from frontend for row :${count} `)
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
    return { status: false, message: error.message || "Employees can't be Created!!" };
  };
}

module.exports = postCreateBulkEmployeeFN