const sanitizeBody = require("../../utils/sanitizeBody")
const {
    createProcedure,
    deleteProcedure,
    toggleProcedure,
    revokeDeletedProcedure,
    editProcedure,
    getAllProcedures,
    procedureUnderService,
    getAllProceduresByPage } = require("../services/procedure.service")

exports.createProcedure = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body)
        const result = await createProcedure(data)
        res.status(result?.statusCode || 200).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message, statusCode: 500 })
    }
}


exports.editProcedure = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body)
        const result = await editProcedure(data)
        res.status(result?.statusCode || 200).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message, statusCode: 500 })
    }
}

exports.deleteProcedure = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body)
        const result = await deleteProcedure(data)
        res.status(result?.statusCode || 200).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message, statusCode: 500 })
    }
}

exports.revokeProcedure = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body)
        const result = await revokeDeletedProcedure(data)
        res.status(result?.statusCode || 200).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message, statusCode: 500 })
    }
}

exports.toggleProcedure = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body)
        const result = await toggleProcedure(data)
        res.status(result?.statusCode || 200).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message, statusCode: 500 })
    }
}
exports.getAllProcedures = async (req, res) => {
    try {
        const data = await sanitizeBody(req.query)

        const result = await getAllProcedures(data)
        res.status(result?.statusCode || 200).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message, statusCode: 500 })
    }
}

exports.getProcedureUnderService = async (req, res) => {
    try {
        const data = await sanitizeBody(req.query)

        const result = await procedureUnderService(data)
        res.status(result?.statusCode || 200).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message, statusCode: 500 })
    }
}

exports.getAllProceduresByPage = async (req, res) => {
    try {
        const data = await sanitizeBody(req.query)
        const result = await getAllProceduresByPage(data)
        res.status(result?.statusCode || 200).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message, statusCode: 500 })
    }
}


