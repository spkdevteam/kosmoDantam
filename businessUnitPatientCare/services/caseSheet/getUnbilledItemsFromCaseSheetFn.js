const { getClientDatabaseConnection } = require("../../../db/connection");
const caseSheetSchema = require("../../../client/model/caseSheet");
const serviceSchema = require("../../../client/model/service")
const getUnbilledItemsFromCaseSheetFn = async ({ clientId, caseSheetId }) => {
    try {
        //db connection:
        const db = await getClientDatabaseConnection(clientId);
        const CaseSheetModelObj = await db.model('caseSheet', caseSheetSchema);
        const ServiceModelObj = await db.model('service', serviceSchema);
        const fetchedCaseSheet = await CaseSheetModelObj.findOne({ _id: caseSheetId, deletedAt: null });
        //console.log("fetchedCaseSheetfetchedCaseSheet=>>",fetchedCaseSheet)
        const returnData = [];
        for (const toothEntry of fetchedCaseSheet?.treatmentData3) {
            // console.log("toothEntry=>>", toothEntry?.tooth);
            for (const serviceObj of toothEntry?.service) {
                // console.log("serviceObj?.service?.finished=>>",serviceObj?.service?.finished);             
                if (serviceObj?.service?.finished == "Opted" && serviceObj?.service?.estimateId && !serviceObj?.service?.invoiceId) {
                    //fix:=>
                    // const serviceDetails = await ServiceModelObj.findOne({ _id: serviceObj?.service?.serviceName?.servId, deletedAt: null });
                    const serviceDetails = await ServiceModelObj.findOne({ _id: serviceObj?.service?.serviceId, deletedAt: null });
                    if (!serviceDetails) return { status: false, message: "Service doesn't exist or deleted!!" }
                    //console.log("serviceDetailsserviceDetails=>>", serviceDetails); //_id, serviceName
                    // Check if entry with all 3 params exists
                    const existingIndex = returnData.findIndex(
                            (item) =>
                                item.serviceId.toString() === serviceDetails._id.toString() &&
                                item.unitPrice === serviceObj.service.unitPrice &&
                                // item.discount === serviceObj.service.discount
                                item.discount === parseFloat(serviceObj?.service?.discount?.toFixed(2))||0.00
                    );
                    if (existingIndex !== -1) {//if found
                       returnData[existingIndex].toothArray.push(toothEntry?.tooth);
                       returnData[existingIndex].estimateNumber.push(serviceObj?.service?.estimateId);
                      }
                    else {
                        returnData.push({
                            serviceId: serviceDetails._id,
                            serviceName: serviceDetails.serviceName,
                            unitPrice: serviceObj?.service?.unitPrice||0.00,
                            // discount: serviceObj.service.discount,
                            discount: parseFloat(serviceObj?.service?.discount?.toFixed(2))||0.00,
                            //                         "_id": {
                            //     "$oid": "67a32f5a074ac38a6f71a928"    /////??????
                            //   }
                            estimateNumber : [serviceObj?.service?.estimateId],
                            toothArray : [toothEntry?.tooth],
                            quantity : 0,//calculate dynamically outside
                            taxableValue : 0,//hardcoded
                            cgst : 0,//hardcoded
                            sgst : 0,//hardcoded
                            igst : 0,//hardcoded
                            total : 0,//calculate dynamically outside

                        });
                      }
                }
            }
        }
        //calculting total :
        for (const returnElement of returnData)
        {
            returnElement.total = returnElement.unitPrice * returnElement.toothArray.length;
            returnElement.quantity = returnElement.toothArray.length;
        }
        console.log("returnData=>>", returnData);
        return {status : true, message : "Unbilled Items fetched successfully", itemKart : returnData}

    }
    catch (error) {
        return { status: false, message: error?.message || "Couldn't fetch CaseSheet" }
    }

}

module.exports = getUnbilledItemsFromCaseSheetFn