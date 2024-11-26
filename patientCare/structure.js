
patientMaster =[ {
contactNumber:7907441232,
referedPatientCode:'hum00001',
branchId:'',
firstName:'MY',
lastName:'Name',
dateOfBirth:'12/05/2000',
Gender:'Male',
BloodGroup:'O+ve',
PatientGroup:'EHS'||'Clinic'||"Trust",
email:'myemail@gmail.com',
country:'india',
state:'Andhra Pradesh',
City:'Hyderabaad',
postCode:'673014',
BuildNumber:'36/154',
buildingName:'House Name',
streetName:'wills Street',
areaName:'manglo',
city:'asansol',
}]

appointments = [ {
    appointmentId: "ap001",
    branchId:'br0001',
    token:'01',
    date: '25/11/2024',
    caseId: 'case001',
    dutyDoctor:'Doctor 1',
    dentalAssisteant:'Assistant One',
    slotFrom:'10:10:00',
    slotTo:'10:20:00',
    chair:'Chair1',
    patientId:'p00001',
    status:'arrived'|| 'chairReady'|| 'inProgress'||'Completed'||'Cancelled'||'Rescheduled',
    isActive:true,
    deletedAt:null,
    createdUser:'empo001'
}]


cases= {
    case001: {
        branchId:'br0001',
        patientId:'p0001',
        doctorCode:'doc1',
        specialist:'spDoc1',
        appointMentId:'ap001',
        cheifComplaint:[
            {
                complaintType:'badBreath',
                teeth:[1,3,6]
            },
            {
                complaintType:'Tooth Ache',
                teeth:[1,3,6]
            },
            

        ],
        clinicalFindings:[
            {
                findingName:'Pus Discharge',
                teeth:[1,3,6]
            },
            {
                findingName:'irregular Teeth',
                teeth:[1]
            }
        ],
        medicalhistory:[
            {
                 name:'allergies',
                 status:true,
                 discription:'',
                 doctrorNotes:'',
            },
            {
                name:'endo Crinal',
                status:true,
                discription:'',
                doctrorNotes:'',
           }
        ],
        investigation:[
           {
            categoryname:'Xray',
            categoryId:'ctgry0001',
            remarks:'damage in root of teeth 5'
           }  ,
           {
            categoryname:'ECG',
            categoryId:'ctgry0002',
            remarks:'normal'
           }
        ],
        treamtMent:[
            {
                treatMentCode:'tr0001',
                department:'imlpantology',
                service:'implant service',
                unitCost:800,
                teeth:[1,3,5],
                defaultProcedures:[
                    {'pr001':details},
                    {'pr002':details},
                    {'pr003':details}
                ],
                qty:2,
                totalCost:1600,
                discount:500,
                netAmountt:1100,
                billedStatus:false,
                invoiceNumber:null
            },
            {
                treatMentCode:'tr0002',
                department:'imlpantology',
                service:'root canal',
                unitCost:3000,
                teeth:[1,],
                defaultProcedures:[
                    {'pr001':'details'},
                    {'pr002':'details'},
                    {'pr003':'details'}
                ],
                qty:1,
                totalCost:3000,
                billedStatus:false,
                invoiceNumber:null
            }
        ],
        procedures:[
            {
                procedureName:'root Canal',
                prescribedServices:['ser001','ser002'],
                prescribedTooth:[3,6,9],
                doctorDiscription:''
                 
            }
        ],
        notes:[
            {
                attachemntName:'',
                link:'',
                discription:''
            }
        ],
        track:[
            {
                time:'10:00:00',
                discription:'patient reported at clinic',
            },
            {
                time:'10:10:00',
                discription:'Cheif complaint reported ',
            },
            {
                time:'10:12:00',
                discription:'findings added reported ',
            },
            {
                time:'10:15:00',
                discription:'medical history verified  ',
            },
            {
                time:'10:20:00',
                discription:'investigations added  ',
            },
            {
                time:'10:10:00',
                discription:'Services prescribed  ',
            },
            {
                time:'10:10:00',
                discription:'Procedures prescribed   ',
            },
            {
                time:'10:10:00',
                discription:'Visit Closed ',
            },

            
        ]
    },
    case002: {
        patientId:'p0001',
        appointMentId:'ap001',
        cheifComplaint:[
            {
                complaintType:'badBreath',
                teeth:[1,3,6]
            },
            {
                complaintType:'Tooth Ache',
                teeth:[1,3,6]
            },
            

        ],
        clinicalFindings:[
            {
                findingName:'Pus Discharge',
                teeth:[1,3,6]
            },
            {
                findingName:'irregular Teeth',
                teeth:[1]
            }
        ],
        medicalhistory:[
            {
                 name:'allergies',
                 status:true,
                 discription:'',
                 doctrorNotes:'',
            },
            {
                name:'endo Crinal',
                status:true,
                discription:'',
                doctrorNotes:'',
           }
        ],
        investigation:[
           {
            categoryname:'Xray',
            categoryId:'ctgry0001',
            remarks:'damage in root of teeth 5'
           }  ,
           {
            categoryname:'ECG',
            categoryId:'ctgry0002',
            remarks:'normal'
           }
        ],
        treamtMent:[
            {
                treatMentCode:'tr0001',
                department:'imlpantology',
                service:'implant service',
                unitCost:800,
                teeth:[1,3,5],
                defaultProcedures:[
                    {'pr001':details},
                    {'pr002':details},
                    {'pr003':details}
                ],
                qty:2,
                totalCost:1600,
                billedStatus:false,
                invoiceNumber:null
            },
            {
                treatMentCode:'tr0002',
                department:'imlpantology',
                service:'root canal',
                unitCost:3000,
                teeth:[1,],
                defaultProcedures:[
                    {'pr001':'details'},
                    {'pr002':'details'},
                    {'pr003':'details'}
                ],
                qty:1,
                totalCost:3000,
                billedStatus:false,
                invoiceNumber:null
            }
        ],
        procedures:[
            {
                procedureName:'root Canal',
                prescribedServices:['ser001','ser002'],
                prescribedTooth:[3,6,9],
                doctorDiscription:''
                 
            }
        ],
        notes:[
            {
                attachemntName:'',
                link:'',
                discription:''
            }
        ],
        track:[
            {
                time:'10:00:00',
                discription:'patient reported at clinic',
            },
            {
                time:'10:10:00',
                discription:'Cheif complaint reported ',
            },
            {
                time:'10:12:00',
                discription:'findings added reported ',
            },
            {
                time:'10:15:00',
                discription:'medical history verified  ',
            },
            {
                time:'10:20:00',
                discription:'investigations added  ',
            },
            {
                time:'10:10:00',
                discription:'Services prescribed  ',
            },
            {
                time:'10:10:00',
                discription:'Procedures prescribed   ',
            },
            {
                time:'10:10:00',
                discription:'Visit Closed ',
            },

            
        ]
    },
}

