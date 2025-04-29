const caseSheetSchema = require("../../../client/model/caseSheet");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");

const updateCaseSheetWithInvoiceNumberFn = async ({ clientId, invoice, branchId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const CaseSheetModelObj = await db.model('caseSheet', caseSheetSchema);
        const updatedCaseSheetList = [];
        for (const itemKartObj of invoice?.itemKart) {
            if (itemKartObj?.estimateNumber) {
                for (const estimateNo of itemKartObj?.estimateNumber) {
                    const fetchedCaseSheet = await CaseSheetModelObj.findOne({ "treatmentData3.service.service.estimateId": String(estimateNo), deletedAt: null });
                    console.log("fetchedCaseSheet=>>", fetchedCaseSheet?._id);
                    //updating invoice ID:
                    if (fetchedCaseSheet) {
                        let treatmentIndexContainer = -1;
                        let serviceIndexContainer = -1;
                        fetchedCaseSheet.treatmentData3.forEach((treatmentObj, treatmentIndex) => {
                            treatmentObj.service.forEach((serviceObj, serviceIndex) => {
                                if (String(serviceObj.service.estimateId) === String(estimateNo)) {
                                    treatmentIndexContainer = treatmentIndex;
                                    serviceIndexContainer = serviceIndex;
                                    console.log(`Matched at: treatmentData3[${treatmentIndex}].service[${serviceIndex}] of caseSheet?._id=>${fetchedCaseSheet?._id} for estimateNo=>${estimateNo} `);
                                }
                            });
                        });
                        if (treatmentIndexContainer !== -1 && serviceIndexContainer !== -1) {
                            fetchedCaseSheet.treatmentData3[treatmentIndexContainer].service[serviceIndexContainer].service.invoiceId = invoice?._id;
                            fetchedCaseSheet.treatmentData3[treatmentIndexContainer].service[serviceIndexContainer].service.invoiceNumber = invoice?.invoiceDetails?.displayId
                            console.log("changed=>>",fetchedCaseSheet.treatmentData3[treatmentIndexContainer].service[serviceIndexContainer].service);
                            const updatePath = `treatmentData3.${treatmentIndexContainer}.service.${serviceIndexContainer}.service.invoiceId`;
                            const updatedCaseSheet = await CaseSheetModelObj.findByIdAndUpdate(
                                fetchedCaseSheet._id,
                                { $set: { [updatePath]: invoice?._id } },
                                { new: true }
                            );
                            // console.log("updatedCaseSheet=>>>>",updatedCaseSheet);
                            if(!updatedCaseSheet){
                                return { status: false, message: "Couldn't update Invoice of the caseSheet!!", data: [] };
                            }
                            if(!updatedCaseSheetList.includes(String(updatedCaseSheet._id)))
                            updatedCaseSheetList.push(String(updatedCaseSheet._id));
                        }
                    }
                }
            }
        }

        return { status: true, message: "Invoice of the caseSheets updated successfully", data: updatedCaseSheetList };


    }
    catch (error) {
        return { status: false, message: error?.message || "Couldn't update CaseSheet", data : {} }
    }
}

module.exports = updateCaseSheetWithInvoiceNumberFn