const sanitizeBody = require("../utils/sanitizeBody")

const postLogin = async (req,res)=>{
    try {
        const data = await sanitizeBody(req.body)
        console.log(data)
        res.json(data)
    } catch (error) {
        
    }
}

module.exports = postLogin