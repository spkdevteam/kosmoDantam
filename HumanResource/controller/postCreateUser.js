const createUser = require("../model/services/createUser")
const sanitizeBody = require("../utils/sanitizeBody")

const postCreateUser =async  (req,res)=>{
    try {
        const data = await sanitizeBody(req.body)
        console.log(data) 
       const result = await createUser(data) 
        res.json( result)

    } catch (error) {
        res.json({status:false,message:error.message})
    }
}
module.exports = postCreateUser