
const mongoose = require('mongoose')
const complaintSchema = mongoose.Schema({
    complaintName:{type:String},
    discription:{type:String},
    isActive:{type:Boolean,default:true},
    deletedAt:{type:Date,default:null},
    createdBy: { type: mongoose.Schema.ObjectId, ref: "clientUsers", default:null, index: true },
})

module.exports = complaintSchema