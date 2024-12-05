const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const prescriptionSchema = new Schema(
    {

        displayId: { type: String, unique: true, required: true },
        branchId: { type: mongoose.Schema.ObjectId, ref: 'branch', required: true },
        buId: { type: mongoose.Schema.ObjectId, ref: "businessUnit", default: null, index: true },
        patientId: { type: mongoose.Schema.ObjectId, ref: 'patient', required: true },
        doctorId: { type: mongoose.Schema.ObjectId, ref: 'clientUsers', required: true },
        caseSheetId: { type: mongoose.Schema.ObjectId, ref: 'caseSheet', required: true },

        drugArray: {
            type: [
                {
                    drug: { type: String, required: true, index: true },
                    dosage: { type: String, index: true },
                    frequesncy: { type: String, index: true },
                    duration: { type: String, index: true },
                    note: { type: String, index: true },
                }
            ],
            default: []
        },
        additionalAdvice: { type: String, default : null},

        // handlign created by
        createdBy: { type: ObjectId, ref: "clientUsers", default: null, index: true }, // Index for admin/user relationships
        deletedAt: { type: Date, default: null, index: true }, // Index for soft-delete functionality
    },

    { timestamps: true }
);

module.exports = prescriptionSchema;
