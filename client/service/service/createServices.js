const getserialNumber = require("../../../model/services/generateSerialNumber")

const createService = async (serviceData)=>{
    try {
        if(!serviceData.serviceId)serviceData.serviceId = await getserialNumber('services')  
    } catch (error) {
        
    }
}