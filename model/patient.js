const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    date: Date,
    patientName: String,
}, { timestamps: true });

module.exports = appointmentSchema;
