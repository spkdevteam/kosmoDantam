const mongoose = require('mongoose');

const procedureSchema = new mongoose.Schema({
  deptId: {type: String,  required: true  },
  services: {type: [String],  required: true, },
  procedureName: {type: String,  required: true  },
  procedureId: {type: String,  default: null  },
  description: {type: String,  required: true  },
  branchId: {type: String,  required: true  },
  deleted:{type:Boolean,default:false},
  isActive:{type:Boolean,default:true},
}, { timestamps: true });

 

//const Procedure = mongoose.model('Procedure', procedureSchema);

module.exports = procedureSchema;
