const { default: mongoose } = require("mongoose");

const activityLogSchema = new mongoose.Schema({
    patientId: { type: mongoose.Types.ObjectId, ref: 'patient', default: null, index: true },
    module: { type: String },
    branchId: { type: mongoose.Types.ObjectId, ref: 'branch', default: null, index: true },
    buId: { type: mongoose.Types.ObjectId, ref: 'businessUnit', default: null, index: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'clientUsers', default: null, index: true },
    ipAddress: { type: String },
    sourceLink: { type: String },
    activity: { type: String },
    description: { type: String },
    data: { type: Object, default: {} },
    status: { type: Boolean },
    dateTime: { type: Date, default: new Date() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "clientUsers", default:null, index: true }, 
    updatedBy: { type: mongoose.Types.ObjectId, ref: "clientUsers", default:null, index: true },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "clientUsers", default:null, index: true }, 
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

const ActivityLogModel = mongoose.model("activityLog", activityLogSchema);

module.exports = { ActivityLogModel, activityLogSchema };
