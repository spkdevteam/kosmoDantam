const clinetBranchSchema = require("../../client/model/branch");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit");
const { getClientDatabaseConnection } = require("../../db/connection");
const buSettingsSchema = require("../buSettings");
const serialNumberSchema = require("../serialNumber")



const getserialNumber = async (collection, clientId, branchId, buid) => {
    try {
        // console.log(collection,clientId,branchId,buid,'collection,clientId,branchId,buid')
        const db = await getClientDatabaseConnection(clientId);
        const serialNumber = await db.model('serialNumber', serialNumberSchema)
        const buModel = await db.model('businessUnit', clinetBusinessUnitSchema)
        const branchModel = await db.model('branch', clinetBranchSchema)
        const BUnit = await buModel.findOne({ _id: buid })
        const branchDetails = branchId.length ? await branchModel.findOne({ _id: branchId || '' }) : { branchPrefix: 'bnch' }//changing branchPrefix
        const result = await serialNumber.findOneAndUpdate({ collectionName: collection }, { $inc: { nextNum: 1 } });

        if (result) {
            console.log('xxx', BUnit?.BUPrefix + '-' + branchDetails?.branchPrefix + '-' + BUnit?.activeYear + '-' + result?.prefix + result?.nextNum)
            return BUnit?.BUPrefix + '-' + branchDetails?.branchPrefix + '-' + BUnit?.activeYear + '-' + result?.prefix + result?.nextNum
        }
        else {//serialNumber document for the collectionName can't be found in DB so creating new one
            console.log(`serialNumber document for the collectionName : ' ${collection} ' can't be found in DB so creating new one`);
            const insertNewResult = await serialNumber.insertOne(
                {
                    collectionName: collection,
                    nextNum: 1000001,
                    prefix: branchDetails?.branchPrefix
                });
            // console.log("after insertion=>>", insertNewResult);

            if (insertNewResult) {
                console.log("uopdate");

                const fetchNewlyCreatedResult = await serialNumber.findOneAndUpdate({ collectionName : collection }, { $inc: { nextNum: 1 } });
                console.log("fetchNewlyCreatedResult=>>", fetchNewlyCreatedResult);

                if (fetchNewlyCreatedResult) {
                    console.log('xxx', BUnit?.BUPrefix + '-' + branchDetails?.branchPrefix + '-' + BUnit?.activeYear + '-' + fetchNewlyCreatedResult?.prefix + fetchNewlyCreatedResult?.nextNum)
                    return BUnit?.BUPrefix + '-' + branchDetails?.branchPrefix + '-' + BUnit?.activeYear + '-' + fetchNewlyCreatedResult?.prefix + fetchNewlyCreatedResult?.nextNum
                }
            }
            else {
                return null
            }
        }
    } catch (error) {
        return null
    }
}


module.exports = getserialNumber