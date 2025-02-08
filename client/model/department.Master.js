const mongoose = require("mongoose");

const departmentMasterSchema = new mongoose.Schema({
    investigationName: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });  

const departmentMaster = mongoose.model("departmentMaster", departmentMasterSchema);

module.exports = departmentMaster
