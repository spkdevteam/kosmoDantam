


// default permission list
const defaultPersmissionsList = [
    {
        name: "Administration",
        access: false,
        menu: [
            {
                name: "Roles & Permissions",
                displayName: "All Roles & Permissions",
                access: false,
                subMenus: {
                    // list: { id: 1, access: false, api: "/demo/path" },
                    create: { id: 2, access: false, api: "/demo/path" },
                    view: { id: 3, access: false, api: "/demo/path" },
                    update: { id: 4, access: false, api: "/demo/path" },
                    softDelete: { id: 5, access: false, api: "/demo/path" },
                    // bulkCreate: { id: 10001, access: false, api: "/demo/path" }//rahul
                    // hardDelete: { id: 6, access: false, api: "/demo/path" },
                    // activeActive: { id: 7, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Employee",
                displayName: "All Employee",
                access: false,
                subMenus: {
                    // list: { id: 8, access: false, api: "/demo/path" },
                    create: { id: 9, access: false, api: "/demo/path" },
                    view: { id: 10, access: false, api: "/demo/path" },
                    update: { id: 11, access: false, api: "/demo/path" },
                    softDelete: { id: 12, access: false, api: "/demo/path" },
                    bulkCreate: { id: 10002, access: false, api: "/demo/path" }//rahul
                    // hardDelete: { id: 13, access: false, api: "/demo/path" },
                    // activeActive: { id: 14, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Branch",
                displayName: "All Branch",
                access: false,
                subMenus: {
                    // list: { id: 15, access: false, api: "/demo/path" },
                    create: { id: 16, access: false, api: "/demo/path" },
                    view: { id: 17, access: false, api: "/demo/path" },
                    update: { id: 18, access: false, api: "/demo/path" },
                    softDelete: { id: 19, access: false, api: "/demo/path" },
                    bulkCreate: { id: 10003, access: false, api: "/demo/path" }//rahul
                    // hardDelete: { id: 20, access: false, api: "/demo/path" },
                    // activeActive: { id: 21, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Chair",
                displayName: "All Chair",
                access: false,
                subMenus: {
                    // list: { id: 22, access: false, api: "/demo/path" },
                    create: { id: 23, access: false, api: "/demo/path" },
                    view: { id: 24, access: false, api: "/demo/path" },
                    update: { id: 25, access: false, api: "/demo/path" },
                    softDelete: { id: 26, access: false, api: "/demo/path" },
                    bulkCreate: { id: 10004, access: false, api: "/demo/path" }//rahul
                    // hardDelete: { id: 27, access: false, api: "/demo/path" },
                    // activeActive: { id: 28, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Department",
                displayName: "All Department",
                access: false,
                subMenus: {
                    // list: { id: 29, access: false, api: "/demo/path" },
                    create: { id: 30, access: false, api: "/demo/path" },
                    view: { id: 31, access: false, api: "/demo/path" },
                    update: { id: 32, access: false, api: "/demo/path" },
                    softDelete: { id: 33, access: false, api: "/demo/path" },
                    bulkCreate: { id: 10005, access: false, api: "/demo/path" }//rahul
                    // hardDelete: { id: 34, access: false, api: "/demo/path" },
                    // activeActive: { id: 35, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Services",
                displayName: "All Services",
                access: false,
                subMenus: {
                    // list: { id: 36, access: false, api: "/demo/path" },
                    create: { id: 37, access: false, api: "/demo/path" },
                    view: { id: 38, access: false, api: "/demo/path" },
                    update: { id: 39, access: false, api: "/demo/path" },
                    softDelete: { id: 40, access: false, api: "/demo/path" },
                    bulkCreate: { id: 10006, access: false, api: "/demo/path" }//rahul
                    // hardDelete: { id: 41, access: false, api: "/demo/path" },
                    // activeActive: { id: 42, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Procedure",
                displayName: "All Procedure",
                access: false,
                subMenus: {
                    // list: { id: 43, access: false, api: "/demo/path" },
                    create: { id: 44, access: false, api: "/demo/path" },
                    view: { id: 45, access: false, api: "/demo/path" },
                    update: { id: 46, access: false, api: "/demo/path" },
                    softDelete: { id: 47, access: false, api: "/demo/path" },
                    bulkCreate: { id: 10007, access: false, api: "/demo/path" }//rahul
                    // hardDelete: { id: 48, access: false, api: "/demo/path" },
                    // activeActive: { id: 49, access: false, api: "/demo/path" },
                }
            },
        ]
    },
    {
        name: "Patient",
        access: false,
        menu: [
            {
                name: "Patient",
                displayName: "All Patient",
                access: false,
                subMenus: {
                    // list: { id: 50, access: false, api: "/demo/path" },
                    create: { id: 51, access: false, api: "/demo/path" },
                    view: { id: 52, access: false, api: "/demo/path" },
                    update: { id: 53, access: false, api: "/demo/path" },
                    softDelete: { id: 54, access: false, api: "/demo/path" },
                    // hardDelete: { id: 55, access: false, api: "/demo/path" },
                    // activeActive: { id: 56, access: false, api: "/demo/path" },
                }
            },

            {
                name: "Appointment",
                displayName: "All Appointment",
                access: false,
                subMenus: {
                    // list: { id: 57, access: false, api: "/demo/path" },
                    create: { id: 58, access: false, api: "/demo/path" },
                    view: { id: 59, access: false, api: "/demo/path" },
                    update: { id: 60, access: false, api: "/demo/path" },
                    softDelete: { id: 61, access: false, api: "/demo/path" },
                    // hardDelete: { id: 62, access: false, api: "/demo/path" },
                    // activeActive: { id: 63, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Case Sheet",
                displayName: "All Case Sheet",
                access: false,
                subMenus: {
                    // list: { id: 64, access: false, api: "/demo/path" },
                    create: { id: 65, access: false, api: "/demo/path" },
                    view: { id: 66, access: false, api: "/demo/path" },
                    update: { id: 67, access: false, api: "/demo/path" },
                    softDelete: { id: 68, access: false, api: "/demo/path" },
                    // hardDelete: { id: 69, access: false, api: "/demo/path" },
                    // activeActive: { id: 70, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Prescription",
                displayName: "All Prescription",
                access: false,
                subMenus: {
                    // list: { id: 71, access: false, api: "/demo/path" },
                    create: { id: 72, access: false, api: "/demo/path" },
                    view: { id: 73, access: false, api: "/demo/path" },
                    update: { id: 74, access: false, api: "/demo/path" },
                    softDelete: { id: 75, access: false, api: "/demo/path" },
                    // hardDelete: { id: 76, access: false, api: "/demo/path" },
                    // activeActive: { id: 77, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Invoices",
                displayName: "All Invoices",
                access: false,
                subMenus: {
                    // list: { id: 78, access: false, api: "/demo/path" },
                    create: { id: 79, access: false, api: "/demo/path" },
                    view: { id: 80, access: false, api: "/demo/path" },
                    update: { id: 81, access: false, api: "/demo/path" },
                    softDelete: { id: 82, access: false, api: "/demo/path" },
                    // hardDelete: { id: 83, access: false, api: "/demo/path" },
                    // activeActive: { id: 84, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Token",
                displayName: "All Token",
                access: false,
                subMenus: {
                    // list: { id: 85, access: false, api: "/demo/path" },
                    create: { id: 86, access: false, api: "/demo/path" },
                    view: { id: 87, access: false, api: "/demo/path" },
                    update: { id: 88, access: false, api: "/demo/path" },
                    softDelete: { id: 89, access: false, api: "/demo/path" },
                    // hardDelete: { id: 90, access: false, api: "/demo/path" },
                    // activeActive: { id: 91, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Chair Dashboard",
                displayName: "All Chair Dashboard",
                access: false,
                subMenus: {
                    // list: { id: 92, access: false, api: "/demo/path" },
                    create: { id: 93, access: false, api: "/demo/path" },
                    view: { id: 94, access: false, api: "/demo/path" },
                    update: { id: 95, access: false, api: "/demo/path" },
                    softDelete: { id: 96, access: false, api: "/demo/path" },
                    // hardDelete: { id: 97, access: false, api: "/demo/path" },
                    // activeActive: { id: 98, access: false, api: "/demo/path" },
                }
            },
        ]
    },
    {
        name: "Dashboard",
        access: false,
        menu: [
            {
                name: "Admin Dashboard",
                displayName: "All Admin Dashboard",
                access: false,
                subMenus: {
                    // list: { id: 99, access: false, api: "/demo/path" },
                    create: { id: 100, access: false, api: "/demo/path" },
                    view: { id: 101, access: false, api: "/demo/path" },
                    update: { id: 102, access: false, api: "/demo/path" },
                    softDelete: { id: 103, access: false, api: "/demo/path" },
                    // hardDelete: { id: 104, access: false, api: "/demo/path" },
                    // activeActive: { id: 105, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Patient Dashboard",
                displayName: "All Patient Dashboard",
                access: false,
                subMenus: {
                    // list: { id: 106, access: false, api: "/demo/path" },
                    create: { id: 107, access: false, api: "/demo/path" },
                    view: { id: 108, access: false, api: "/demo/path" },
                    update: { id: 109, access: false, api: "/demo/path" },
                    softDelete: { id: 110, access: false, api: "/demo/path" },
                    // hardDelete: { id: 111, access: false, api: "/demo/path" },
                    // activeActive: { id: 112, access: false, api: "/demo/path" },
                }
            },
            {
                name: "Reception Dashboard",
                displayName: "All Reception Dashboard",
                access: false,
                subMenus: {
                    // list: { id: 113, access: false, api: "/demo/path" },
                    create: { id: 114, access: false, api: "/demo/path" },
                    view: { id: 115, access: false, api: "/demo/path" },
                    update: { id: 116, access: false, api: "/demo/path" },
                    softDelete: { id: 117, access: false, api: "/demo/path" },
                    // hardDelete: { id: 118, access: false, api: "/demo/path" },
                    // activeActive: { id: 119, access: false, api: "/demo/path" },
                }
            }
        ]
    }

];


// business Unit Permission list
const businessUnitPersmissionsList = [
    {
        name: "Administration",
        access: true,
        menu: [
            {
                name: "Roles & Permissions",
                displayName: "All Roles & Permissions",
                access: true,
                subMenus: {
                    // list: { id: 1, access: true, api: "/demo/path" },
                    create: { id: 2, access: true, api: "/demo/path" },
                    view: { id: 3, access: true, api: "/demo/path" },
                    update: { id: 4, access: true, api: "/demo/path" },
                    softDelete: { id: 5, access: true, api: "/demo/path" },
                    // hardDelete: { id: 6, access: true, api: "/demo/path" },
                    // activeActive: { id: 7, access: true, api: "/demo/path" },
                }
            },
            {
                name: "Employee",
                displayName: "All Employee",
                access: true,
                subMenus: {
                    // list: { id: 8, access: true, api: "/demo/path" },
                    create: { id: 9, access: true, api: "/demo/path" },
                    view: { id: 10, access: true, api: "/demo/path" },
                    update: { id: 11, access: true, api: "/demo/path" },
                    softDelete: { id: 12, access: true, api: "/demo/path" },
                    // hardDelete: { id: 13, access: true, api: "/demo/path" },
                    // activeActive: { id: 14, access: true, api: "/demo/path" },
                }
            },
            {
                name: "Branch",
                displayName: "All Branch",
                access: true,
                subMenus: {
                    // list: { id: 15, access: true, api: "/demo/path" },
                    create: { id: 16, access: true, api: "/demo/path" },
                    view: { id: 17, access: true, api: "/demo/path" },
                    update: { id: 18, access: true, api: "/demo/path" },
                    softDelete: { id: 19, access: true, api: "/demo/path" },
                    // hardDelete: { id: 20, access: true, api: "/demo/path" },
                    // activeActive: { id: 21, access: true, api: "/demo/path" },
                }
            },
            {
                name: "Chair",
                displayName: "All Chair",
                access: true,
                subMenus: {
                    // list: { id: 22, access: true, api: "/demo/path" },
                    create: { id: 23, access: true, api: "/demo/path" },
                    view: { id: 24, access: true, api: "/demo/path" },
                    update: { id: 25, access: true, api: "/demo/path" },
                    softDelete: { id: 26, access: true, api: "/demo/path" },
                    // hardDelete: { id: 27, access: true, api: "/demo/path" },
                    // activeActive: { id: 28, access: true, api: "/demo/path" },
                }
            },
            {
                name: "Department",
                displayName: "All Department",
                access: true,
                subMenus: {
                    // list: { id: 29, access: true, api: "/demo/path" },
                    create: { id: 30, access: true, api: "/demo/path" },
                    view: { id: 31, access: true, api: "/demo/path" },
                    update: { id: 32, access: true, api: "/demo/path" },
                    softDelete: { id: 33, access: true, api: "/demo/path" },
                    // hardDelete: { id: 34, access: true, api: "/demo/path" },
                    // activeActive: { id: 35, access: true, api: "/demo/path" },
                }
            },
            {
                name: "Services",
                displayName: "All Services",
                access: true,
                subMenus: {
                    // list: { id: 36, access: true, api: "/demo/path" },
                    create: { id: 37, access: true, api: "/demo/path" },
                    view: { id: 38, access: true, api: "/demo/path" },
                    update: { id: 39, access: true, api: "/demo/path" },
                    softDelete: { id: 40, access: true, api: "/demo/path" },
                    // hardDelete: { id: 41, access: true, api: "/demo/path" },
                    // activeActive: { id: 42, access: true, api: "/demo/path" },
                }
            },
            {
                name: "Procedure",
                displayName: "All Procedure",
                access: true,
                subMenus: {
                    // list: { id: 43, access: true, api: "/demo/path" },
                    create: { id: 44, access: true, api: "/demo/path" },
                    view: { id: 45, access: true, api: "/demo/path" },
                    update: { id: 46, access: true, api: "/demo/path" },
                    softDelete: { id: 47, access: true, api: "/demo/path" },
                    // hardDelete: { id: 48, access: true, api: "/demo/path" },
                    // activeActive: { id: 49, access: true, api: "/demo/path" },
                }
            },
        ]
    },
    {
        name: "Patient",
        access: true,
        menu: [
            {
                name: "Patient",
                displayName: "All Patient",
                access: true,
                subMenus: {
                    // list: { id: 50, access: true, api: "/demo/path" },
                    create: { id: 51, access: true, api: "/demo/path" },
                    view: { id: 52, access: true, api: "/demo/path" },
                    update: { id: 53, access: true, api: "/demo/path" },
                    softDelete: { id: 54, access: true, api: "/demo/path" },
                    // hardDelete: { id: 55, access: true, api: "/demo/path" },
                    // activeActive: { id: 56, access: true, api: "/demo/path" },
                }
            },
            {
                name: "Appointment",
                displayName: "All Appointment",
                access: true,
                subMenus: {
                    // list: { id: 57, access: true, api: "/demo/path" },
                    create: { id: 58, access: true, api: "/demo/path" },
                    view: { id: 59, access: true, api: "/demo/path" },
                    update: { id: 60, access: true, api: "/demo/path" },
                    softDelete: { id: 61, access: true, api: "/demo/path" },
                    // hardDelete: { id: 62, access: true, api: "/demo/path" },
                    // activeActive: { id: 63, access: true, api: "/demo/path" },
                }
            },
            {
                name: "Case Sheet",
                displayName: "All Case Sheet",
                access: true,
                subMenus: {
                    // list: { id: 64, access: true, api: "/demo/path" },
                    create: { id: 65, access: true, api: "/demo/path" },
                    view: { id: 66, access: true, api: "/demo/path" },
                    update: { id: 67, access: true, api: "/demo/path" },
                    softDelete: { id: 68, access: true, api: "/demo/path" },
                    // hardDelete: { id: 69, access: true, api: "/demo/path" },
                    // activeActive: { id: 70, access: true, api: "/demo/path" },
                }
            },
            {
                name: "Prescription",
                displayName: "All Prescription",
                access: true,
                subMenus: {
                    // list: { id: 71, access: true, api: "/demo/path" },
                    create: { id: 72, access: true, api: "/demo/path" },
                    view: { id: 73, access: true, api: "/demo/path" },
                    update: { id: 74, access: true, api: "/demo/path" },
                    softDelete: { id: 75, access: true, api: "/demo/path" },
                    // hardDelete: { id: 76, access: true, api: "/demo/path" },
                    // activeActive: { id: 77, access: true, api: "/demo/path" },
                }
            },
            {
                name: "Invoices",
                displayName: "All Invoices",
                access: true,
                subMenus: {
                    // list: { id: 78, access: true, api: "/demo/path" },
                    create: { id: 79, access: true, api: "/demo/path" },
                    view: { id: 80, access: true, api: "/demo/path" },
                    update: { id: 81, access: true, api: "/demo/path" },
                    softDelete: { id: 82, access: true, api: "/demo/path" },
                    // hardDelete: { id: 83, access: false, api: "/demo/path" },
                    // activeActive: { id: 84, access: true, api: "/demo/path" },
                }
            },
        ]
    }
];


// clients role
const clientRoles = [
    { id: 1, name: 'Partner', capability: defaultPersmissionsList },
    { id: 2, name: 'Business Unit', capability: businessUnitPersmissionsList },
    { id: 3, name: 'Duty Doctor', capability: defaultPersmissionsList },
    { id: 4, name: 'Dental Assistant', capability: defaultPersmissionsList },
    { id: 5, name: "Front Desk Officer", capability: defaultPersmissionsList },
    { id: 6, name: "Fellow Member", capability: defaultPersmissionsList },
    { id: 7, name: "Dental Technician", capability: defaultPersmissionsList },
    { id: 8, name: "Store Manager ", capability: defaultPersmissionsList },
    { id: 9, name: "Floor Manager ", capability: defaultPersmissionsList },
    { id: 10, name: "Account Manager", capability: defaultPersmissionsList },
    { id: 11, name: "Assistant Manager ", capability: defaultPersmissionsList },
    { id: 12, name: "Manager", capability: defaultPersmissionsList },
    { id: 13, name: "General Manager", capability: defaultPersmissionsList },
    { id: 14, name: "Finance Manager ", capability: defaultPersmissionsList },
    { id: 15, name: "Specialist", capability: defaultPersmissionsList },
    { id: 16, name: "Consultant", capability: defaultPersmissionsList },
    { id: 17, name: "patienit", capability: defaultPersmissionsList },
];




// serial numbers data

const serialNumber = [
    { collectionName: "department", prefix: "DP" },
    { collectionName: "service", prefix: "SV" },
    { collectionName: "procedure", prefix: "PC" },
    { collectionName: "mediCases", prefix: "MC" },
    { collectionName: "findings", prefix: "FS" },
    { collectionName: "cheifComplaint", prefix: "CC" },
    { collectionName: "investigation", prefix: "IG" },
    { collectionName: "leaveRegister", prefix: "LA" },
    { collectionName: "employee", prefix: "EM" },
    { collectionName: "branch", prefix: "BR" },
    { collectionName: "chair", prefix: "CH" },
    { collectionName: "patient", prefix: "PT" },
    { collectionName: "caseSheet", prefix: "CS" },
    { collectionName: "appointment", prefix: "AP" },
    { collectionName: "prescription", prefix: "PR" },
]


// cheif complaints data

const cheifComplaints = [
    { complaintName: "Swelling Large", discription: "Any description" },
    { complaintName: "Toothache", discription: "Any description" },
    { complaintName: "Bleeding Gums", discription: "Any description" },
    { complaintName: "Pain in Tooth", discription: "Any description" },
    { complaintName: "Consultation", discription: "Any description" },
    { complaintName: "Faulty Crown", discription: "Any description" },
    { complaintName: "Difficulty in Chewing", discription: "Any description" },
]



const findings = [
    { findingsName: "Swelling Large", discription: "Any description" },
    { findingsName: "Toothache", discription: "Any description" },
    { findingsName: "Bleeding Gums", discription: "Any description" },
    { findingsName: "Pain in Tooth", discription: "Any description" },
    { findingsName: "Consultation", discription: "Any description" },
    { findingsName: "Faulty Crown", discription: "Any description" },
    { findingsName: "Difficulty in Chewing", discription: "Any description" },
]


const medicalHistory = [
    { caseName: "Arthritis", remark: "Any remark" },
    { caseName: "Migraine", remark: "Any remark" },
    { caseName: "Asthma", remark: "Any remark" },
    { caseName: "Cancer", remark: "Any remark" },
    { caseName: "Blood Sugar", remark: "Any remark" },
    { caseName: "Endocrinal", remark: "Any remark" },
    { caseName: "Blood Pressure", remark: "Any remark" },
    { caseName: "Bleeding Disorder", remark: "Any remark" },
    { caseName: "Gastro Internal", remark: "Any remark" },
    { caseName: "Fits / Faint / Epilepsy", remark: "Any remark" },
    { caseName: "Congenital Discover", remark: "Any remark" },
    { caseName: "HIV / HBV / Jaundice", remark: "Any remark" },
    { caseName: "Genito Urinal", remark: "Any remark" },
    { caseName: "Cardio Respiration", remark: "Any remark" },
]




exports.clientRoles = clientRoles;
exports.defaultPersmissionsList = defaultPersmissionsList;
exports.businessUnitPersmissionsList = businessUnitPersmissionsList;
exports.serialNumber = serialNumber;
exports.cheifComplaints = cheifComplaints;
exports.findings = findings;
exports.medicalHistory = medicalHistory;