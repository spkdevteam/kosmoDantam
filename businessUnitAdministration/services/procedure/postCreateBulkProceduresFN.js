const clinetBranchSchema = require("../../../client/model/branch");
const clinetBusinessUnitSchema = require("../../../client/model/businessUnit");
const departmentSchema = require("../../../client/model/department");
const procedureSchema = require("../../../client/model/procedure");
const serviceSchema = require("../../../client/model/service");
const clinetUserSchema = require("../../../client/model/user");
const { getClientDatabaseConnection } = require("../../../db/connection");
const getserialNumber = require("../../../model/services/getserialNumber");
const { default: mongoose } = require("mongoose");

const postCreateBulkProceduresFN = async ({ clientId, buId, branchId, arrayObj, mainUser_id }) => {
    //take clientId from frontend its mandatory and important
    //take single BU from frontEnd its mandatory and important
    // mainUser?._id from middleeare its mandatory
    //there will be a "Department Name" in each input element
    try {
        //no need to check for BU whether it exists or not
        //if branch matches then use that branchId or create a new branch
        //department matches under that ServiceId then use the deptId or create a new department under the branchId and ServiceId 
        //if service matches under the branch ID then use that serviceId or create a new service under the branchId
        const db = await getClientDatabaseConnection(clientId);
        const Procedure = await db.model('procedure', procedureSchema);
        const businessUnit = await db.model("businessUnit", clinetBusinessUnitSchema);
        const branch = await db.model("branch", clinetBranchSchema);
        const user = await db.model("clientUsers", clinetUserSchema);
        const department = await db.model("department", departmentSchema);
        const service = await db.model('services', serviceSchema);
        let count = 0;
        // returnResponse = [];
        const branchArr = [];
        if (!branchId) {
            const branchFetch = await branch.find({ businessUnit: buId, deletedAt: null })
            if (branchFetch && branchFetch?.length > 0) {
                branchFetch?.map(element => {
                    branchArr.push(element?._id)
                })
            }
        } else {
            branchArr.push(branchId)
        }
        for (const element of arrayObj) {


            // const buFetch = await businessUnit.findOne({ name: element["Business-Unit Name"] })
            // if (buFetch && buFetch?._id) {
            //     id.buId = buFetch?._id;


            //BRANCH:=>
            // const branchFetch = await branch.findOne({ name: element["Branch Name"], businessUnit: id?.buId })
            // if (branchFetch) {//if branch exists
            //     id.branchId = branchFetch?._id;

            // }
            // else {//creating new branch
            //     const displayIdBranch = await getserialNumber('branch', clientId, "", id?.buId);
            //     const insertNewBranch = {
            //         displayId: displayIdBranch,
            //         businessUnit: id?.buId,
            //         branchHead: null,//?
            //         bookingContact: '7907441232', //default
            //         name: element["Branch Name"],
            //         incorporationName: { type: String, required: true },
            //         cinNumber: null,//?
            //         gstNumber: null,//?
            //         branchPrefix: null,//?
            //         branchId: null,//?
            //         branchLogo: null,//?
            //         emailContact: null,//?
            //         contactNumber: null,//?
            //         city: null,//?
            //         state: null,//?
            //         country: null,//?
            //         ZipCode: null,//?
            //         address: null,//?
            //         isActive: true,
            //         createdBy: mainUser?._id,
            //     }
            //     const { acknowledged, insertedId } = await branch.insertOne(insertNewBranch)
            //     if (acknowledged && insertedId) {
            //         id.branchId = insertedId;
            //     }
            //     else {//error_handle in the response later
            //         console.log("could not create new branch");
            //     }
            // }

            if (branchArr && branchArr?.length > 0) {
                for (const currentBranchId of branchArr) {
                    // returnResponse.push({
                    //     index: count + 1,
                    //     message: '',
                    //     status: true
                    // })
                    const id = {};
                    let atLeastOneInsert = false;
                    //DEPARTMENT(mandatory):=>
                    if (element?.Department && String(element?.Department)?.length > 0 && element?.Services && String(element?.Services)?.length > 0) {//DEPARTMENT &SERVICE are mandatory checking
                        const departmentFetch = await department.findOne({ deptName: String(element?.Department), buId: buId, branchId: currentBranchId, deletedAt: null })
                        if (departmentFetch) {
                            id.departmentId = departmentFetch?._id
                            console.log("existing department fetched successfully")
                            // returnResponse[count].message = returnResponse[count].message + " existing department fetched successfully.";
                        }
                        else {
                            const displayIdDepartment = await getserialNumber('department', clientId, currentBranchId, buId)
                            const insertNewDepartment = {
                                deptName: String(element?.Department),
                                branchId: currentBranchId,
                                description: null,//?
                                displayId: displayIdDepartment,
                                buId: buId,
                                isActive: true,
                                createdBy: mainUser_id
                            }
                            // const { acknowledged, insertedId } = await department.insertOne(insertNewDepartment)
                            const newlyCreatedDepartment = await department.insertOne(insertNewDepartment)
                            // console.log("newlyCreatedDepartment==>>", newlyCreatedDepartment)
                            if (newlyCreatedDepartment && newlyCreatedDepartment?._id) {
                                id.departmentId = newlyCreatedDepartment?._id;
                                atLeastOneInsert = true;
                                console.log("New department created")
                                // returnResponse[count].message = returnResponse[count].message + " New department created.";
                            }
                            else {//error_handled in the else block later
                                console.log("could not create new Department!");
                                // returnResponse[count].message = returnResponse[count].message + "could not create new Department!";
                                // returnResponse[count].status = false;
                            }
                        }
                        if (id?.departmentId) {
                            //SERVICE(mandatory):=> checking alreday done above
                            // if (element?.Services && String(element?.Services)?.length > 0) {
                            // const serviceIdArr = [];
                            // for (const serv of element["Services"]) {
                            const serviceFindQuery = {
                                buId: buId,
                                branchId: currentBranchId,
                                serviceName: String(element?.Services),
                                departmentId: id?.departmentId,
                                deletedAt: null
                            }
                            // console.log("serviceFindQuery==>>", serviceFindQuery)
                            // if (id?.departmentId) serviceFindQuery.departmentId = id?.departmentId
                            const serviceFetch = await service.findOne(serviceFindQuery)
                            // console.log("serviceFetch==>>", serviceFetch)
                            if (serviceFetch) {
                                id.serviceId = serviceFetch?._id
                                console.log("Existing service fetched successfully")
                                // returnResponse[count].message = returnResponse[count].message + " Existing service fetched successfully.";
                                // serviceIdArr?.push(new mongoose.Types.ObjectId(id.serviceId))
                            }
                            else {
                                displayIdService = await getserialNumber('procedure', clientId, currentBranchId, buId)
                                const insertNewService = {
                                    displayId: displayIdService,
                                    departmentId: id?.departmentId,
                                    branchId: currentBranchId,
                                    serviceName: String(element?.Services),
                                    description: null,
                                    price: 0.00,
                                    buId: buId,
                                    isActive: true,
                                    createdBy: mainUser_id,
                                }
                                // const { acknowledged, insertedId } = await service.insertOne(insertNewService)
                                const newlyCreatedService = await service.insertOne(insertNewService)
                                // console.log("newlyCreatedService=>>", newlyCreatedService)
                                if (newlyCreatedService && newlyCreatedService?._id) {
                                    id.serviceId = newlyCreatedService?._id;
                                    atLeastOneInsert = true;
                                    console.log("New service created")
                                    // returnResponse[count].message = returnResponse[count].message + " New service created.";
                                    // serviceIdArr?.push(new mongoose.Types.ObjectId(id?.serviceId))
                                }
                                else {//error_handled in the else block later
                                    console.log("could not create new service!");
                                }
                            }
                            // }
                            if (id?.serviceId) {
                                //PROCEDURE(not mandatory):=>
                                if (element?.Procedure && String(element?.Procedure)?.length > 0) {
                                    const procedureFetch = await Procedure.findOne({ procedureName: String(element?.Procedure), buId: buId, branchId: currentBranchId, deletedAt: null })
                                    if (procedureFetch) {
                                        id.procedureId = procedureFetch?._id
                                        if (!procedureFetch.services.includes(id?.serviceId)) {
                                            procedureFetch.services.push(new mongoose.Types.ObjectId(id?.serviceId));
                                            // procedureFetch.services.push(new mongoose.Types.ObjectId(id?.serviceId));
                                            procedureFetch.updatedBy = mainUser_id;
                                            const savedProcedure = await procedureFetch.save();
                                            if (savedProcedure) {
                                                console.log("Procedure is updated By serviceId")
                                                // returnResponse[count].message = returnResponse[count].message + " Procedure is updated.";
                                            }
                                            else {
                                                console.log("Failed to update Procedure  By serviceId!");
                                                // returnResponse[count].message = returnResponse[count].message + " Failed to update Procedure!";
                                                // returnResponse[count].status = false;
                                            }
                                        }
                                        else {
                                            console.log("No update in procedure as Procedure with corresponding serviceId already exist")
                                        }
                                    }
                                    else {
                                        displayIdProcedure = await getserialNumber('procedure', clientId, currentBranchId, buId)
                                        const insertNewProcedure = {
                                            // deptId: input?.deptId, //deptId is wrongly entered in schema
                                            services: [new mongoose.Types.ObjectId(id?.serviceId)],
                                            procedureName: element?.Procedure ? element?.Procedure : '',//req field in schema
                                            displayId: displayIdProcedure,
                                            description: '',
                                            branchId: currentBranchId,
                                            isActive: true,
                                            buId: buId,
                                            createdBy: mainUser_id
                                        }
                                        // const { acknowledged, insertedId } = await Procedure.insertOne(insertNewProcedure)
                                        const newlySavedProcedure = await Procedure.insertOne(insertNewProcedure)
                                        // console.log("newlySavedProcedure==>>", newlySavedProcedure)
                                        if (newlySavedProcedure && newlySavedProcedure?._id) {
                                            id.procedureId = newlySavedProcedure?._id;
                                            atLeastOneInsert = true;
                                            console.log("New procedure created")
                                            // returnResponse[count].message = returnResponse[count].message + " New procedure created.";
                                        }
                                        else {//error_handle in the response later
                                            console.log("Failed to create new procedure!");
                                            // returnResponse[count].message = returnResponse[count].message + " Failed to create new procedure!";
                                            // returnResponse[count].status = false;
                                        }
                                    }
                                    if (id?.procedureId) {
                                        //updating services again with procedures:
                                        const serviceFetch2 = await service.findOne({ _id: id?.serviceId, deletedAt: null })
                                        if (serviceFetch2) {
                                            if (id?.procedureId) {
                                                if (!serviceFetch2.procedures.includes(id?.procedureId)) {
                                                    serviceFetch2.procedures.push(new mongoose.Types.ObjectId(id?.procedureId));
                                                    // serviceFetch2.procedures.push(new mongoose.Types.ObjectId(id?.procedureId))
                                                    serviceFetch2.updatedBy = mainUser_id;
                                                    const savedService2 = await serviceFetch2.save();
                                                    if (savedService2) {
                                                        console.log("Service updated with procedure")
                                                    }
                                                    else {//error_handle in the response later
                                                        console.log("FAiled updated with procedure!");
                                                    }
                                                }
                                                else {
                                                    console.log("No update in Service as Service having this ProcedureId already exist")
                                                }
                                            }
                                            else {
                                                console.log("Procedure has not been Sent from frontend!")
                                            }
                                        }
                                        else {//error_handle in the response later
                                            console.log("Could not update services again with procedures!!")
                                        }
                                    }
                                    else {
                                        console.log("Could not generate/update procedure from backend!")
                                        // returnResponse[count].message = returnResponse[count].message + " Could not generate/update procedure from backend!";
                                        // returnResponse[count].status = false
                                    }
                                }
                                else {//NOT error as procedure isnt mandatory
                                    // returnResponse[count].message = returnResponse[count].message + " No procedure sent from frontend.";
                                }
                            }
                            else {
                                console.log("Service is mandatory but could not update/create in backend!")
                                // returnResponse[count].message = returnResponse[count].message + "Service is mandatory but could not create in backend!";
                                // returnResponse[count].status = false;
                            }
                            // }
                            // else {//error_handle in the response later
                            //     console.log("Service is mandatory  but not sent from frontend!")
                            //     // returnResponse[count].message = returnResponse[count].message + "Service is mandatory  but not sent from frontend!";
                            //     // returnResponse[count].status = false;
                            // }
                        }
                        else {//error_handle in the response later
                            console.log("Department is mandatory but could not update/create in backend!")
                            // returnResponse[count].message = returnResponse[count].message + "Department is mandatory but could not create in backend!";
                            // returnResponse[count].status = false;
                        }
                    }
                    else {//error_handle in the response later
                        console.log("Department and Service are mandatory but not sent from frontend!")
                        // returnResponse[count].message = returnResponse[count].message + "Department  and Service are mandatory but not sent from frontend!";
                        // returnResponse[count].status = false;
                    }
                    if (atLeastOneInsert) {
                        count++;
                    }
                }
            }
            else {
                return { status: false, message: 'No branch exists!!' }
            }


        }
        return { status: count && count > 0 ? true : false, message: `${count} rows inserted` }
    }
    catch (error) {
        console.log(error?.message)
        return { status: false, message: error?.message }
    }
}
module.exports = postCreateBulkProceduresFN