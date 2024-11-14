const mongoose = require("mongoose");

// const ObjectId = mongoose.Schema.ObjectId


const clientRoleSchema = new mongoose.Schema({

    id : {type : Number},
    name : {type : String},
    capability : {type : String, default :  null},
    isActive :{type : Number, default : 1}

},{timestamps:true});



module.exports = clientRoleSchema;
