
const mongoose = require('mongoose')
const investigationSchema = mongoose.Schema({
    displayId:{type:String},
    investigationName:{type:String},
    discription:{type:String},
    isActive:{type:Boolean,default:true},
    buId:{ type: mongoose.Schema.ObjectId, ref: "businessUnit", default:null, index: true  },
    deletedAt:{type:Date,default:null},
    createdBy: { type: mongoose.Schema.ObjectId, ref: "clientUsers", default:null, index: true }, // Index for admin/user relationships
})

module.exports = investigationSchema