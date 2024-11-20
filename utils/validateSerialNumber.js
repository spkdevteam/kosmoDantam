const clinetBranchSchema = require("../client/model/branch");
const { getClientDatabaseConnection } = require("../db/connection");
const buSettingsSchema = require("../model/buSettings");

const validateSerialnumber =async (inputNumber,clientId)=>{
    try {
        const db = await getClientDatabaseConnection(clientId);
        const splitNumber = inputNumber.split('-')
        const buModel = db.model('BUSetting',buSettingsSchema)
        const branchModel = db.model('branch', clinetBranchSchema)
        const BUnit= await buModel.findOne({BUPrefix:splitNumber[0]})
        
        const branchDetails =await branchModel.findOne({branchPrefix:splitNumber[1]})
        
        if (BUnit && branchDetails &&  splitNumber[2] == BUnit.activeYear  ){
            return true
        }
        else return false
        
    } catch (error) {
        return null
    }
}

module.exports = validateSerialnumber
