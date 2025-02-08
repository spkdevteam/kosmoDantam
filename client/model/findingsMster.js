const mongoose = require("mongoose");

const findingMasterSchema = new mongoose.Schema({
  findingName: {
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

const FindingMaster = mongoose.model("findingMaster", findingMasterSchema);

module.exports = FindingMaster;
