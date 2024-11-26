
const mongoose = require('mongoose')
const investigationSchema = mongoose.Schema({
    investigationId:{type:String,unique:true},
    investigationName:{type:String},
    discription:{type:String},
    isActive:{type:Boolean,default:true},
    deletedAt:{type:Date,default:null},
    createdBy: { type: mongoose.Schema.ObjectId, ref: "clientUsers", default:null, index: true }, // Index for admin/user relationships
})

module.exports = investigationSchema