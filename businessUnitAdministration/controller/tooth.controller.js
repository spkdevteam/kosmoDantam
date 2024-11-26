const getAllTooths = require("../services/tooth.service")

exports.getAllTooths = async (req,res,next)=>{
    try {
        console.log('got the request')
        const result = await getAllTooths()
        res.status(result.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}