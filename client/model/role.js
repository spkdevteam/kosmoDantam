const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.ObjectId

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
                    list: {
                        access: { type: Boolean, default: false },
                        api: { type: String, default: null },
                    },
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
                    softDelete: {
                        access: { type: Boolean, default: false },
                        api: { type: String, default: null },
                    },
                    hardDelete: {
                        access: { type: Boolean, default: false },
                        api: { type: String, default: null },
                    },
                    activeActive: {
                        access: { type: Boolean, default: false },
                        api: { type: String, default: null },
                    },
                }
            },
        ],
        default: [], // Default to an empty array
    },
    createdBy : { type: ObjectId, ref: "clientUsers", default:null, index: true },
    isActive: { type: Number, default: 1 },


    deletedAt: { type: Date, default: null, index: true }, // Index for soft-delete functionality


}, { timestamps: true });



module.exports = clientRoleSchema;
