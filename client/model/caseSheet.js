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
                finished: { type: Boolean, default: false }
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

                total : {type : Number, default: 0},
                completed : {type : Number, default: 0},
            }
        ]

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





const arra = [
    {
        tooth: "12",
        service: [
            {
                service: "Service One",
                procedure: [
                    {
                        procedureName: "procedure 1",
                        finished: true,
                        updatedAt: 12/12/24
                    },
                    {
                        procedureName: "procedure 2",
                        finished: true,
                        updatedAt: 12/12/24
                    }
                ]
            },
            {
                service: "Service two",
                procedure: [
                    {
                        procedureName: "procedure 1",
                        finished: false,
                        updatedAt: 12/12/24
                    },
                    {
                        procedureName: "procedure 1",
                        finished: true,
                        updatedAt: 12/12/24
                    }
                ]
            }
        ],
        total : 4,
        completed : 3,
    },
    {
        tooth: "31",
        service: [
            {
                service: "Service five",
                procedure: [
                    {
                        procedureName: "procedure 8",
                        finished: false,
                        updatedAt: 12/12/24
                    },
                    {
                        procedureName: "procedure 7",
                        finished: true,
                        updatedAt: 12/12/24
                    },
                    {
                        procedureName: "procedure 7",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 9",
                        finished: false,
                        updatedAt: 12/12/24
                    }
                ]
            },
            {
                service: "Service nine",
                procedure: [
                    {
                        procedureName: "procedure 12",
                        finished: false,
                        updatedAt: 12/12/24
                    },
                    {
                        procedureName: "procedure 10",
                        finished: true,
                        updatedAt: 12/12/24
                    }
                ]
            },
            {
                service: "Service six",
                procedure: [
                    {
                        procedureName: "procedure 67",
                        finished: false,
                        updatedAt: 12/12/24
                    },
                    {
                        procedureName: "procedure 199",
                        finished: true,
                        updatedAt: 12/12/24
                    },
                    {
                        procedureName: "procedure 97",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 299",
                        finished: false,
                        updatedAt: null
                    }
                ]
            },
            
        ],
        total : 10,
        completed : 3,
    },
    {
        tooth: "11",
        service: [
            {
                service: "Service seven",
                procedure: [
                    {
                        procedureName: "procedure 11",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 21",
                        finished: false,
                        updatedAt: null
                    }
                ]
            },
            {
                service: "Service sixteen",
                procedure: [
                    {
                        procedureName: "procedure 13",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 41",
                        finished: false,
                        updatedAt: null
                    }
                ]
            }
        ],
        total : 6,
        completed : 0,
    },
]





const arra2 = [
    {
        tooth: "12",
        service: [
            {
                service: "Service One",
                procedure: [
                    {
                        procedureName: "procedure 1",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 2",
                        finished: false,
                        updatedAt: null
                    }
                ]
            },
            {
                service: "Service two",
                procedure: [
                    {
                        procedureName: "procedure 1",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 1",
                        finished: false,
                        updatedAt: null
                    }
                ]
            }
        ],
        total : 4,
        completed : 0,
    },
    {
        tooth: "31",
        service: [
            {
                service: "Service five",
                procedure: [
                    {
                        procedureName: "procedure 8",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 7",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 7",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 9",
                        finished: false,
                        updatedAt: null
                    }
                ]
            },
            {
                service: "Service nine",
                procedure: [
                    {
                        procedureName: "procedure 12",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 10",
                        finished: false,
                        updatedAt: null
                    }
                ]
            },
            {
                service: "Service six",
                procedure: [
                    {
                        procedureName: "procedure 67",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 199",
                        finished: false,
                        updatedAt: null
                    }
                ]
            },
            {
                service: "Service six",
                procedure: [
                    {
                        procedureName: "procedure 97",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 299",
                        finished: false,
                        updatedAt: null
                    }
                ]
            }

        ],
        total : 10,
        completed : 0,
    },
    {
        tooth: "11",
        service: [
            {
                service: "Service seven",
                procedure: [
                    {
                        procedureName: "procedure 11",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 21",
                        finished: false,
                        updatedAt: null
                    }
                ]
            },
            {
                service: "Service sixteen",
                procedure: [
                    {
                        procedureName: "procedure 13",
                        finished: false,
                        updatedAt: null
                    },
                    {
                        procedureName: "procedure 41",
                        finished: false,
                        updatedAt: null
                    }
                ]
            }
        ],
        total : 4,
        completed : 0,
    },
]




const newData = [
    {
        "tooth": "31",
        "service": [
            {
                "service": { "serviceName": "dept1 ser1" },
                "procedure": [
                    { "procedureName": "procedure 1" },
                    { "procedureName": "procedure 2" }
                ]
            }
        ]
    },
    {
        "tooth": "11",
        "service": [
            {
                "service": { "serviceName": "dept1 ser1" },
                "procedure": [
                    { "procedureName": "procedure 1" },
                    { "procedureName": "procedure 2" },
                    { "procedureName": "procedure 3" }
                ]
            }
        ]
    },
    {
        "tooth": "12",
        "service": [
            {
                "service": { "serviceName": "dep1 ser2" },
                "procedure": [
                    { "procedureName": "procedure 2" }
                ]
            }
        ]
    },
    {
        "tooth": "30",
        "service": [
            {
                "service": { "serviceName": "dep1 ser2" },
                "procedure": [
                    { "procedureName": "procedure 2" }
                ]
            }
        ]
    }
]
