

const jwt = require("jsonwebtoken");
const dotnev = require("dotenv");
dotnev.config();
const PRIVATEKEY = process.env.PRIVATEKEY;
const statusCode = require('../../../utils/http-status-code');
const message = require("../../../utils/message");

const { getClientDatabaseConnection } = require("../../../db/connection");
const clinetUserSchema = require("../../../client/model/user");
const clientRoleSchema = require("../../../client/model/role")


exports.tempAuthorizeEntity = (module, entityName, subMenuAction = 'create') => async (req, res, next) => {
    try {
        const { capability, user } = await commonCheckOfEntity(req.headers, module, entityName);
        const menu = capability?.menu?.find((item) => item.name === entityName);
       
        req.user = user;
        next();
    } catch (error) {
        console.error(`Authorization Error for ${entityName}:`, error.message);
        return res.status(statusCode.Unauthorized).send({ message: error.message });
    }
};

const commonCheckOfEntity = async (header, module, entityName) => {
    const { authorization } = header;

    if (!authorization || !authorization.startsWith("Bearer")) {
        throw new Error(message.lblNoToken || "No token provided");
    }
    try {
        const token = authorization.split(" ")[1];
        const { id, email } = jwt.verify(token, PRIVATEKEY);
        if (!id) {
            throw new Error(message.lblUnauthorizeUser || "Unauthorized user");
        }
        const clientConnection = await getClientDatabaseConnection(id);
        const userModel = clientConnection.model('clientUsers', clinetUserSchema);
        clientConnection.model('clientRoles', clientRoleSchema);

        const user = await userModel.findOne({ email }).populate("role").lean();
        if (!user) {
            throw new Error(message.lblUserNotFound || "User not found");
        }
        const capability = user?.role?.capability?.find((item) => item.name === module);
        if (!capability || !capability.access) {
            throw new Error(message.lblUnauthorize || `Unauthorized access for ${module}`);
        }
        return { capability, user };
    } catch (error) {
        throw new Error(error.message || `Invalid token or verification failed for ${entityName}`);
    }
};



// common auth for valid toke 
exports.commonAuthForValidToken = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            const { id, email } = jwt.verify(token, PRIVATEKEY);
            if (id) {
                const clientConnection = await getClientDatabaseConnection(id);
                const userModel = clientConnection.model('clientUsers', clinetUserSchema);
                clientConnection.model('clientRoles', clientRoleSchema);

                const user = await userModel.findOne({ email }).populate("role").lean();
                if (user) {
                    req.user = user;
                    next();
                } else {
                    return res.send({
                        message: message.lblUserNotFound,
                    });
                }
            } else {
                return res.status(statusCode.Unauthorized).send({
                    message: message.lblUnauthorizeUser
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(statusCode.Unauthorized).send({ message: error.message });
        }
    } else {
        return res.send({ status: message.lblNoToken });
    }
};