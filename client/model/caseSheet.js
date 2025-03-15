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
                },
                painValue: { type: Number, default: 0 }
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
    diagnosis: {
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
                            medId: { type: mongoose.Schema.ObjectId, ref: "medicalCase" },
                        },
                    ],
                },
                reading: { type: String, default: null }
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
                finished: { type: Boolean, default: false },
                prposedDate: { type: Date, default: null }
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
                        { procedId: { type: mongoose.Schema.ObjectId, ref: "procedure", default: null } }
                    ],
                    default: []
                },
                prposedTime: { type: Date, default: null },
                finished: { type: Boolean, default: false }
            },
        ],
        default: [],
    },

    treatmentData: { type: String, default: null },
    treatmentData2: {
        type: [
            {
                tooth: { type: String, default: null },
                service: {
                    type: [
                        {
                            service: {
                                serviceName: { type: String },
                            },
                            procedure: {
                                type: [
                                    {
                                        procedureName: { type: String },
                                        finished: { type: Boolean, default: false },
                                        updatedAt: { type: Date, default: null, index: true }
                                    }
                                ]
                            }
                        }
                    ]
                },

                total: { type: Number, default: 0 },
                completed: { type: Number, default: 0 },
            }
        ]

    },
    treatmentData3: {
        type: [
            {
                tooth: { type: String, default: null },
               
                service: {
                    type: [
                        {

                            service: {
                                serviceName: { servId: { type: mongoose.Schema.ObjectId, ref: "services" } },
                                finished: {
                                    type: String,
                                    enum: ['Proposed', 'Opted', 'Cancelled', 'Completed'],
                                    default: 'Proposed',
                                    trim: true,
                                },
                            },
                            department: {
                                deptId: { type: mongoose.Schema.ObjectId, ref: "department" }
                            },
                            rate: { type: Number, default: null },
                            discount: { type: Number, default: null },
                            quaintity: { type: Number, default: null },
                            subTotal: { type: Number, default: null },
                            grantTotal: { type: Number, default: null },
                            prposedDate: { type: Date, default: null },
                            estimateId: { type: String, default: null },
                            opptedOrCompleted: { type: Boolean, default: false },
                            invoiceId: { type: mongoose.Schema.ObjectId, ref: "invoices", default: null },
                            updatedAt: { type: Date, default: null, index: true },
                            procedure: {
                                type: [
                                    {
                                        procedureName: { type: String },
                                        finished: {
                                            type: String,
                                            enum: ['In Progress', 'Proposed', 'Cancelled', 'Completed'],
                                            default: 'Proposed',
                                            trim: true,
                                        },
                                        updatedAt: { type: Date, default: null, index: true }
                                    }
                                ]
                            }
                        }
                    ]
                },
                rowId: { type: String, default: null },
                total: { type: Number, default: 0 },
                completed: { type: Number, default: 0 },
            }
        ]

    },

    otherAttachment: {
        type: [
            {
                file: { type: String, default: null },
                remark: { type: String, default: null },
                tooth: {
                    type: [],
                    default: [],
                },
                service: { servId: { type: mongoose.Schema.ObjectId, ref: "services", default: null } },
                procedure: {
                    type: [
                        { procedId: { type: mongoose.Schema.ObjectId, ref: "procedure", default: null } }
                    ],
                    default: []
                },
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


}, { timestamps: true });


module.exports = caseSheetSchema;



