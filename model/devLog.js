const { default: mongoose } = require("mongoose");

const devLogSchema = new mongoose.Schema({
    errorBody: {
        type: [mongoose.Schema.Types.Mixed], // allows array of any type
        default: null
    }
}, { timestamps: true });

module.exports = devLogSchema