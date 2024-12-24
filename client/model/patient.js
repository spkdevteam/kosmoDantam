const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const clinetPatientSchema = new Schema(
    {
        displayId: { type: String, unique: true },
        branch: { type: ObjectId, ref: "branch", default: null, index: true },
        businessUnit: { type: ObjectId, ref: "businessUnit", default: null, index: true },
        mainPatientLinkedid: { type: ObjectId, ref: "clientUsers", default: null, index: true },
        isChainedWithMainPatient: { type: Boolean, default: false },
        relation: { type: String, default: null },
        firstName: { type: String, required: true },
        lastName: { type: String },
        profileImage: { type: String, default: null },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        phone: {
            type: String,
            trim: true,
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
            default: 'Prefer not to say',
            trim: true,
        },
        age: {
            type: Number,
            trim: true,
            default: null
        },
        bloodGroup: {
            type: String,
            trim: true,
            default: null
        },
        patientGroup: {
            type: String,
            trim: true,
            default: null
        },
        referedBy: {
            type: String,
            trim: true,
            default: null
        },
        city: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
        ZipCode: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        isActive: { type: Boolean, default: true },

        medicalHistory: {
            type: [
                {
                    name: { type: String, default: null },
                    note: { type: String, default: null },
                    positive: { type: Boolean, default: false },
                    negative: { type: Boolean, default: false },
                    unknown: { type: Boolean, default: false },
                }
            ]
        },


        // caseSheets : [{ type :  ObjectId}]

        // handlign created by
        createdBy: { type: ObjectId, ref: "clientUsers", index: true },
        deletedAt: { type: Date, default: null, index: true },
    },
    { timestamps: true }
);



module.exports = clinetPatientSchema;
