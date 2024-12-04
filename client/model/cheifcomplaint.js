
const mongoose = require('mongoose')
const cheifComplaintSchema = mongoose.Schema({
    displayId:{type:String,unique:true},
    complaintName:{type:String},
    discription:{type:String},
    buId:{ type: mongoose.Schema.ObjectId, ref: "businessUnit", default:null, index: true  },
    isActive:{type:Boolean,default:true},
    deletedAt:{type:Date,default:null},
    createdBy: { type: mongoose.Schema.ObjectId, ref: "clientUsers", default:null, index: true },
})

module.exports = cheifComplaintSchema