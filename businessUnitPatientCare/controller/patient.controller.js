


const bcrypt = require("bcrypt");


const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const clinetUserSchema = require("../../client/model/user");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit");
const clientRoleSchema = require("../../client/model/role");
const clinetPatientSchema = require("../../client/model/patient")

const RoleModel = require("../../model/role");
const MasterUser = require("../../model/user")

const patientService = require("../services/patient.service")

// create Main Patient by business unit
exports.createMainPatientByBusinessUnit = async (req, res, next) => {
    try {
        const { clientId, branchId, roleId, businessUnit, firstName, lastName, email, phone, gender, age, bloodGroup, patientGroup, referedBy, city, state, country, ZipCode, address, password } = req.body;
        // console.log("req.body", req.body);
        
        const mainUser = req.user;
        await commonIdCheck({ clientId, branchId, businessUnit });
        if (!firstName || !lastName || !email || !phone || !roleId ) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Role = clientConnection.model('clientRoles', clientRoleSchema);
        const role = await Role.findById(roleId);
        if (!role) {
            throw new CustomError(statusCode.Conflict, message.lblRoleNotFound);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const displayId = await getserialNumber('patient', clientId, '', businessUnit);
        let profileUpdates = {
            displayId: displayId,
            firstName,
            lastName,
            email,
            phone, city, state, country, ZipCode, address,
             age, bloodGroup, patientGroup, referedBy,
            password: hashedPassword,
            branch: branchId,
            role: roleId,
            roleId: role.id,
            businessUnit: businessUnit,
            tc: true,
            isUserVerified: true,
            createdBy: mainUser._id,
        }

        if(gender !== ""){
            profileUpdates = {
                ...profileUpdates,
                gender : gender
            }
        }

        if (req.file?.filename) {
            profileUpdates.profileImage = req.file.filename;
        }
        const newPatient = await patientService.create(clientId, { ...profileUpdates,isActive:true });
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        let profileUpdates2 = {
            displayId: displayId,
            firstName,
            lastName,
            email,
            phone, city, state, country, ZipCode, address,
            gender, age, bloodGroup, patientGroup, referedBy,
            branch: branchId,
            businessUnit: businessUnit,
            createdBy: mainUser?._id,
        }

        if(gender !== ""){
            profileUpdates2 = {
                ...profileUpdates2,
                gender : gender
            }
        }
        if (req.file?.filename) {
            profileUpdates2.profileImage = req.file.filename;
        }
        const newPatientInstance = await Patient.create({ ...profileUpdates2,isActive:true });



        //saving the activity of creating a patient
        //await saveActivityLogFn({ patientId: newPatientInstance?._id, module: "patient", branchId, buId: businessUnit, userId: mainUser?._id, ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress, sourceLink: req.headers['x-frontend-route'], activity: "Created a patient", description: "Creating the patient, and saving activity log for it", data: newPatientInstance, status: true, dateTime: new Date() });

        return res.status(statusCode.OK).send({
            message: message.lblPatientCreatedSuccess,
            data: { patientId: newPatient._id },
        });
    } catch (error) {
        next(error)
    }
};

// create sub Patient by business unit
exports.createSubPatientByBusinessUnit = async (req, res, next) => {
    try {
        const { clientId, branchId, businessUnit, mainPatientLinkedId, firstName, lastName, email, phone, gender, age, bloodGroup, patientGroup, referedBy, city, state, country, relation } = req.body;
        const mainUser = req.user;
        await commonIdCheck({ clientId, branchId, businessUnit });
        if (!firstName || !lastName || !email || !phone || !city || !state || !country || !relation) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const User = clientConnection.model('clientUsers', clinetUserSchema);
        const mainPatient = await User.findById(mainPatientLinkedId);

        if (!mainPatient) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }

        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const newPatientInstance = await Patient.create({
            firstName,
            lastName,
            email,
            phone, city, state, country, relation,
            gender, age, bloodGroup, patientGroup, referedBy,
            branch: branchId,
            businessUnit: businessUnit,
            mainPatientLinkedid: mainPatientLinkedId,
            isChainedWithMainPatient: true,
            createdBy: mainUser._id,
        })
        return res.status(statusCode.OK).send({
            message: message.lblPatientCreatedSuccess,
            data: { patientId: newPatientInstance._id },
        });
    } catch (error) {
        next(error)
    }
};

