const { default: mongoose } = require("mongoose");

const departmentSchema = mongoose.Schema({
    deptName : {type:String,unique:true},
    deptId : {type:String,unique:true},
    branchId : { type: mongoose.Schema.ObjectId, ref: "branch", index: true }, 
    description:{type:String,unique:true} ,
    deleted:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true},
})

module.exports  = departmentSchema