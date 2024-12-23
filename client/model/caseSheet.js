const mongoose = require('mongoose');
const { finished } = require('nodemailer/lib/xoauth2');

const caseSheetSchema = new mongoose.Schema({
    displayId: { type: String, unique: true, required: true },
    patientId: { type: mongoose.Schema.ObjectId, ref: 'patient', required: true },
    branchId: { type: mongoose.Schema.ObjectId, ref: 'branch', required: true },
    buId: { type: mongoose.Schema.ObjectId, ref: "businessUnit", default: null, index: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "clientUsers", default: null, index: true },

    cheifComplaints: {
        type: [
            {
                tooth: {
                    type: [],
                    default: [],
                },
                complaints: {
                    type: [
                        {
                            compId: { type: mongoose.Schema.ObjectId, ref: "complaint" }
                        }
                        //   { type: mongoose.Schema.ObjectId, ref: "complaint" }

                    ]
                }
            },
        ],
        default: [],
    },
    clinicalFindings: {
        type: [
            {
                tooth: {
                    type: [],
                    default: [],
                },
                findings: {
                    type: [
                        {
                            findId: { type: mongoose.Schema.ObjectId, ref: "patientFinding" }
                        }
                    ]
                }
            },
        ],
        default: [],
    },
    medicalHistory: {
        type: [
            {
                medicals: {
                    type: [
                        {
                            medId: { type: mongoose.Schema.ObjectId, ref: "medicalCase" }
                        }
                    ],

                }

            }
        ],
        default: [],
    },
    investigation: {
        type: [
            {
                file: { type: String, default: null },
                fileType: { type: String, default: null },
                remark: { type: String, default: null },
            },
        ],
        default: [],
    },
    services: {
        type: [
            {
                tooth: {
                    type: [],
                    default: [],
                },
                department: {
                    deptId: { type: mongoose.Schema.ObjectId, ref: "department" }
                },
                service: {
                    servId: { type: mongoose.Schema.ObjectId, ref: "services" }
                },
                rate: { type: Number, default: null },
                quaintity: { type: Number, default: null },
                subTotal: { type: Number, default: null },
                discount: { type: Number, default: null },
                grantTotal: { type: Number, default: null },
            }

        ],
        default: []

    },
    procedures: {
        type: [
            {
                tooth: {
                    type: [],
                    default: [],
                },
                service: { servId: { type: mongoose.Schema.ObjectId, ref: "services" } },
                procedure: {
                    type: [
                        { procedId: { type: mongoose.Schema.ObjectId, ref: "procedure" } }
                    ]
                },
                finished: { type: Boolean, default: false }
            },
        ],
        default: [],
    },
    otherAttachment: {
        type: [
            {
                file: { type: String, default: null },
                remark: { type: String, default: null },
            },
        ],
        default: [],
    },

    note: {
        type: [
            {
                noteDescription: { type: String, default: null },
            },
        ],
        default: [],
    },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
    drafted: { type: Boolean, default: true },
    status: {
        type: String,
        enum: ['In Progress', 'Cancelled', 'Completed', 'Proposed'],
        default: 'Proposed',
        trim: true,
    },


});


module.exports = caseSheetSchema;
