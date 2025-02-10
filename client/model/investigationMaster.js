const mongoose = require("mongoose");

const investigationMasterSchema = new mongoose.Schema({
  investigationName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

const InvestigationMaster = mongoose.model("investigationMaster", investigationMasterSchema);

module.exports = InvestigationMaster;
