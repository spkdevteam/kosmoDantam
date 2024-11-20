



const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clientRoleSchema = require("../../client/model/role");
const {defaultPersmissionsList} = require("../../utils/constant")




// create Roles and permission by business unit
exports.createRolesAndPermissionByBusinessUnit = async (req, res) => {

    try {

        // Destructure fields from request body
        const { clientId, createdBy, name } = req.body;

        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }

        // Check if required fields are missing
        if (!name) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }

        const clientConnection = await getClientDatabaseConnection(clientId);

        const RolesAndpermission = clientConnection.model('clientRoles', clientRoleSchema);

        const role = await RolesAndpermission.findOne({ name: name });

        if (role) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitRoleAlreadyExists,
            });
        }

        // Create new role and permission 
        const newRole = await RolesAndpermission.create(
            [
                {
                    name, createdBy: createdBy, capability : defaultPersmissionsList
                },
            ],
        );

        return res.status(statusCode.OK).send({
            message: message.lblBusinessUnitRoleCreatedSuccessfully,
            data: { roleId: newRole[0]._id, roleName: newRole[0].name, capability : newRole[0].capability },
        });

    } catch (error) {
        console.error("Error in createRoleAndPermission:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message, // Optional: Include detailed error message for debugging
        });
    }
};

// update Roles and permission by business unit
exports.updateRoleAndPermissionByBusinessUnit = async (req, res) => {

    try {
        // Destructure fields from request body
        const { roleId, clientId, name, capability, } = req.body;

        // Check if branchId and clientId are provided
        if (!roleId || !clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRoleIdIdAndClientIdRequired,
            });
        }

        // // Check if required fields are missing
        // if (!name || !capability ) {
        //     return res.status(statusCode.BadRequest).send({
        //         message: message.lblRequiredFieldMissing,
        //     });
        // }

        // Get the client-specific database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const RolesAndpermission = clientConnection.model('clientRoles', clientRoleSchema);

        // Find the Roles and permisssion to be updated
        const role = await RolesAndpermission.findById(roleId);
        if (!role) {
            return res.status(statusCode.NotFound).send({
                message: message.lblRoleNotFound,
            });
        }

        // Check if name is already used by another roles and permission
        const existingRole = await RolesAndpermission.findOne({
            $and: [
                { _id: { $ne: roleId } },
                {
                    $or: [
                        { name: name },
                    ],
                },
            ],
        });

        if (existingRole) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitRoleAlreadyExists,
            });
        }


        if (name) {
            role.name = name;
        }

        if (capability) {
            role.capability = capability;
        }


        await role.save();

        return res.status(statusCode.OK).send({
            message: message.lblBusinessUnitRoleUpdatedSuccessfully,
            data: { roleId: role._id, name: role.name },
        });

    } catch (error) {
        console.error("Error in updateRoleAndPermission:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// // // get particular Role and permission by business unit
exports.getParticularRoleAndPermissionByBusinessUnit = async (req, res) => {
    try {
        const { clientId, roleId } = req.params; // Extract clientId and branchId from request params

        // Validate inputs
        if (!clientId || !roleId) {
            return res.status(400).send({
                message: message.lblRoleIdIdAndClientIdRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const RolesAndpermission = clientConnection.model('clientRoles', clientRoleSchema);

        // Fetch the Roles and Permisssion by ID
        const role = await RolesAndpermission.findById(roleId);

        if (!role) {
            return res.status(404).send({
                message: message.lblRoleNotFound
            });
        }

        // Respond with role data
        return res.status(200).send({
            message: message.lblBusinessUnitRoleFoundSuccessfully,
            data: role,
        });

    } catch (error) {
        console.error("Error in getRoleAndPermissionById:", error);
        // Handle errors
        return res.status(500).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// // // list Role and permission for business unit
exports.listRolesAndPermission = async (req, res) => {

    try {

        const clientId = req.query.clientId;

        let whereCondition = {
            deletedAt: null,
        };


        // Validate inputs
        if (!clientId) {
            return res.status(400).send({
                message: message.lblClinetIdIsRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const RolesAndpermission = clientConnection.model('clientRoles', clientRoleSchema);


        const [roles] = await Promise.all([
            RolesAndpermission.find(whereCondition).select("name id createdBy"),
        ]);

        return res.json({
            message: 'List of all roles!',
            listOfRoles: roles,
        });


    } catch (error) {
        console.error("Error in listRoles:", error);

        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};


// Soft delete Roles and permission by business unit
exports.softDeleteRolesAndPermissionByBusinesssUnit = async (req, res) => {

    try {

        const { clientId, roleId } = req.body;

        req.query.clientId = clientId;

        // Validate inputs
        if (!roleId || !clientId) {
            return res.status(400).send({
                message: message.lblRoleIdIdAndClientIdRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const RolesAndpermission = clientConnection.model('clientRoles', clientRoleSchema);

        const role = await RolesAndpermission.findById(roleId)

        if (!role) {
            return res.status(statusCode.ExpectationFailed).send({
                message: message.lblRoleNotFound,
            });
        }

        role.deletedAt = new Date();
        await role.save()
        this.listRolesAndPermission(req, res);

    } catch (error) {
        console.error("Error in softDeleteRolesAndPermission:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// restore role and permission
exports.restoreRoleAndPermissionByBusinessUnit = async (req, res) => {

    try {

        const { roleId, clientId } = req.body;

        req.query.clientId  = clientId;

     
        // Validate inputs
        if (!clientId || !roleId) {
            return res.status(400).send({
                message: message.lblRoleIdIdAndClientIdRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const RolesAndpermission = clientConnection.model('clientRoles', clientRoleSchema);


        const role = await RolesAndpermission.findById(roleId)

        if (!role) {
            return res.status(statusCode.ExpectationFailed).send({
                message: message.lblRoleNotFound,
            });
        }

        role.deletedAt = null;
        await role.save();
        this.listRolesAndPermission(req, res);


    } catch (error) {

        console.error("Error in restoreRolesAndPermission:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};





