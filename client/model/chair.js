const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const clinetChairSchema = new Schema(
    {


        branch: { type: ObjectId, ref: "branch", default:null, index: true }, // Index for admin/user relationships

        chairLocation: { type: String, required: true },
        chairNumber:  { type: String },

        isActive: { type: Boolean, default: false },

        // handlign created by
        createdBy: { type: ObjectId, ref: "clientUsers", default:null, index: true }, // Index for admin/user relationships

        deletedAt: { type: Date, default: null, index: true }, // Index for soft-delete functionality
    },
    
    { timestamps: true }
);

module.exports = clinetChairSchema;
