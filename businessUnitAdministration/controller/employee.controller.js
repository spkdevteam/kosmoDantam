


const bcrypt = require("bcrypt");


const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const clinetChairSchema = require("../../client/model/chair");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit");
const clientRoleSchema = require("../../client/model/role");

const RoleModel = require("../../model/role");
const MasterUser = require("../../model/user")

const employeeService = require("../../client/service/employee.service");
const getserialNumber = require("../../model/services/getserialNumber");
const CustomError = require("../../utils/customeError");
const clinetUserSchema = require("../../client/model/user");
const sanitizeBody = require("../../utils/sanitizeBody");

// create Employee 
exports.createEmployee = async (req, res, next) => {

    try {
        // Destructure fields from request body
        const { clientId, branchId, roleId, businessUnit, firstName, lastName, email, phone, gender, city, state, country, ZipCode, address, panNumber, aadharNumber, emergencyPhone, bloodGroup, password } = req.body;
        const mainUser = req.user;
        console.log("req.body",req.body);
        
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        };
        // Check if required fields are missing
        if (!firstName || !lastName || !email || !phone  || !password || !roleId ) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        };
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const Role = clientConnection.model('clientRoles', clientRoleSchema);
        // const branch = await Branch.findById(branchId);
        // if (!branch) {
        //     return res.status(statusCode.BadRequest).send({
        //         message: message.lblBranchNotFound,
        //     });
        // }
        const bu = await BusinessUnit.findById(businessUnit)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const role = await Role.findById(roleId);
        if (!role) {
            throw new CustomError(statusCode.Conflict, message.lblRoleNotFound);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const displayId = await getserialNumber('employee', clientId, '', businessUnit);
        console.log("displayId",displayId);

        let dataObject = {
            displayId : displayId,
            firstName,
            lastName,
            email, city , state, country, ZipCode, address, panNumber, adharNumber : aadharNumber, bloodGroup,
            phone,   password: hashedPassword,
            branch: branchId,
            role: roleId,
            roleId: role.id,
            businessUnit: businessUnit,
            tc: true,
            isUserVerified: true,
            createdBy: mainUser._id,
        }

        if(emergencyPhone){
            dataObject = {
                ...dataObject,
                emergencyPhone : emergencyPhone
            }
        }

        if(gender){
            dataObject = {
                ...dataObject,
                gender : gender
            }
        }
        
        
        // create new employee with service
        const newEmployee = await employeeService.createEmployee(clientId, {...dataObject});
        // create employee in main database 
        const masterRole = await RoleModel.findOne({ id: 5 });
        const existingStaff = await MasterUser.findOne({
            $or: [{ email: email.toLowerCase() }, { phone }],
        });
        if (existingStaff) {
            const isAccessUnitAlreadyExists = existingStaff.accessUnit.find((item) => item.id == clientId);

            if (isAccessUnitAlreadyExists) {

                return res.status(statusCode.OK).send({
                    message: message.lblEmployeeCreatedSuccess,
                    data: { empId: newEmployee._id },
                });

            } else {

                existingStaff.accessUnit = [...existingStaff.accessUnit, { id: clientId }];

                await existingStaff.save()

                return res.status(statusCode.OK).send({
                    message: message.lblEmployeeCreatedSuccess,
                    data: { empId: newEmployee._id },
                });

            }
        } else {

            const newStaff = await MasterUser.create(
                [
                    {
                        firstName,
                        lastName,
                        email: email.toLowerCase(),
                        phone,
                        password: hashedPassword,
                        role: masterRole._id,
                        roleId: masterRole.id,
                        isActive: true,
                        isUserVerified: true,
                        tc: true,
                        accessUnit: [{ id: clientId }]
                    },
                ],
            );


            return res.status(statusCode.OK).send({
                message: message.lblEmployeeCreatedSuccess,
                data: { empId: newEmployee._id },
            });

        }

    } catch (error) {
        next(error)
    }
};