// update Patient by business unit
exports.updatePatientByBusinessUnit = async (req, res, next) => {
    try {
        const mainUser = req.user;
        const { clientId, branchId, businessUnit, patientId, firstName, lastName, email, phone, gender, age, bloodGroup, patientGroup, referedBy, city, state, country, ZipCode, address, } = req.body;
        await commonIdCheck({ clientId, branchId, businessUnit });
        if (!patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientIdRequired,
            });
        }
        console.log(patientId,'patientIdpatientId')
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const patient = await Patient.findById(patientId);
        console.log(patient,'<<<<<<<<<<<<<patient')
        if (!patient) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientNotFound,
            });
        }
        let dataObject = {
            firstName,
            lastName,
            email,
            phone, city, state, country, ZipCode, address,
            gender, bloodGroup, patientGroup, referedBy,
            branch: branchId,
            businessUnit: businessUnit,
            updatedBy: mainUser?._id
        }

        if(age){
            dataObject = {
                ...dataObject,
                age : age
            }
        }

        if (req.file?.filename) {
            dataObject.profileImage = req.file.filename;
        }
        if (!patient.isChainedWithMainPatient) {
            // await patientService.update(clientId, patient.email, dataObject);
        }
        Object.assign(patient, dataObject);
        const savedPatient = await patient.save();

        //await saveActivityLogFn({ patientId: savedPatient?._id, module: "patient", branchId, buId: businessUnit, userId: mainUser?._id, ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress, sourceLink: req.headers['x-frontend-route'], activity: "Updated details of a patient", description: "Updating a patient, and saving activity log for it", data: savedPatient, status: true, dateTime: new Date() });

        
        return res.status(statusCode.OK).send({
            message: message.lblPatientUpdatedSuccess,
        });
    } catch (error) {
        next(error);
    }
};

// get particular Patient by business unit
exports.getParticularPatientByBusinessUnit = async (req, res, next) => {
    try {
        const { clientId, patientId } = req.params;
        if (!clientId || !patientId) {
            return res.status(400).send({
                message: message.lblPatientIdIdAndClientIdRequired,
            });
        }
        const patient = await patientService.getById(clientId, patientId);
        return res.status(200).send({
            message: message.lblPatientFoundSucessfully,
            data: patient,
        });
    } catch (error) {
        next(error)
    }
};

