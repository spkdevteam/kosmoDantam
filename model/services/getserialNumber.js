const clinetBranchSchema = require("../../client/model/branch");
const { getClientDatabaseConnection } = require("../../db/connection");
const buSettingsSchema = require("../buSettings");
const serialNumberSchema = require("../serialNumber")

 

const getserialNumber = async (collection,clientId,branchId) => {
    try {
        const db = await getClientDatabaseConnection(clientId);
        const serialNumber = db.model('serialNumber',serialNumberSchema)
        const buModel = db.model('BUSetting',buSettingsSchema)
        const branchModel = db.model('branch', clinetBranchSchema)
        const BUnit= await buModel.findOne({})
        const branchDetails =await branchModel.findOne({branchId:branchId})
        const result = await serialNumber.findOneAndUpdate({ collectionName: collection }, { $inc: { nextNum: 1 } })
        if (result) {
            return BUnit.BUPrefix +'-'+branchDetails.branchPrefix+'-'+BUnit.activeYear + '-' +  result.prefix + result.nextNum
        }
        else {
            return null
        }
    } catch (error) {
        return null
    }
}

module.exports = getserialNumber