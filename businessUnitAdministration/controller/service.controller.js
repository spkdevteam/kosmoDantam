const sanitizeBody = require("../../utils/sanitizeBody")
const { createService } = require("../services/services.service")

exports.createSerices = async (req,res)=>{
    try {
        const data = await sanitizeBody(req.body)
        const result = await createService(data)
        
        console.log(result)
        

    } catch (error) {
        
    }
    res.json( req.body )
}