const mongoose = require("mongoose");

// const ObjectId = mongoose.Schema.ObjectId


const roleSchema = new mongoose.Schema({
    id : {type : Number},
    name : {type : String,unique:true},
    capability : {type : [], default :  []},
    isActive :{type : Number, default : 1},
    reportingHead:{type : String, default :  null},
    roleId:{type : String,unique:true},
},{timestamps:true});



const roleModel = mongoose.model("role", roleSchema);


module.exports = roleModel;