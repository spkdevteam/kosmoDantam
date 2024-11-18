const mongoose = require("mongoose");

// const ObjectId = mongoose.Schema.ObjectId


const clientRoleSchema = new mongoose.Schema({

    id: { type: Number },
    name: { type: String, trim: true, require: true },
    capability: {
        type: [
            {
                name: { type: String, required: true }, // Capability name
                displayName: { type: String, default: null },
                access: { type: Boolean, default: false },
                subMenus: {
                    create: {
                        access: { type: Boolean, default: false },
                        api: { type: String, default: null },
                    },
                    view: {
                        access: { type: Boolean, default: false },
                        api: { type: String, default: null },
                    },
                    update: {
                        access: { type: Boolean, default: false },
                        api: { type: String, default: null },
                    },
                    delete: {
                        access: { type: Boolean, default: false },
                        api: { type: String, default: null },
                    },
                }
            },
        ],
        default: [], // Default to an empty array
    },
    isActive: { type: Number, default: 1 },

}, { timestamps: true });



module.exports = clientRoleSchema;
