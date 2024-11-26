


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

const employeeService = require("../../client/service/employee.service")

// create Employee by business unit
exports.createEmployeeByBusinessUnit = async (req, res, next) => {

    try {

        // Destructure fields from request body
        const { clientId, branchId, roleId, businessUnit, firstName, lastName, email, phone, password } = req.body;

        const mainUser = req.user;

        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }

        // Check if required fields are missing
        if (!firstName || !lastName || !email || !phone || !password || !roleId) {
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

        const hashedPassword = await bcrypt.hash(password, 10);

        // create new employee with service
        const newEmployee = await employeeService.createEmployee(clientId, {
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            branch: branchId,
            role: roleId,
            roleId: role.id,
            businessUnit: businessUnit,
            tc: true,
            isUserVerified: true,
            createdBy: mainUser._id,

        });


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

// update employee by business unit
exports.updateEmployeeByBusinessUnit = async (req, res, next) => {

    try {
        // Destructure fields from request body
        const { clientId, branchId, roleId, businessUnit, employeeId, firstName, lastName, email, phone, password } = req.body;

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
            phone,
            branch: branchId,
            role: roleId,
            businessUnit: businessUnit,
        }

        if (password) {
            dataObject = {
                ...dataObject,
                password: await bcrypt.hash(password, 10)
            }
        }

        const updated = await employeeService.updateEmployee(clientId, employeeId, dataObject);

        const existingStaff = await MasterUser.findOne({
            $or: [{ email: updated?.email.toLowerCase() }, { phone: updated?.phone }],
        });

        existingStaff.email = email;
        existingStaff.phone = phone;

        await existingStaff.save();

        return res.status(statusCode.OK).send({
            message: message.lblEmployeeUpdatedSuccess,
        });

    } catch (error) {

        next(error);
    }
};

// get particular employee by business unit
exports.getParticularEmployeeByBusinessUnit = async (req, res, next) => {
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

// list employee by business unit
exports.listEmployee = async (req, res, next) => {
    try {
        const { clientId, keyword = '', page = 1, perPage = 10, roleId = 3 } = req.query;

        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }

        const filters = {
            deletedAt: null,
            roleId: roleId,
            ...(keyword && {
                $or: [
                    { firstName: { $regex: keyword.trim(), $options: "i" } },
                    { lastName: { $regex: keyword.trim(), $options: "i" } },
                    { email: { $regex: keyword.trim(), $options: "i" } },
                    { phone: { $regex: keyword.trim(), $options: "i" } },
                ],
            }),
        };

        const result = await employeeService.listEmployee(clientId, filters, { page, limit: perPage });

        return res.status(statusCode.OK).send({
            message: message.lblEmployeeFoundSucessfully,
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

// active inactive employee by business unit
exports.activeinactiveEmployeeByBusinessUnit = async (req, res, next) => {
    try {
        const { status, employeeId, clientId, roleId, keyword, page, perPage } = req.body;

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
        });

        this.listEmployee(req, res)

    } catch (error) {
        next(error);
    }
};





