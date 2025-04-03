const mongoose = require('mongoose');

const procedureSchema = new mongoose.Schema({
  deptId: { type: mongoose.Schema.ObjectId, ref: 'department', },
  services: { type: [{ type: mongoose.Schema.ObjectId, ref: 'services', }] },
  procedureName: { type: String, required: true },
  displayId: { type: String, default: null },
  buId: { type: mongoose.Schema.ObjectId, ref: "businessUnit", default: null, },
  description: { type: String, },
  old_Id: { type: String },
  branchId: { type: mongoose.Schema.ObjectId, ref: 'branch', index: true },
  deletedAt: { type: Date, default: null, index: true }, // Index for soft-delete functionality
  isActive: { type: Boolean, default: true },

  createdBy: { type: mongoose.Types.ObjectId, ref: "clientUsers", default: null, index: true }, // Index for admin/user relationships
  updatedBy: { type: mongoose.Types.ObjectId, ref: "clientUsers", default: null, index: true }, // Index for admin/user relationships
  deletedBy: { type: mongoose.Types.ObjectId, ref: "clientUsers", default: null, index: true }, // Index for admin/user relationships
}, { timestamps: true });



//const Procedure = mongoose.model('Procedure', procedureSchema);

module.exports = procedureSchema;
