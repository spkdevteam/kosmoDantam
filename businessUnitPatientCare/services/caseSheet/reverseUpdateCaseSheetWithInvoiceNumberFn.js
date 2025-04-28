const caseSheetSchema = require("../../../client/model/caseSheet");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");

const reverseUpdateCaseSheetWithInvoiceNumberFn = async ({ clientId, invoiceId, branchId, updatedByUserId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const CaseSheetModelObj = await db.model('caseSheet', caseSheetSchema);
        const fetchedCaseSheet = await CaseSheetModelObj.findOne({ "treatmentData3.service.service.invoiceId": new mongoose.Types.ObjectId(invoiceId), deletedAt: null });
        console.log("fetchedCaseSheet==>>>", fetchedCaseSheet)
        if (fetchedCaseSheet) {
            const indexObj = {};
            fetchedCaseSheet.treatmentData3.map((trt, ind) => {
                trt.service.map((serv, servInd) => {
                    if (String(serv.service.invoiceId) == String(invoiceId)) {
                        if (!indexObj[ind]) {
                            indexObj[ind] = [];
                        }
                        indexObj[ind].push(servInd);
                    }
                })
            })//indexObj is an object with each key  (ind) is the index of an element of  treatmentData3, servInd is an array stores indices of all the elements of service array under given ind whose service.invoiceId matches with invoiceId coming from frontend
            console.log("indexObj==>>", indexObj)
            for (const ind in indexObj) {
                const servInd = indexObj[ind];
                for (const i of servInd) {
                    fetchedCaseSheet.treatmentData3[ind].service[i].service.invoiceId = null;
                    fetchedCaseSheet.treatmentData3[ind].service[i].service.invoiceNumber = null;
                }
            }
            const updatedCasesheet = await fetchedCaseSheet.save();
            if (!updatedCasesheet) {
                return { status: false, message: "Couldn't deleted InvoiceId of the given caseSheet!!", data: {} };
            }
            return { status: true, message: "InvoiceId of the caseSheet deleted successfully", data: { caseSheetId: updatedCasesheet?._id } };
        }
        else {
            return { status: true, message: "CaseSheet with given InvoiceId not found so skipping" };

        }

    }
    catch (error) {
        return { status: false, message: error?.message || "Couldn't update CaseSheet", data: {} }
    }
}

module.exports = reverseUpdateCaseSheetWithInvoiceNumberFn