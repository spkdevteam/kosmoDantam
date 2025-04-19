



const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clientRoleSchema = require("../../client/model/role");
const { defaultPersmissionsList } = require("../../utils/constant"); 
const togglePermissionStatus = require("../services/rolesAndPermission/togglePermissionStatus");



// create Roles and permission by business unit
exports.createRolesAndPermissionByBusinessUnit = async (req, res) => {

    try {
        const superAdmin = req.user;
        const { clientId, name } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!name) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const RolesAndpermission = clientConnection.model('clientRoles', clientRoleSchema);
        const role = await RolesAndpermission.findOne({ name: name });
        const lastRole = await RolesAndpermission.findOne().sort({ _id: -1 });
        const allRole = await RolesAndpermission.find();

        let maxRoleId = 0;

        for (let index = 0; index < allRole.length; index++) {
            const element = allRole[index];

            if (element.id > maxRoleId) {
                maxRoleId = element.id
            }

        }



        if (role) {
            return res.status(200).send({status:false,
                message: message.lblBusinessUnitRoleAlreadyExists,
            });
        }
        const newRole = await RolesAndpermission.create(
            [
                {
                    name, createdBy: superAdmin?._id, id: maxRoleId + 1, capability: defaultPersmissionsList
                },
            ],
        );
        return res.status(statusCode.OK).send({
            status:true,
            message: message.lblBusinessUnitRoleCreatedSuccessfully,
            data: { roleId: newRole[0]._id, roleName: newRole[0].name, capability: newRole[0].capability },
        });
    } catch (error) {
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// update Roles and permission by business unit
exports.updateRoleAndPermissionByBusinessUnit = async (req, res) => {

    try {
        const { roleId, clientId, name, capability, } = req.body;
        if (!roleId || !clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRoleIdIdAndClientIdRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const RolesAndpermission = clientConnection.model('clientRoles', clientRoleSchema);
        const role = await RolesAndpermission.findById(roleId);
        if (!role) {
            return res.status(statusCode.NotFound).send({
                message: message.lblRoleNotFound,
            });
        }
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
            message: !capability ? 'Role name modified ' : 'User permission modified' ,
            data: { roleId: role._id, name: role.name },
        });
    } catch (error) {
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// // // get particular Role and permission by business unit
exports.getParticularRoleAndPermissionByBusinessUnit = async (req, res) => {
    try {
        const { clientId, roleId } = req.params;
        if (!clientId || !roleId) {
            return res.status(400).send({
                message: message.lblRoleIdIdAndClientIdRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const RolesAndpermission = clientConnection.model('clientRoles', clientRoleSchema);
        const role = await RolesAndpermission.findById(roleId);
        if (!role) {
            return res.status(404).send({
                message: message.lblRoleNotFound
            });
        }
        return res.status(200).send({
            message: message.lblBusinessUnitRoleFoundSuccessfully,
            data: role,
        });
    } catch (error) {
        return res.status(500).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// list Role and permission for business unit
exports.listRolesAndPermission = async (req, res) => {
    try {
        const admin = req.user;
        console.log(" req.query",  req.query);

        const clientId = req.query.clientId;
        const keyword = req.query.keyword;
        const page = req.query.page??1;
        const perPage = req.query.perPage??10
        console.log(page,perPage,'page,perPage');
        let whereCondition = {
            deletedAt: null,
            id:{$ne:17},
            ...(keyword && {
                $or: [
                    { name: { $regex: keyword.trim(), $options: "i" } },
                ],
            }),
        };

        // if(admin?.roleId !== 1 && admin?.roleId !==2){
        //     whereCondition ={
        //         ...whereCondition,
        //         createdBy : admin?._id
        //     }
        // }


        if (!clientId) {
            return res.status(400).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const RolesAndpermission = clientConnection.model('clientRoles', clientRoleSchema);
        //////RAHUL:=>
        // const [roles] = await Promise.all([
        //     RolesAndpermission.find(whereCondition).select("name id createdBy isActive").sort({ _id: -1 }),
        // ]);
        const [roles] = await Promise.all([
            RolesAndpermission.find(whereCondition).select("name id createdBy isActive capability").sort({ _id: -1 })
            ?.skip((page-1) * perPage)?.limit(perPage),//capability added extra
        ]);

        const [totalCount] = await Promise.all([
            RolesAndpermission.find(whereCondition).select("name id createdBy isActive capability").sort({ _id: -1 })
            ,//capability added extra
        ]);
        // console.log("roles=>>",roles);
        //updatation of capability

        for (const r of roles) {
            let isUpdated = false
            for (const cap of r.capability) {
                if (String(cap.name) == "Administration") {

                    const constArray = [];
                    for (def of defaultPersmissionsList[0].menu) {
                        constArray.push(def.name);
                    }
                    const dbArray = [];
                    for (const m of cap.menu) {
                        dbArray.push(m?.name);
                    }

                    const notExistObj = constArray
                        .map((num, index) => ({ num, index }))
                        .filter(({ num }) =>
                            !dbArray.some(el =>
                                el.toLowerCase().trim() === num.toLowerCase().trim()
                            )
                        );
                    // console.log("AdministrationnotExistObj=>>",notExistObj);
                    for (let key of notExistObj) {
                        if (String(key) === "index") {
                            const pushMenu = defaultPersmissionsList[0].menu[notExistObj[key]];
                            // pushMenu.access = true;
                            // console.log("AdministrationpushMenu=>>>>",pushMenu);
                            cap.menu.push(pushMenu);
                            isUpdated = true;
                        }
                    }

                }
                if (String(cap.name) == "Patient") {
                    const constArray = [];
                    for (def of defaultPersmissionsList[1].menu) {
                        constArray.push(def.name);
                    }
                    // console.log("constArray=>",constArray);
                    const dbArray = [];
                    for (const m of cap.menu) {
                        dbArray.push(m?.name);
                    }
                    // console.log("dbArray=>",dbArray);
                    // const notExistObj = constArray.map((num, index) => ({ num, index })).filter(({ num }) => !dbArray.some(el => String(el) === String(num)));
                    const notExistObj = constArray
                        .map((num, index) => ({ num, index }))
                        .filter(({ num }) =>
                            !dbArray.some(el =>
                                el.toLowerCase().trim() === num.toLowerCase().trim()
                            )
                        );
                    // console.log("notExistObj=>>",notExistObj);
                    for (element of notExistObj) {
                        const pushMenu = defaultPersmissionsList[1].menu[element?.index];
                        // pushMenu.access = true;
                         console.log("PatientpushMenu=>>>",pushMenu);
                         
                        cap.menu.push(pushMenu);
                        isUpdated = true;
                    }
                }
            }
            if (isUpdated) {
                await r.save();
                // console.log(`Updated document ID: ${r?._id}`);
            }
        }

        //
        console.log({
            message: 'List of all roles!',
            listOfRoles: roles,
            totalData :totalCount
        })
        return res.json({
            message: 'List of all roles!',
            listOfRoles: roles,
            totalData :totalCount?.length
        });
    } catch (error) {
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};




// Soft delete Roles and permission by business unit
exports.softDeleteRolesAndPermissionByBusinesssUnit = async (req, res) => {
    try {
        const { clientId, roleId, softDelete = "1" } = req.body;
        req.query.clientId = clientId;
        if (!roleId || !clientId) {
            return res.status(400).send({
                message: message.lblRoleIdIdAndClientIdRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const RolesAndpermission = clientConnection.model('clientRoles', clientRoleSchema);
        const role = await RolesAndpermission.findById(roleId)
        if (!role) {
            return res.status(statusCode.ExpectationFailed).send({
                message: message.lblRoleNotFound,
            });
        }
        if (softDelete == "1") {
            role.deletedAt = new Date();
            await role.save()
            res.json ({status:true,message:'Role deleted successfully  '})
        } else {
            await RolesAndpermission.deleteOne({ _id: roleId });
            res.json ({status:true,message:'Role deleted successfully  '})
        }
        // this.listRolesAndPermission(req, res);
    } catch (error) {
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// get roles list
exports.getRolesList = async (req, res) => {
    try {
        const admin = req.user;
        const roleIdOfCurrentUser = admin?.role?.id;
        const clientId = req.query.clientId;
        if (!clientId) {
            return res.status(400).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const RolesAndPermission = clientConnection.model('clientRoles', clientRoleSchema);
        const roles = await RolesAndPermission.find({ deletedAt: null })
            .select("name id createdBy isActive _id")
            .sort({ _id: -1 });

        const filterRoles = (roles, roleId) => {
            if (roleId === 1) {
                return roles.filter(role => role.id !== 1);
            }
            if (roleId === 2) {
                return roles.filter(role => role.id !== 1 && role.id !== 2);
            }
            // if(roleId !== 2 || roleId !== 1){
            //     return roles.filter(role => role.id !== 1 && role.id !== 2 && role.id !== roleId);
            // }
            return roles.filter(role => role.id !== 1 && role.id !== 2);
        };
        const rolesList = filterRoles(roles, roleIdOfCurrentUser);
        const pataintentExcluded = rolesList?.filter((item) => item?.name !== "patienit");
        return res.json({
            message: 'List of all roles!',
            listOfRoles: pataintentExcluded,
             
        });
    } catch (error) {
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
        req.query.clientId = clientId;
        if (!clientId || !roleId) {
            return res.status(400).send({
                message: message.lblRoleIdIdAndClientIdRequired,
            });
        }
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
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

exports.togglePermissionStatus = async (req, res) => {
    try {
        const { roleId, clientId } = req.body;
        const result = await togglePermissionStatus({ clientId: clientId, permissionId: roleId })
        res.json(result)

    } catch (error) {
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
}





