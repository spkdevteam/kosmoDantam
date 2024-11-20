const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceId: { type: String, unique: true, required: true },
    department: { type: String, required: true },
    procedures: { type: [String], default: [] },  
    serviceName: { type: String, unique: true, required: true },
    branchId :  { type: String },
    description: { type: String },
    price:{ type: Number,default:0.00 },
    deleted:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true},
});
 
serviceSchema.index({ serviceId: 1, serviceName: 1 }, { unique: true });

const serviceModel = mongoose.model('service', serviceSchema);

module.exports = serviceSchema;
