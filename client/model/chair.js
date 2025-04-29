const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const clinetChairSchema = new Schema(
    {
        branch: { type: ObjectId, ref: "branch", default:null, index: true }, // Index for admin/user relationships
        businessUnit: { type: ObjectId, ref: "businessUnit", default:null, index: true }, 

        chairLocation: { type: String, required: true, index: true },
        chairNumber:  { type: String, index: true },

        isActive: { type: Boolean, default: false },
        status: { type: String, enum: ['Ready', 'InProgress'], default:'Ready'},
        activePatientId: { type: ObjectId, ref: "patient", default:null, index: true},
        activeAppointmentId: { type: ObjectId, ref: "appointments", default:null, index: true},
       
        createdBy: { type: ObjectId, ref: "clientUsers", default:null, index: true }, // Index for admin/user relationships
        updatedBy: { type: ObjectId, ref: "clientUsers", default:null, index: true }, // Index for admin/user relationships
        deletedBy: { type: ObjectId, ref: "clientUsers", default:null, index: true }, // Index for admin/user relationships

        deletedAt: { type: Date, default: null, index: true }, // Index for soft-delete functionality
    },
    
    { timestamps: true }
);

module.exports = clinetChairSchema;