// update employee 
exports.updateEmployee = async (req, res, next) => {

    try {
        const mainUser = req.user;
        // Destructure fields from request body
        const { clientId, branchId, roleId, businessUnit, employeeId, firstName, lastName, email, phone, gender, city, state, country, ZipCode, address, panNumber, aadharNumber, emergencyPhone, bloodGroup, password } = req.body;

        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }

        // Check if required fields are missing
        if (!employeeId || !branchId || !roleId || !businessUnit) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }

        const clientConnection = await getClientDatabaseConnection(clientId);

        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const Role = clientConnection.model('clientRoles', clientRoleSchema);

        const branch = await Branch.findById(branchId);

        if (!branch) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchNotFound,
            });
        }

        const bu = await BusinessUnit.findById(businessUnit)
        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }

        const role = await Role.findById(roleId);

        if (!role) {
            throw new CustomError(statusCode.Conflict, message.lblRoleNotFound);
        }

        let dataObject = {
            firstName,
            lastName,
            email,
            phone, gender, city, state, country, ZipCode, address, panNumber, adharNumber : aadharNumber, emergencyPhone, bloodGroup,
            branch: branchId,
            role: roleId,
            roleId:role?.id,
            businessUnit: businessUnit,
            updatedBy: mainUser?._id
        }

        let newPassword = "";

        if (password) {

            newPassword = await bcrypt.hash(password, 10)
            dataObject = {
                ...dataObject,
                password: newPassword
            }
        }

        const updated = await employeeService.updateEmployee(clientId, employeeId, dataObject);

        const existingStaff = await MasterUser.findOne({
            $or: [{ email: updated?.email.toLowerCase() }, { phone: updated?.phone }],
        });

        existingStaff.email = email;
        existingStaff.phone = phone;
        if(password){
            existingStaff.password = newPassword;
        }

        await existingStaff.save();

        return res.status(statusCode.OK).send({
            message: message.lblEmployeeUpdatedSuccess,
        });

    } catch (error) {

        next(error);
    }
};

// get particular employee 
exports.getParticularEmployee = async (req, res, next) => {
    try {
        const { clientId, employeeId } = req.params; // Extract clientId and branchId from request params

        // Validate inputs
        if (!clientId || !employeeId) {
            return res.status(400).send({
                message: message.lblEmployeeIdIdAndClientIdRequired,
            });
        }

        const chair = await employeeService.getEmployeeById(clientId, employeeId);

        return res.status(200).send({
            message: message.lblEmployeeFoundSucessfully,
            data: chair,
        });

    } catch (error) {
        next(error)
    }
};

// list employee 
exports.listEmployee = async (req, res, next) => {
    try {
        const { clientId, keyword = '', page = 1, perPage = 10, roleId = 4,  isAdmin = true, branchId  } = req.query;

        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }

        let filters = {
            deletedAt: null,
            roleId: { $gt: 2, $ne: 17 },
            ...(keyword && {
                $or: [
                    { firstName: { $regex: keyword.trim(), $options: "i" } },
                    { lastName: { $regex: keyword.trim(), $options: "i" } },
                    { email: { $regex: keyword.trim(), $options: "i" } },
                    { phone: { $regex: keyword.trim(), $options: "i" } },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $concat: ["$firstName", " ", "$lastName"] }, // Combine firstName and lastName
                                regex: keyword.trim(),
                                options: "i",
                            },
                        },
                    },
                ],
            }),
        };

        if(isAdmin == "false" && branchId ){
            filters = {
                ...filters,
                branch : branchId
            }
        }

        const result = await employeeService.listEmployee(clientId, filters, { page, limit: perPage });

        return res.status(statusCode.OK).send({
            message: message.lblEmployeeFoundSucessfully,
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

// active inactive employee 
exports.activeinactiveEmployee = async (req, res, next) => {
    try {
        const { status, employeeId, clientId, roleId, keyword, page, perPage } = req.body;
        const mainUser = req.user;

        req.query.clientId = clientId;
        req.query.roleId = roleId;
        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;

        // Validate inputs
        if (!clientId || !employeeId) {
            return res.status(400).send({
                message: message.lblEmployeeIdIdAndClientIdRequired,
            });
        }

        const updatedEmployee = await employeeService.activeInactiveEmployee(clientId, employeeId, {
            isActive: status === "1",
            updatedBy: mainUser?._id
        });

        this.listEmployee(req, res);

    } catch (error) {
        next(error);
    }
};


// soft delete employee
exports.softDeleteEmployee = async (req, res) => {
    try {
        const { keyword, page, perPage, employeeId, clientId } = req.body;
        const mainUser = req.user;
        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        req.query.clientId = clientId;
        if (!clientId || !employeeId) {
            return res.status(400).send({
                message: message.lblEmployeeIdIdAndClientIdRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const User = clientConnection.model('clientUsers', clinetUserSchema);
        const employee = await User.findById(employeeId)
        if (!employee) {
            return res.status(statusCode.ExpectationFailed).send({
                message: message.lblUserNotFound,
            });
        }
        employee.deletedAt = new Date();
        employee.deletedBy = mainUser?._id;
        await employee.save()
        this.listEmployee(req, res);
    } catch (error) {
        console.error("Error in softDelete employee:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};



exports.listEmployeebyBranchId = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.params)
        console.log(data,'**********------------------**************')
        const { clientId, keyword = '', page = 1, perPage = 10, roleId = 4,  isAdmin = true, branchId  } = data;

        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        const result = await employeeService.listEmployeebyBranchId(data);

        return res.status(statusCode.OK).send({
            message: message.lblEmployeeFoundSucessfully,
            data: result,
        });

    } catch (error) {
        next(error);
    }
};



