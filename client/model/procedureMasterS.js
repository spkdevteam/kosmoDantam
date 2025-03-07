const mongoose = require("mongoose");

const ProcedureMasterSchema = new mongoose.Schema({
  procedureName: {
    type: String,
    required: true,
    trim: true
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    }
  ]
}, { timestamps: true });

const ProcedureMaster = mongoose.model("procedureMaster", ProcedureMasterSchema);

module.exports = ProcedureMaster;
