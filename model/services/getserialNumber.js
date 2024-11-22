const clinetBranchSchema = require("../../client/model/branch");
const { getClientDatabaseConnection } = require("../../db/connection");
const buSettingsSchema = require("../buSettings");
const serialNumberSchema = require("../serialNumber")

 

const getserialNumber = async (collection,clientId,branchId) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const serialNumber =await db.model('serialNumber',serialNumberSchema)
        const buModel =await db.model('BUSetting',buSettingsSchema)
        const branchModel = await db.model('branch', clinetBranchSchema)
        const BUnit= await buModel.findOne({})
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