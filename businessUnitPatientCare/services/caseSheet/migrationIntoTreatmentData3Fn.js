const caseSheetSchema = require("../../../client/model/caseSheet");
const { getClientDatabaseConnection } = require("../../../db/connection");
const serviceSchema = require("../../../client/model/service");

const migrationIntoTreatmentData3Fn = async () => {
    try {
        // console.log("serviceservice=>>>>", services);

        //actual connection:=>
        const dbActual = await getClientDatabaseConnection("6778e514b4f5258830c1c0e4");//actual clientId
        const actualCaseSheetModelObj = await dbActual.model('caseSheet', caseSheetSchema);
        const actualServiceModelObj = await dbActual.model('service', serviceSchema);
        //dummy connection :=>
        const dbTest = await getClientDatabaseConnection("6782084da840f3a7bf1a2f72");//testDB clientUD
        const testCaseSheetModelObj = await dbTest.model('caseSheet', caseSheetSchema);

        const realDataArr = await actualCaseSheetModelObj.find({});
        let count = 0; 
        for (const realData of realDataArr){//realData is each document element of realDataArr arr obj
            const {services} = realData;//as we want to manipulate services only
            const dummyEntry = {
                displayId : realData?.displayId,
                patientId : realData?.patientId,
                branchId : realData?.branchId,
                buId : realData?.buId,
                createdBy : realData?.createdBy,
                cheifComplaints : realData?.cheifComplaints,
                treatmentData : realData?.treatmentData,
                isActive : realData?.isActive,
                deletedAt : realData?. deletedAt,
                drafted : realData?.drafted ,
                status : realData?.status ,
                clinicalFindings : realData?.clinicalFindings ,
                diagnosis : realData?.diagnosis ,
                medicalHistory : realData?.medicalHistory ,
                investigation : realData?.investigation ,
                services : realData?.services,
                procedures : realData?.procedures,
                treatmentData2 :  realData?.treatmentData2,
                treatmentData3 :  [],
                otherAttachment :  realData?.otherAttachment, 
                note :  realData?.note, 
            };
            const temp = [];
            for (const inputServiceObj of services) {//iterating over each element of services array coming from real DB 
                //serviceName fetching:=>
                const serviceName = await actualServiceModelObj.findOne({_id : inputServiceObj?.service?.servId, deletedAt : null});//serviceName?.serviceName
                if(!serviceName) return {status: false, message: error?.message || "Service can't be found or deleted", data: {}};
                //discount calculation:=>
                const teethCount = parseInt(inputServiceObj?.quaintity);
                // if(teethCount == 0) return {status : false, message: "Atleast one tooth is required" };
                let discountForEachTooth = 0;
                if(teethCount !== 0){
                    discountForEachTooth = (inputServiceObj?.discount/teethCount);
                }
                for (const toothNumber of inputServiceObj?.tooth){// //iterating over each element of tooth arry of each element of services array coming from real DB
                    const existingIndex = temp.findIndex((item) => item?.tooth.toString() === toothNumber.toString());
                    if (existingIndex !== -1) {//tooth is in temp so only service object entry into service array
                        const serviceObjEntry = {
                            service: {
                                serviceName: serviceName?.serviceName,
                                serviceId :  inputServiceObj?.service?.servId,
                                // finished: "",//dont touch and let it take default
                                unitPrice: inputServiceObj?.rate,
                                discount: parseFloat(discountForEachTooth.toFixed(2)),
                                estimateId: null,
                                // prposedDate: null, //dont touch and let it take default or null
                                departmentId: inputServiceObj?.department?.deptId,
                                // opptedOrCompleted: null, //dont touch and let it take default or null
                                invoiceId: null,
                                updatedAt: new Date() 
                            },
                            procedure: [
                                // {
                                //     procedureName: "", //string in test schema  how to tackle????
                                //     finished: "", //string in enum in test schema  how to tackle????
                                //     updatedAt: "" //boolean in test schema  how to tackle????
                                // }
                            ]
                        };
                        temp[existingIndex].service.push(serviceObjEntry);
                    }
                    else {//tooth is not in temp so whole new tooth entry
                        const newToothEntry = {
                            tooth: toothNumber,
                            service: [
                                {
                                    service: {
                                        serviceName: serviceName?.serviceName,
                                        serviceId :  inputServiceObj?.service?.servId,
                                        // finished: "",//dont touch and let it take default
                                        unitPrice: inputServiceObj?.rate,
                                        discount: parseFloat(discountForEachTooth.toFixed(2)),
                                        estimateId: null,
                                        // prposedDate: null, //dont touch and let it take default or null
                                        departmentId: inputServiceObj?.department?.deptId,
                                        // opptedOrCompleted: null, //dont touch and let it take default or null
                                        invoiceId: null,
                                        updatedAt: new Date() 
                                    },
                                    procedure: [
                                        // {
                                        //     procedureName: "", //string in test schema  how to tackle????
                                        //     finished: "", //string in enum in test schema  how to tackle????
                                        //     updatedAt: "" //boolean in test schema  how to tackle????
                                        // }
                                    ]
                                }
                            ],
                            total : 0, //ask sir?
                            completed : 0 //ask sir? 
                        };
                        temp.push(newToothEntry);
                    }
                }
            }
            dummyEntry.treatmentData3 = temp;
        //    const insertedDummy = await testCaseSheetModelObj.create(dummyEntry);
           console.log("Inserted:=> ", insertedDummy._id);
           count++;
        }
        return { status: true, message: `${count} Data migrated successfully`, data: temp };
    }
    catch (error) {
        return { status: false, message: error?.message || "Data can't be migrated!!", data: {} }
    }
}

module.exports = migrationIntoTreatmentData3Fn
