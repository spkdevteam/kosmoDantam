const clinetBusinessUnitSchema = require("../../client/model/businessUnit");
const serviceSchema = require("../../client/model/service")
const httpStatusCode = require("../../utils/http-status-code")
const message = require("../../utils/message")
const sanitizeBody = require("../../utils/sanitizeBody");
const CustomError = require("../../utils/customeError")
const {list,activeInactive,deleteServ, createService, deleteService, readActiveServices, toggleServiceStatus, editService, serviceUnderDepartment, readActiveServicesbyPage, getServiceById } = require("../services/services.service");
const { getClientDatabaseConnection } = require("../../db/connection");
const getserialNumber = require("../../model/services/getserialNumber");

exports.createServices = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        const result = await createService(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}

exports.create = async (req, res, next) => {
    try {
        const { clientId, departmentId, serviceName, description, buId,branchId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!serviceName || !description) {
            return res.status(httpStatusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const bu = await BusinessUnit.findById(buId)
        if (!bu) {
            return res.status(httpStatusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const existing = await Service.findOne( 
             { serviceName: serviceName,departmentId:departmentId }
          );
        if (existing) {
            throw new CustomError(statusCode.Conflict, message.lblServiceExist);
        }
        const displayId = await getserialNumber('service', clientId, '', buId);
        const service = await Service.create({
            displayId: displayId,
            departmentId: departmentId,
            serviceName: serviceName,
            description: description,
            buId: buId,
            branchId:branchId
        });
        return res.status(httpStatusCode.OK).send({
            message: message.lblServiceCreated,
            data: { serviceId: service._id },
        });
    } catch (error) {
        next(error)
    }
};

exports.update = async (req, res, next) => {
    try {
        const { clientId, serviceId, departmentId, serviceName, description, buId } = req.body;

        console.log("serviceId",req.body);
        
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!serviceName || !description || !serviceId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const Service = clientConnection.model('services', serviceSchema);
        const bu = await BusinessUnit.findById(buId)
        if (!bu) {
            return res.status(httpStatusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }
        const service = await Service.findById(serviceId);
        if (!service) {
            throw new CustomError(statusCode.Conflict, message.lblServicenotFound);
        }
        const existing = await Service.findOne({
            $and: [
                { _id: { $ne: serviceId } },
                {
                    $or: [
                        { serviceName: serviceName },
                    ],
                },
            ],
        });
        if (existing) {
            throw new CustomError(statusCode.Conflict, message.lblServiceExist);
        }

        service.serviceName = serviceName;
        service.description = description;
        service.departmentId = departmentId;
        await service.save();

        return res.status(httpStatusCode.OK).send({
            message: message.lblServiceModified,
            data: { serviceId: service._id },
        });
    } catch (error) {
        next(error)
    }
};


exports.editService = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        const result = await editService(data)
        res.status(result?.statusCode || 200).json(result)
    } catch (error) {
        next(error)
    }
}

exports.deleteService = async (req, res, next) => {
    try {
        console.log(req.query)
        const data = await sanitizeBody(req.query)
        const result = await deleteService(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}

exports.readActiveServices = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        const result = await readActiveServices(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}

exports.toggleService = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        const result = await toggleServiceStatus(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}



exports.getServiceUnderDepartment = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        const result = await serviceUnderDepartment(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}

exports.getReadActiveServicesbyPage = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        const result = await readActiveServicesbyPage(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}


exports.listServices = async (req, res, next) => {
    try {
        const { clientId, keyword = '', page = 1, perPage = 10,branchId } = req.query;
        if (!clientId) {
            return res.status(httpStatusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        const filters = {
            deletedAt: null,
            ...(keyword && {
                $or: [
                    { serviceName: { $regex: keyword.trim(), $options: "i" } },
                    { description: { $regex: keyword.trim(), $options: "i" } },
                ],
            }),
        };
        branchId?.length ? filters.branchId=branchId:''

        const result = await list(clientId, filters, { page, limit: perPage });
        return res.status(httpStatusCode.OK).send({
            message: message.lblServicesFoundSucessfully,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


exports.activeinactiveService = async (req, res, next) => {
    try {
        const { status, serviceId, clientId } = req.body;
        if (!clientId || !serviceId) {
            return res.status(400).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const updated = await activeInactive(clientId, serviceId, {
            isActive: status === "1",
        });
        return res.status(httpStatusCode.OK).send({
            message: message.lblServiceModified,
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

exports.softDeleteService = async (req, res, next) => {

    try {

        const { keyword, page, perPage, serviceId, clientId } = req.body;

        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        req.query.clientId = clientId;


        // Validate inputs
        if (!clientId || !serviceId) {
            return res.status(400).send({
                message: message.lblRequiredFieldMissing,
            });
        }

        await deleteServ(clientId, serviceId, softDelete = true)

        this.listServices(req, res, next);


    } catch (error) {
        next(error);
    }
};

exports.putToggleServiceByPage = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        const toggle = await toggleServiceStatus(data)
        const result = await readActiveServicesbyPage(data)
        result.message = toggle.message
        res.status(toggle?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}



exports.getServiceDetailsById = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        const result = await getServiceById({clientId:data.clientId,serviceId:data.serviceId})
        res.json(result)
    } catch (error) {
        next(error)
    }
}