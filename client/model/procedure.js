const mongoose = require('mongoose');

const procedureSchema = new mongoose.Schema({
  deptId: {type: mongoose.Schema.ObjectId,ref:'department',  required: true  },
  services: {type: [{type: mongoose.Schema.ObjectId,ref:'services',  required: true  }] },
  procedureName: {type: String,  required: true  },
  displayId: {type: String,  default: null  },
  buId:{ type: mongoose.Schema.ObjectId, ref: "businessUnit", default:null, index: true  },
  description: {type: String,  required: true  },
  branchId: {type: mongoose.Schema.ObjectId,ref:'branch',  required: true,index:true  },
  deletedAt: { type: Date, default: null, index: true }, // Index for soft-delete functionality
  isActive:{type:Boolean,default:true},
}, { timestamps: true });

 

//const Procedure = mongoose.model('Procedure', procedureSchema);

module.exports = procedureSchema;
