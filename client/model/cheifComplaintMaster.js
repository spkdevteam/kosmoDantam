const mongoose = require("mongoose");

const complaintComplaintSchema = new mongoose.Schema({
  complaintName: {
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

const CheifComplaintMaster = mongoose.model("cheifComplaintMaster", complaintComplaintSchema);

module.exports = CheifComplaintMaster;
