const roleModel = require("../../../model/role")
const createNestedMenu = require("./createMenuList")
const getserialNumber = require("./generateSerialNumber")

const createRole = async (data) => {
    try {
        if(!data?.roleId) data.roleId = await getserialNumber('roleMaster')
        if(!data?.capability) data.capability = await createNestedMenu()
        const roleExist = await roleModel.findOne({name:data?.name})    
        if(roleExist) return {status:false,message:'role already exist in the same name '} 
        const result =await roleModel.updateOne({$or:[{roleId:data?.roleId},{name:data?.name}]},{$set:data},{upsert:true})       
        if(result.upsertedCount)return {status:true,message:'new role created',...data}
        else if (result.modifiedCount) return {status:true,message:' role modified',...data}
        else return {status:false,message:'nothing updated or created ',...data}
    } catch (error) {
        return {status:false,message:error,}   
    }
}

module.exports = createRole
