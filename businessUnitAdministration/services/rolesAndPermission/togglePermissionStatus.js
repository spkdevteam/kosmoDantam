const clientRoleSchema = require("../../../client/model/role")
const { getClientDatabaseConnection } = require("../../../db/connection")

const togglePermissionStatus =async ({clientId,permissionId})=>{
    try {   
        if(!clientId) return {status:false,message:'client connection detail is missing '}
        if(!permissionId) return {status:false,message:'Unable to read role and permission '}
        const db = await  getClientDatabaseConnection(clientId)
        const RolesAndpermission = db.model('clientRoles', clientRoleSchema);
        const role = await RolesAndpermission.findById(permissionId)
        if(!role)  return {status:false,message:'Submitted Role is not existing '}
        role.isActive ? role.isActive = 0 : role.isActive = 1
        const save =await role.save()
        console.log(save,'Save -------------->>>>>>>>>>>>>>>>')
        return {status:true,message:` Status is ${save?.isActive ? 'Activated' : 'Disabled'}`}


        
    } catch (error) {
        
    }
}

module.exports =  togglePermissionStatus