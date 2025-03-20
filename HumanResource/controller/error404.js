const error404 =(req,res)=>{
    res.json({status:false,message:'not a valid api'})
}

module.exports  = error404