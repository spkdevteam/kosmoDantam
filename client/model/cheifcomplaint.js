
const mongoose = require('mongoose')
const cheifComplaintSchema = mongoose.Schema({
    complaintId:{type:String,unique:true},
    complaintName:{type:String},
    discription:{type:String},
    isActive:{type:Boolean,default:true},
    deletedAt:{type:Date,default:null},
    createdBy: { type: mongoose.Schema.ObjectId, ref: "clientUsers", default:null, index: true }, // Index for admin/user relationships
})

module.exports = cheifComplaintSchema