// list Patient by business unit
exports.listPatient = async (req, res, next) => {
    try {
        const { clientId, keyword = '', page = 1, perPage = 10, isAdmin = true, branchId } = req.query;

        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }


        let filters = {
            deletedAt: null,
            ...(keyword && {
                $or: [
                    { firstName: { $regex: keyword.trim(), $options: "i" } },
                    { lastName: { $regex: keyword.trim(), $options: "i" } },
                    { email: { $regex: keyword.trim(), $options: "i" } },
                    { phone: { $regex: keyword.trim(), $options: "i" } },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $concat: ["$firstName", " ", "$lastName"] },
                                regex: keyword.trim(),
                                options: "i",
                            },
                        },
                    },
                ],
            }),
        };

        if (isAdmin == "false" && branchId) {
            filters = {
                ...filters,
                branch: branchId
            }
        }

        const result = await patientService.list(clientId, filters, { page, limit: perPage });
        return res.status(statusCode.OK).send({
            message: message.lblPatientFoundSucessfully,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// get patient by name, email, and phone
exports.getPatientByNameEmailAndPhone = async (req, res, next) => {
    try {
        const { clientId, keyword = '', isAdmin = true, branchId } = req.query;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        let filters = {
            deletedAt: null,
            ...(keyword && {
                $or: [
                    { firstName: { $regex: keyword.trim(), $options: "i" } },
                    { lastName: { $regex: keyword.trim(), $options: "i" } },
                    { email: { $regex: keyword.trim(), $options: "i" } },
                    { phone: { $regex: keyword.trim(), $options: "i" } },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $concat: ["$firstName", " ", "$lastName"] },
                                regex: keyword.trim(),
                                options: "i",
                            },
                        },
                    },
                ],
            }),
        };

        if (isAdmin == "false" && branchId) {
            filters = {
                ...filters,
                branch: branchId
            }
        }


        const result = await patientService.listWithSearch(clientId, filters);
        return res.status(statusCode.OK).send({
            message: message.lblPatientFoundSucessfully,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

exports.searchPatients = async (req, res, next) => {
    try {
        console.log(req.query, 'request query ')
        const { clientId, name = '', contactNumber = '', email = '', page = 1, perPage = 10, branchId } = req.query;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        const filters = {
            deletedAt: null,
            ...(branchId?.trim() && mongoose.Types.ObjectId.isValid(branchId.trim())
                ? { branch: new mongoose.Types.ObjectId(branchId.trim()) }
                : {}),
            $and: [
                ...(name?.trim() ? [{ firstName: { $regex: name.trim(), $options: "i" } }] : []),
                ...(email?.trim() ? [{ email: { $regex: email.trim(), $options: "i" } }] : []),
                ...(contactNumber?.trim() ? [{ phone: { $regex: contactNumber.trim(), $options: "i" } }] : []),
            ],
        };
        const result = await patientService.list(clientId, filters, { page, limit: perPage });
        return res.status(statusCode.OK).send({
            message: message.lblPatientFoundSucessfully,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};



// active inactive Patient by business unit
exports.activeinactivePatientByBusinessUnit = async (req, res, next) => {
    try {
        // console.log(" req.body===>>>>", req.body)
        const mainUser = req.user;
        const { status, patientId, clientId, keyword, page, perPage } = req.body;
        req.query.clientId = clientId;
        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        if (!clientId || !patientId) {
            return res.status(400).send({
                message: message.lblPatientIdIdAndClientIdRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const patient = await Patient.findById(patientId);
        
        if (!patient) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientNotFound,
            });
        }
        // console.log("patientpatient==>>",patient)
        // if (!patient.isChainedWithMainPatient) {
        //     await patientService.activeInactive(clientId, patient.email, {
        //         isActive: status === "1",
        //     });
        // }
        Object.assign(patient, {
            isActive: status === "1",
            updatedBy: mainUser?._id
        });
        const savedPatient = await patient.save();


        // await saveActivityLogFn({ patientId: savedPatient?._id, module: "patient", branchId, buId: businessUnit, userId: mainUser?._id, ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress, sourceLink: req.headers['x-frontend-route'], activity: "Toggling status of a patient", description: "Toggling a patient, and saving activity log for it", data: savedPatient, status: true, dateTime: new Date() });


        this.listPatient(req, res)
    } catch (error) {
        next(error);
    }
};


exports.softDeletePatient = async (req, res) => {
    try {
        const mainUser = req.user;
        const { keyword, page, perPage, patientId, clientId, isAdmin = true, branchId } = req.body;
        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        req.query.clientId = clientId;
        req.query.isAdmin = String(isAdmin);
        req.query.branchId = branchId;


        if (!clientId || !patientId) {
            return res.status(400).send({
                message: message.lblPatientIdIdAndClientIdRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblPatientNotFound,
            });
        }
        // if (!patient.isChainedWithMainPatient) {
        //     await patientService.deleteOne(clientId, patient.email, {
        //         deletedAt: new Date(),
        //         deletedBy: mainUser?._id
        //     });
         // }
        Object.assign(patient, {
            deletedAt: new Date()
        });
        const savedPatient = await patient.save();

        // await saveActivityLogFn({ patientId: savedPatient?._id, module: "patient", branchId, buId: businessUnit, userId: mainUser?._id, ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress, sourceLink: req.headers['x-frontend-route'], activity: "Deleting a patient", description: "Deleting a patient, and saving activity log for it", data: savedPatient, status: true, dateTime: new Date() });


        this.listPatient(req, res)
    } catch (error) {
        console.error("Error in deleting the patient :", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};


exports.getPatientRoleId = async (req, res, next) => {
    try {
        const { clientId } = req.params;
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Role = clientConnection.model('clientRoles', clientRoleSchema);
        const role = await Role.findOne({ id: 17 });
        return res.status(statusCode.OK).send({
            message: "Patient role id found successfully",
            data: role,
        });
    } catch (error) {
        next(error);
    }
};


const CustomError = require("../../utils/customeError");
const getserialNumber = require("../../model/services/getserialNumber");
const { default: mongoose } = require("mongoose");
const saveActivityLogFn = require("../../businessUnitAdministration/services/activityLog/saveActivityLogFn");


const commonIdCheck = async (data) => {
    try {
        if (!data.clientId) {
            throw new CustomError(statusCode.BadRequest, message.lblClinetIdIsRequired);
        }
        if (!data.branchId) {
            throw new CustomError(statusCode.BadRequest, message.lblTryWithValidBranch);
        }
        if (!data.businessUnit) {
            throw new CustomError(statusCode.BadRequest, message.lblBusinessUnitIdIsRequired);
        }
        const clientConnection = await getClientDatabaseConnection(data.clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const branch = await Branch.findById(data.branchId);
        if (!branch) {
            throw new CustomError(statusCode.BadRequest, message.lblBranchNotFound);
        }
        const bu = await BusinessUnit.findById(data.businessUnit)
        if (!bu) {
            throw new CustomError(statusCode.BadRequest, message.lblBusinessUnitNotFound);
        }
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating patient: ${error.message}`);
    }
}

exports.createMinimalPatient = async (req, res, next) => {
    try {
        const { clientId, branchId, roleId, businessUnit, email, firstName, lastName, phone, gender, age, bloodGroup, patientGroup, referedBy } = req.body;
        
        console.log(  email,'email', age,'Age',  )
        const mainUser = req.user;
        await commonIdCheck({ clientId, branchId, businessUnit });
        if (!firstName || !phone || !roleId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Role = clientConnection.model('clientRoles', clientRoleSchema);
        const role = await Role.findOne({ id: 17 });
        if (!role) {
            throw new CustomError(statusCode.Conflict, message.lblRoleNotFound);
        }
        const displayId = await getserialNumber('patient', clientId, '', businessUnit);
        let profileUpdates = {
            displayId: displayId,
            firstName,
            lastName,
            phone,
            gender, age, bloodGroup, patientGroup, referedBy,
            branch: branchId,
            role: roleId,
            roleId: role.id,
            email,
            businessUnit: businessUnit,
            tc: true,
            isUserVerified: true,
            createdBy: mainUser?._id
        }
        // ------------------------------
        const User = clientConnection.model('clientUsers', clinetUserSchema);
        const existing = await User.findOne({
            $or: [{ phone: phone }, { email: email }],
        });
        //console.log(existing,'existingexistingexistingexisting')
        let newPatient = null;
        // if(!existing){
        //     newPatient=  await User.create(profileUpdates);
        // }
        // else {
        //newPatient= existing
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        let profileUpdates2 = {
            displayId: displayId,
            firstName,
            lastName,
            phone, email,
            gender, age, bloodGroup, patientGroup, referedBy,
            branch: branchId,
            // mainPatientLinkedid: newPatient?._id,
            businessUnit: businessUnit,

        }
        const newPatientInstance = await Patient.create({ ...profileUpdates2 })
        return res.status(statusCode.OK).send({
            message: message.lblPatientCreatedSuccess,
            status: true,
            data: { patientId: newPatientInstance._id },
        });
        // }  
    } catch (error) {
        next(error)
    }
};


