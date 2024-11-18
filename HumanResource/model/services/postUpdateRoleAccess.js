const sanitizeBody = require("../../utils/sanitizeBody");
const updateUserRole = require("./updateUserRole");

const postUpdateRoleAccess =async (req,res)=>{
    try {
        const data = await sanitizeBody(req.body); 
        const result = await updateUserRole(data)
        res.status(200).json({ ...result });
    } catch (error) {
        res.status(500).json({ status:false,message: 'An error occurred', error: error.message });
    }
}

module.exports = postUpdateRoleAccess