const sanitizeBody = require("../../utils/sanitizeBody")
const { createProcedure,deleteProcedure } = require("../services/procedure.service")

exports.createProcedure = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body)
        const result =await createProcedure(data)
        res.json(result)
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}


exports.editProcedure = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body)
        const result =await createProcedure(data)
        res.json(result)
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

exports.deleteProcedure = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body)
        const result =await deleteProcedure(data)
        res.json(result)
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}


