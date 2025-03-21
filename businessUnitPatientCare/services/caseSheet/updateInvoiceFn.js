const caseSheetSchema = require("../../../client/model/caseSheet");
const { getClientDatabaseConnection } = require("../../../db/connection");
const mongoose = require("mongoose");
//handle invoiceId validation from Invoice schema..cant find the schema
const updateInvoiceFn = async ({ caseSheetId, inputArrObj, clientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const CaseSheetModelObj = await db.model('caseSheet', caseSheetSchema);
        const fetchedCaseSheet = await CaseSheetModelObj.findOne({ _id: caseSheetId, deletedAt: null });
        console.log("fetchedCaseSheetfetchedCaseSheet=>", fetchedCaseSheet);

        if (!fetchedCaseSheet) return { status: false, message: "Casesheet can't be found or deleted already!!", data: {} };
        //updating invoice No:
        for (const inputToothObj of inputArrObj)//inputToothObj is each object associated with a particular tooth of fronend request(inputArrObj)
        {
            for (const serviceArrObj of inputToothObj?.service) //serviceArrObj is each object inside service arrayObject for a particular tooth coming from frontend rquest
            {
                if (serviceArrObj?.service?.invoiceId) {
                    //validating invoiceID:
                    if (!mongoose.Types.ObjectId.isValid(serviceArrObj?.service?.invoiceId)) {
                        return { status: false, message: "Invalid invoiceId", data: {} }
                    }
                    //now Im staring to find that particular document based on tooth first
                    const toothIndexOf = fetchedCaseSheet?.treatmentData3.findIndex((item) => item?.tooth.toString() === inputToothObj?.tooth.toString());
                    if (toothIndexOf !== -1) {
                        //if tooth is found the find the particular service
                        const serviceIndexOf = fetchedCaseSheet?.treatmentData3[toothIndexOf].service.findIndex((item) => item?._id.toString() === serviceArrObj?._id.toString());
                        if (serviceIndexOf !== -1) {//if service is found then assign the invoiceId coming from frontend
                            fetchedCaseSheet.treatmentData3[toothIndexOf].service[serviceIndexOf].service.invoiceIda = serviceArrObj?.service?.invoiceId;
                        }
                        else {
                            return { status: false, message: `Particular service for Tooth ${inputToothObj?.tooth} can't be found!!`, data: {} }
                        }
                    }
                    else //if tooth cant be found in DB
                    {
                        return { status: false, message: `Tooth ${inputToothObj?.tooth} can't be found!!`, data: {} }
                    }
                }
            }
        }
        const caseSheetWithUpdatedInvoice = await fetchedCaseSheet.save();
        if (!caseSheetWithUpdatedInvoice?.status) return { status: false, message: "Invoice of Casesheet can't be updated!!", data: {} };
        return { status: true, message: "Invoice of the requested Casesheet updated Successfully", data: caseSheetWithUpdatedInvoice }
    }
    catch (error) {
        return { status: false, message: error?.message || "Couldn't edit CaseSheet" }
    }
}
module.exports = updateInvoiceFn