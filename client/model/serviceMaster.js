const mongoose = require("mongoose");

const serviceMasterSchema = new mongoose.Schema({
  displayId: {
    type:String,
      
  },
  serviceName: {
    type: String,
    required: true,
    trim: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  }
}, { timestamps: true });

const ServiceMaster = mongoose.model("serviceMaster", serviceMasterSchema);

module.exports = ServiceMaster;
