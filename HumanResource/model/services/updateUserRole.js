const roleModel = require("../../../model/role")
const createNestedMenu = require("./createMenuList")

const updateUserRole = async (data) => {
    try {
        console.log(data,'data to update')
        if(!data?.capability) data.capability = await createNestedMenu()
        const roleExist = await roleModel.findOne({roleId:data?.roleId})    
        if(!roleExist) return {status:false,message:'no active roles found with this details '} 
        const result =await roleModel.updateOne({roleId:data?.roleId},{$set:data})       
        if(result.upsertedCount)return {status:true,message:'new role created',...data}
        else if (result.modifiedCount) return {status:true,message:' role modified',...data}
        else return {status:false,message:'nothing updated or created ',...data}
    } catch (error) {
        return {status:false,message:error,}   
    }
}

module.exports = updateUserRole
