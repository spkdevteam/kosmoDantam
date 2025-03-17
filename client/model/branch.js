const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const clinetBranchSchema = new Schema(
    {

        displayId : {type:String,unique:true},
        businessUnit: { type: ObjectId, ref: "businessUnit", default:null, index: true }, 
        branchHead: { type: ObjectId, ref: "clientUsers", default:null, index: true }, 
        bookingContact: { type: String, trim: true, validate: {
                validator: function (v) {
                    return /^\+?[1-9]\d{1,14}$/.test(v);
                },
                message: 'Invalid phone number format.',
            },
            default:'7907441232'
        },
        name: { type: String, required: true },
        incorporationName: { type: String, required: true },
        cinNumber:  { type: String },
        gstNumber:  { type: String },
        branchPrefix:  { type: String },
        branchId:{type:String},
        branchLogo : {type: String, default : null},
        emailContact: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
            trim: true,
            sparse: true,
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
                },
                message: 'Invalid email format.',
            },
        },

        contactNumber: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^\+?[1-9]\d{1,14}$/.test(v);
                },
                message: 'Invalid phone number format.',
            },
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

        isActive: { type: Boolean, default: false },

        // handlign created by
        createdBy: { type: ObjectId, ref: "clientUsers", default:null, index: true }, // Index for admin/user relationships

        deletedAt: { type: Date, default: null, index: true }, // Index for soft-delete functionality
    },
    
    { timestamps: true }
);

module.exports = clinetBranchSchema;
