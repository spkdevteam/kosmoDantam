const mongoose = require('mongoose')
const tokenSchema = new mongoose.Schema({
    tokenDate: { type: Date, required: true, unique: true },
    tokenNumber: { type: Number, default: 0 },
});

module.export = tokenSchema