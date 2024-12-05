
const mongoose = require('mongoose')
const workShiftSchemaa = mongoose.Schema({
displayId:{type:String,unique:true},
startTime:{type:String },
endTime:{type:String},
isActive:{type:Boolean,default:false},
deletedAt:{type:Date,default:null},
})

const workShift = mongoose.model('workShift',workShiftSchemaa)