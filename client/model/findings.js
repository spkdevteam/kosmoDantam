const mongoose = require('mongoose')

const findingsSchema = mongoose.Schema({
    findingsId:{type:String,unique:true},
    findingsName:{type:String,unique:true},
    discription:{type:String},
    buId:{ type: mongoose.Schema.ObjectId, ref: "businessUnit", default:null, index: true  },
    deletedAt:{type:Date,default:null},
    isActive:{type:Boolean,default:true}
})
module.exports = findingsSchema

