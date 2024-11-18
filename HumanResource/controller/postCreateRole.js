const createRole = require("../model/services/createNewRole");
const sanitizeBody = require("../utils/sanitizeBody");

const postCreateRole = async (req, res) => {
    try {
        const data = await sanitizeBody(req.body); 
        const result = await createRole(data)
        res.status(200).json({ ...result });
    } catch (error) {
        
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = postCreateRole;
