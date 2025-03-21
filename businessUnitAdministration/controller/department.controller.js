const httpStatusCode = require("../../utils/http-status-code")
const message = require("../../utils/message")
const sanitizeBody = require("../../utils/sanitizeBody")
const {
    createDepartment,
    deleteDepartment,
    getallDepartments,
    toggleDepartment,
    editDepartment,
    revokeDeleteDepartment,
    allDepartmentsByPage,
    list,
    activeInactive,
    deleteDept,
    getDeptById
} = require("../services/department.service")


exports.createDepartment = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        console.log('data')
        const result = await createDepartment(data)
        res.status(result.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
}

exports.deleteDepartment = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        console.log(req.query, data)
        const result = await deleteDepartment(data)
        res.status(result.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
}



exports.editDepartment = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        if (!data.deptId) res.json({ status: false, message: message.lblCredentialMissing })
        const result = await editDepartment(data)
        res.status(result.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
}

exports.getAllActiveDepartment = async (req, res, next) => {

    try {
        const data = await sanitizeBody(req.query)
        const result = await getallDepartments(data)
        res.status(result.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
}

exports.toggleDepartments = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        const result = await toggleDepartment(data)
        res.status(result?.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
}

exports.revokeDepartment = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        const result = await revokeDeleteDepartment(data)
        res.status(result.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
}
exports.getallDepartmentsByPage = async (req, res, next) => {

    try {
        const data = await sanitizeBody(req.query)
        const result = await allDepartmentsByPage(data)
        res.status(result.statusCode || 200).json(result)
    } catch (error) {
        next(error);
    }
}

exports.putToggleDepartmentsWithPage = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        const result = await toggleDepartment(data)
        const fetchResult = await allDepartmentsByPage(data)
        fetchResult.message = result.message
        res.status(fetchResult?.statusCode || 200).json(fetchResult)
    } catch (error) {
        next(error);
    }
}


exports.listDepartment = async (req, res, next) => {
    try {
        const { clientId, keyword = '', page = 1, perPage = 10, branchId } = req.query;
        if (!clientId) {
            return res.status(httpStatusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        const filters = {
            deletedAt: null,

            ...(keyword && {
                $or: [
                    { deptName: { $regex: keyword.trim(), $options: "i" } },
                    { description: { $regex: keyword.trim(), $options: "i" } },
                ],
            }),
        }
        branchId?.length ? filters.branchId = branchId : '';
        const result = await list(clientId, filters, { page, limit: perPage });
        return res.status(httpStatusCode.OK).send({
            message: message.lblDepartFound,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


exports.activeinactiveDepartment = async (req, res, next) => {
    try {
        const { status, departmentId, clientId } = req.body;
        if (!clientId || !departmentId) {
            return res.status(400).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const updated = await activeInactive(clientId, departmentId, {
            isActive: status === "1",
        });
        return res.status(httpStatusCode.OK).send({
            message: message.lblDpartmentModified,
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};


exports.getDepartmentById = async (req, res, next) => {

    try {
        const { departmentId, clientId } = req.body;
        const result = await getDeptById({ clientId, departmentId })
        res.json({ result })
    } catch (error) {
        next(error);
    }
}




exports.softDeleteDepartment = async (req, res, next) => {

    try {

        const { keyword, page, perPage, departmentId, clientId } = req.body;

        console.log("clientId", req.body);


        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        req.query.clientId = clientId;


        // Validate inputs
        if (!clientId || !departmentId) {
            return res.status(400).send({
                message: message.lblRequiredFieldMissing,
            });
        }

        await deleteDept(clientId, departmentId, softDelete = true)

        this.listDepartment(req, res, next);


    } catch (error) {
        next(error);
    }
};