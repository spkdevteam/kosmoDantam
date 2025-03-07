const clinetBranchSchema = require("../../client/model/branch");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit");
const { getClientDatabaseConnection } = require("../../db/connection");
const buSettingsSchema = require("../buSettings");
const serialNumberSchema = require("../serialNumber")

 

const getserialNumber = async (collection,clientId,branchId,buid) => {
    try {
        console.log(collection,clientId,branchId,buid,'collection,clientId,branchId,buid')
        const db = await getClientDatabaseConnection(clientId);
        const serialNumber =await db.model('serialNumber',serialNumberSchema)
        const buModel =await db.model('businessUnit',clinetBusinessUnitSchema)
        const branchModel = await db.model('branch', clinetBranchSchema)
        const BUnit= await buModel.findOne({_id:buid})
        const branchDetails =branchId.length ? await branchModel.findOne({_id:branchId||''}):{branchPrefix:'BU'}
        const result = await serialNumber.findOneAndUpdate({ collectionName: collection }, { $inc: { nextNum: 1 } })
        
        if (result) {
            console.log('xxx',BUnit.BUPrefix +'-'+branchDetails?.branchPrefix+'-'+BUnit.activeYear + '-' +  result.prefix + result.nextNum)
            return BUnit.BUPrefix +'-'+branchDetails?.branchPrefix+'-'+BUnit.activeYear + '-' +  result.prefix + result.nextNum
        }
        else {
            return null
        }
    } catch (error) {
        return null
    }
}


module.exports = getserialNumber