
const createMenu = require("../model/services/createMenu")
const sanitizeBody = require("../utils/sanitizeBody")
const postCreateMenu = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body) 
        const result = await createMenu(data)
        res.json(result)
    } catch (error) {
        res.json({ status: false, message: error.errmsg })
    }
}

module.exports = postCreateMenu