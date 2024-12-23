const mongoose = require('mongoose')

const patientFindingsSchema = mongoose.Schema({
    findingsName: { type: String, unique: true },
    discription: { type: String },
    deletedAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "clientUsers", default: null, index: true },

})
module.exports = patientFindingsSchema

