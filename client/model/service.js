const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    displayId: { type: String, unique: true, required: true },
    departmentId: { type: mongoose.Types.ObjectId, ref: 'department', required: true },
    old_Id: { type: String, },
    procedures: { type: [String], default: [] },
    serviceName: { type: String, required: true },
    branchId: { type: mongoose.Types.ObjectId, ref: 'branch' },
    description: { type: String },
    buId: { type: mongoose.Schema.ObjectId, ref: "businessUnit", default: null, index: true },
    //price: { type: Number, default: 0.00 },

    createdBy: { type: mongoose.Types.ObjectId, ref: "clientUsers", default: null, index: true }, // Index for admin/user relationships
    updatedBy: { type: mongoose.Types.ObjectId, ref: "clientUsers", default: null, index: true }, // Index for admin/user relationships
    deletedBy: { type: mongoose.Types.ObjectId, ref: "clientUsers", default: null, index: true }, // Index for admin/user relationships

    deletedAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// serviceSchema.index({ serviceId: 1, serviceName: 1 }, { unique: true });

const serviceModel = mongoose.model('service', serviceSchema);

module.exports = serviceSchema;
