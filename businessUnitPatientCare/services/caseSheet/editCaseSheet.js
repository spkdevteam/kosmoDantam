const caseSheetSchema = require("../../../client/model/caseSheet");
const { getClientDatabaseConnection } = require("../../../db/connection");
const getserialNumber = require("../../../model/services/getserialNumber");
//how to handle total, completed?
//handle if estimateId comes from frontend
const editcaseSheet = async ({ inputObj, clientId, caseSheetId, branchId, buid }) => {
    try {
        // return {status : true, message :"CAsesheet is edited successfully" , data : {"testKey":"testVAl"}};
        const db = await getClientDatabaseConnection(clientId);
        const CaseSheetModelObj = await db.model('caseSheet', caseSheetSchema);
        const fetchedCaseSheet = await CaseSheetModelObj.findOne({ _id: caseSheetId, deletedAt: null });
        if (!fetchedCaseSheet) return { status: false, message: "Casesheet can't be found or deleted already!!", data: {} };
        //updating:
        let totalTeethCount = 0;
        inputObj?.tooth?.map((t) => {
            if (t?.status != "Cancelled")
                totalTeethCount++;
        })
        // const totalTeethCount = parseInt(inputObj?.tooth?.length);
        console.log("totalTeethCounttotalTeethCount=>>", totalTeethCount);
        
        await Promise.all(
            inputObj?.tooth?.map(async (inputTooth) => {//inputTooth=>each row of inputObj
                await Promise.all(
                    fetchedCaseSheet?.treatmentData3?.map(async (fetchedTooth) => {//fetchedTooth=>each row of treatmentData3 of fetched document from db
        
                        if (inputTooth?.tooth == fetchedTooth?.tooth) {
        
                            // CASE 1: serviceId is null => push new service ONLY ONCE
                            if (inputTooth?.serviceId == null || inputTooth?.serviceId == '') {//if serviceId for individual tooth is null in request
                                const newService = {
                                    service: {
                                        serviceName: { servId: inputObj?.serviceid },
                                        finished: inputTooth?.status,
                                        unitPrice: parseInt(inputObj?.rate),
                                        discount: totalTeethCount !== 0
                                            ? parseInt(inputObj?.discount) / totalTeethCount
                                            : 0,
                                        // opptedOrCompleted:"",
                                        // invoiceId:"",
                                        prposedDate: inputObj?.prposedDate,
                                        // updatedAt:"",
                                        departmentId: inputObj?.department
                                    }
                                    //    ,
                                    //    procedure:[
                                    //         {
                                    //             procedureName : "",
                                    //             finished:"",
                                    //             updatedAt:""
                                    //         }
                                    //     ]
                                };
        
                                if (inputTooth?.status == "Opted") {
                                    const random = await getserialNumber("estimate", clientId, branchId, buid);
                                    console.log("random=>>", random);
                                    if(!random) return { status: false, message: 'Error generating estimate!!' };
                                    newService.service.estimateId = random;
                                }
        
                                console.log("Pushing new service only ONCE for non serviceId null =>", newService);
                                fetchedTooth.service.push(newService);
        
                            } 
                            else // CASE 2: serviceId is valid 
                            {
                                const arrayForEachToothServiceId = [];
                                await Promise.all(
                                    fetchedTooth?.service?.map(async (fetchedServiceArr) => {//fetchedServiceArr is each object element inside service array of a particular tooth
                                        arrayForEachToothServiceId.push(String(fetchedServiceArr?._id));
                                        if (fetchedServiceArr?._id == inputTooth?.serviceId) {//if servieId of each tooth coming from req mathed with _id of fetchedServiceArr
                                            fetchedServiceArr.service.finished = inputTooth?.status;
                                            fetchedServiceArr.service.serviceName = { servId: inputObj?.serviceid };
                                            fetchedServiceArr.service.unitPrice = parseInt(inputObj?.rate);
                                            fetchedServiceArr.service.discount = totalTeethCount !== 0
                                                ? parseInt(inputObj?.discount) / totalTeethCount
                                                : 0;
                                            fetchedServiceArr.service.prposedDate = inputObj?.prposedDate;
                                            fetchedServiceArr.service.departmentId = inputObj?.department;
                                            // fetchedServiceArr.procedure = [
                                            //     {
                                            //         procedureName : "",
                                            //         finished:"",
                                            //         updatedAt:""
                                            //     }
                                            // ];
        
                                            if (inputTooth?.status == "Opted" && !fetchedServiceArr.service.estimateId) {
                                                console.log("Updating valid service =>", inputTooth?.tooth);
                                                const random = await getserialNumber("estimate", clientId, branchId, buid);
                                                if(!random) return { status: false, message: 'Error generating estimate!!' };
                                                console.log("random=>>", random);
                                                fetchedServiceArr.service.estimateId = random;
                                            }
                                        }
                                    })
                                )
                                //tag1//if serviceId of each individual tooth is valid but doesnt exist in treatmentDAta3 but tooth is there in treatmentDAta3
                                if(!arrayForEachToothServiceId.includes(String(inputTooth?.serviceId)))//if serviceId of each individual tooth doesnt exist in treatmentDAta3 but tooth is there in treatmentDAta3
                                {
                                    const newService = {
                                        service: {
                                            serviceName: { servId: inputObj?.serviceid },
                                            finished: inputTooth?.status,
                                            unitPrice: parseInt(inputObj?.rate),
                                            discount: totalTeethCount !== 0
                                                ? parseInt(inputObj?.discount) / totalTeethCount
                                                : 0,
                                            // opptedOrCompleted:"",
                                            // invoiceId:"",
                                            prposedDate: inputObj?.prposedDate,
                                            // updatedAt:"",
                                            departmentId: inputObj?.department
                                        }
                                        //    ,
                                        //    procedure:[
                                        //         {
                                        //             procedureName : "",
                                        //             finished:"",
                                        //             updatedAt:""
                                        //         }
                                        //     ]
                                    };
                                    if (inputTooth?.status == "Opted") {
                                        const random = await getserialNumber("estimate", clientId, branchId, buid);
                                        console.log("random=>>", random);
                                        if(!random) return { status: false, message: 'Error generating estimate!!' };
                                        newService.service.estimateId = random;
                                    }
                                    console.log("Pushing new service only ONCE for non serviceId null =>", newService);
                                    fetchedTooth.service.push(newService);
                                }
                            }
                        }
                    })
                )
            })
        )

        const fetchedToothListArr = [];
        await Promise.all(
            fetchedCaseSheet?.treatmentData3?.map(async (fetchedTooth) => {
                fetchedToothListArr.push( fetchedTooth?.tooth);
            })

        );
        console.log("fetchedToothListArrfetchedToothListArr=>>>",fetchedToothListArr);
        //code for insertion in treatmentData3 for teeth those are in req.body(i.e in inputObj) but not in DB(i.e in fetchedCaseSheet?.treatmentData3)
        const tempToothMap = {};
        await Promise.all(
            inputObj?.tooth?.map(async (inputTooth) => {
                if(!fetchedToothListArr.includes(String(inputTooth?.tooth)) && !tempToothMap[String(inputTooth?.tooth)])
                {
                    console.log("inserting for=>",inputTooth?.tooth);
                    let random ='' ;
                    if (inputTooth?.status == "Opted") {
                        random = await getserialNumber("estimate", clientId, branchId, buid);
                        if(!random) return { status: false, message: 'Error generating estimate!!' };
                        console.log("random=>>", random);
                    }
                    const newToothEntry = {
                        tooth : inputTooth?.tooth,
                        service : [],
                        total : 0, //hardcoded
                        completed : 0 //harcoded
                    }
                    newToothEntry.service.push({
                        service : {
                            serviceName: { servId: inputObj?.serviceid },
                            finished : inputTooth?.status,
                            unitPrice : parseInt(inputObj?.rate),
                            discount : totalTeethCount !== 0
                                                ? parseInt(inputObj?.discount) / totalTeethCount
                                                : 0,
                            estimateId : random,
                            // opptedOrCompleted:"",
                            // invoiceId:"",
                            prposedDate : inputObj?.prposedDate,
                            // updatedAt:"",
                            departmentId: inputObj?.department
                        },
                        procedure : [
                                //      {
                                //         procedureName : "",
                                //         finished:"",
                                //         updatedAt:""
                                //     }
                        ]
                    });
                  //inserting whole new tooth entry:
                  fetchedCaseSheet.treatmentData3.push(newToothEntry);  
                  tempToothMap[inputTooth?.tooth] = newToothEntry;
                }
                else if (tempToothMap[String(inputTooth?.tooth)])
                {
                    console.log("hiiiiiiiittttttttttttttttt");
                    let random ='' ;
                    if (inputTooth?.status == "Opted") {
                        random = await getserialNumber("estimate", clientId, branchId, buid);
                        if(!random) return { status: false, message: 'Error generating estimate!!' };
                        console.log("random=>>", random);
                    }
                    const existingIndex = fetchedCaseSheet.treatmentData3.findIndex((item) =>item.tooth.toString() == String(inputTooth?.tooth));
                    fetchedCaseSheet.treatmentData3[existingIndex].service.push(
                        {
                            service : {
                                serviceName: { servId: inputObj?.serviceid },
                                finished : inputTooth?.status,
                                unitPrice : parseInt(inputObj?.rate),
                                discount : totalTeethCount !== 0
                                                    ? parseInt(inputObj?.discount) / totalTeethCount
                                                    : 0,
                                estimateId : random,
                                // opptedOrCompleted:"",
                                // invoiceId:"",
                                prposedDate : inputObj?.prposedDate,
                                // updatedAt:"",
                                departmentId: inputObj?.department
                            },
                            procedure : [
                                    //      {
                                    //         procedureName : "",
                                    //         finished:"",
                                    //         updatedAt:""
                                    //     }
                            ]  
                        }
                    );
                }
            })
        )
        


        const updatedCaseSheet = await fetchedCaseSheet.save();
        if (!updatedCaseSheet?.status) return { status: false, message: "Casesheet can't be updated!!", data: {} };
        return { status: true, message: "Casesheet updated Successfully", data: updatedCaseSheet };



    }
    catch (error) {
        return { status: false, message: error?.message || "Couldn't edit CaseSheet" }
    }

}

module.exports = editcaseSheet