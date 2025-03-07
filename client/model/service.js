const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    displayId: { type: String, unique: true, required: true },
    departmentId: {type: mongoose.Schema.ObjectId,ref:'department',  required: true  },
    old_Id: {type: String,     },
    procedures: { type: [String], default: [] },  
    serviceName: { type: String,  required: true },
    branchId :  { type: mongoose.Schema.ObjectId,ref:'branch' },
    description: { type: String },
    buId:{ type: mongoose.Schema.ObjectId, ref: "businessUnit", default:null, index: true  },
    price:{ type: Number,default:0.00 },
    deletedAt:{type:Date,default:null},
    isActive:{type:Boolean,default:true},
});
 
// serviceSchema.index({ serviceId: 1, serviceName: 1 }, { unique: true });

const serviceModel = mongoose.model('service', serviceSchema);

module.exports = serviceSchema;
