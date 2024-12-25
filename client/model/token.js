const mongoose = require('mongoose')
const tokenSchema = new mongoose.Schema({
    tokenDate: { type: Date, required: true},
    tokenNumber: { type: Number, default: 0 },
    branchId: { type: mongoose.Schema.ObjectId, ref: "branch", index: true },
    buId: { type: mongoose.Schema.ObjectId, ref: "businessUnit", default: null, index: true }
});

module.exports = tokenSchema