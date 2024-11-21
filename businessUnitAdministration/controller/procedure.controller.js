const sanitizeBody = require("../../utils/sanitizeBody")
const { createProcedure,deleteProcedure,toggleProcedure } = require("../services/procedure.service")

exports.createProcedure = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body)
        const result =await createProcedure(data)
        res.status(result?.statusCode || 200 ).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message,statusCode:500 })
    }
}


exports.editProcedure = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body)
        const result =await createProcedure(data)
        res.status(result?.statusCode || 200 ).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message,statusCode:500 })
    }
}

exports.deleteProcedure = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body)
        const result =await deleteProcedure(data)
        res.status(result?.statusCode || 200 ).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message,statusCode:500 })
    }
}

exports.toggleProcedure = async (req,res)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result =await toggleProcedure(data)
        res.status(result?.statusCode || 200 ).json(result)
    } catch (error) {
        res.json({ status: false, message: error.message,statusCode:500 })
    }
}

