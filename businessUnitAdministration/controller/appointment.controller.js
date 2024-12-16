const sanitizeBody = require("../../utils/sanitizeBody")
const  appointmentServices = require("../services/appoinment.service")
const { getchairList } = require("../services/chairs.service")
const { listEmployeeByRole } = require("../services/clientUser.service")

exports.postcreateBooking = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        console.log(data,'appointment data')
        const result = await appointmentServices.creatAppointment(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}
exports.getBookingByDate = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        const result = await appointmentServices.getBookingChart(data)
        res.status(200).json(result)
       // res.json(data)
    } catch (error) {
        next(error)
    }
} 

exports.getAvailability = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        //taking the full list of chairs ,assistant,chairliist from client db 
        const doctorsList = await listEmployeeByRole({ roleId:3, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[]
        const assistantList   =   await listEmployeeByRole({ roleId:4, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[]
        const chairList = await getchairList({roleId:3, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[]
        const specialist = await listEmployeeByRole({ roleId:15, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[]
        
        // taking the engaged list of doctors , chairs ,dental Assistant 
        const result = await appointmentServices.generateAvailabiltyChart(data)
        const {bookedDoctors, bookedChairs, bookedAssistants,bookedSpecialist,absentees } = result;
        console.log(bookedDoctors, bookedChairs, bookedAssistants,bookedSpecialist,'bookedDoctors, bookedChairs, bookedAssistants ' )
       
        //comparing the enagaed one with all details and return available list 
        const doctorsAvailable =  doctorsList?.filter((doc)=>   !bookedDoctors.has( doc._id.toString()) && !absentees.has( doc._id.toString()) )
        const chairAvailable =  chairList?.filter((doc)=> !bookedChairs.has( doc._id.toString()) && !absentees.has( doc._id.toString()))?.map((item)=>{return {chairNumber:item?.chairNumber,_id:item?._id,chairLocation:item?.chairLocation}})
        const assistantAvailable =  assistantList?.filter((doc)=> !bookedAssistants.has( doc._id.toString()) && !absentees.has( doc._id.toString()))
        const specialistAvailable =  specialist?.filter((doc)=> !bookedSpecialist.has( doc._id.toString()) && !absentees.has( doc._id.toString()))
        console.log({doctorsAvailable,chairAvailable,assistantAvailable,specialistAvailable},'availist')
        res.status(200).json({message:'available slots fetched ',data:{doctorsAvailable,chairAvailable,assistantAvailable,specialistAvailable},status:true})
       // res.json(data)
    } catch (error) {
        next(error)
    }

    // {
    //     _id: new ObjectId('673723faa9ae0bc217ecde85'),
    //     branch: new ObjectId('6736e43eecc4dfe280f90d03'),
    //     chairLocation: 'Third floor',
    //     chairNumber: 'o3',
    //     isActive: true,
    //     createdBy: new ObjectId('6735e64d5c58f271b1ce168c'),
    //     deletedAt: null,
    //     createdAt: 2024-11-15T10:35:38.073Z,
    //     updatedAt: 2024-11-15T10:35:38.073Z,
    //     businessUnit: new ObjectId('673ef64bdc1355e6ca2e61eb'),
    //     __v: 0
    //   }
} 