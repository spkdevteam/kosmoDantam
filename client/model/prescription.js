const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const prescriptionSchema = new Schema(
    {

        displayId: { type: String, unique: true },
        branchId: { type: mongoose.Schema.ObjectId, ref: 'branch', required: true },
        buId: { type: mongoose.Schema.ObjectId, ref: "businessUnit", default: null, index: true },
        patientId: { type: mongoose.Schema.ObjectId, ref: 'patient', required: true },
        doctorId: { type: mongoose.Schema.ObjectId, ref: 'clientUsers', required: true },
        caseSheetId: { type: mongoose.Schema.ObjectId, ref: 'casesheets'},
        drugArray: {
            type: [
                {
                    drugName: { type: String, required: true, index: true },
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
        createdBy: { type:  mongoose.Schema.ObjectId, ref: "clientUsers", default: null, index: true },  
        deletedAt: { type: Date, default: null, index: true }, 
        createdAt:{ type: Date, default: null, index: true }, 
        nextVisitDate : { type: Date, default: null, index: true }, 
        nextVisitDiscription:{ type: String, default : null},
    },

    { timestamps: true }
);

module.exports = prescriptionSchema;
