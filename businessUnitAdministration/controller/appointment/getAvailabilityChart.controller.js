 
const httpStatusCode = require("../../../utils/http-status-code")
const message = require("../../../utils/message")
const sanitizeBody = require("../../../utils/sanitizeBody")
const generateAvailabiltyChart = require("../../services/appointment/getAvailabiltyChartService")
const { getchairList } = require("../../services/chairs.service")
const { listEmployeeByRole } = require("../../services/clientUser.service")
const { validateObjectId } = require("../../services/validate.serialNumber")



const getAvailabilityChartCtrl = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query);
        console.log(data,'ata backend ')
         if (! await validateObjectId({ clientid: data?.clientId, objectId: data?.branchId, collectionName: 'branch' })) res.json( { status: false, message: message.lblTryWithValidBranch, statusCode: httpStatusCode.Unauthorized });
        //taking the full list of chairs ,assistant,chairliist from client db 
        else {
        const doctorsList = await listEmployeeByRole({ roleId:3, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[];
        const assistantList   = await listEmployeeByRole({ roleId:4, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[];
        const chairList = await getchairList({roleId:3, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[];
        const specialist = await listEmployeeByRole({ roleId:15, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[];
        // taking the engaged list of doctors , chairs ,dental Assistant
        const result = await generateAvailabiltyChart(data);
        const {bookedDoctors, bookedChairs, bookedAssistants, bookedSpecialist, absentees } = result;
        //console.log(bookedDoctors, bookedChairs, bookedAssistants,bookedSpecialist,'bookedDoctors, bookedChairs, bookedAssistants ' )

        if(data?.startTime > data?.endTime) {
            return res.status(200).json({ message:'available slots fetched', data: { doctorsAvailable: [],chairAvailable: [],assistantAvailable: [],specialistAvailable: []} , status:true });
        }

        
        
        //comparing the enagaed one with all details and return available list
        const doctorsAvailable = [...doctorsList,...specialist]?.filter((doc) => {
            if (data?.doctorId) {
                // Match specific doctor if doctorId is provided
                return doc._id.toString() === data.doctorId;
            } else {
                // Exclude doctors in the bookedDoctors set
                return !bookedDoctors.has(doc._id.toString());
            }
        });

        console.log(bookedDoctors, "bookedDoctorbookedDoctorbookedDoctorbookedDoctorbookedDoctor");
        console.log(doctorsAvailable, "doctorsAvailabledoctorsAvailabledoctorsAvailabledoctorsAvailable");

        const chairAvailable = chairList?.filter((doc) => {
            if (data?.chairId) {
                // Include only the chair matching `data.chairId`
                return doc._id.toString() === data.chairId;
            } else {
                // Exclude chairs in the `bookedChairs` set
                return !bookedChairs?.has(doc._id.toString());
            }
        }).map((item) => {
            return {
                chairNumber: item?.chairNumber,
                _id: item?._id,
                chairLocation: item?.chairLocation,
            };
        });
        
        const assistantAvailable =  assistantList?.filter((doc)=> !bookedAssistants?.has( doc._id.toString()) && !absentees.has( doc._id.toString()))||[]
        const specialistAvailable =  specialist?.filter((doc)=> !bookedSpecialist?.has( doc._id.toString()) && !absentees.has( doc._id.toString()))||[]
      
        res.status(200).json({message:'available slots fetched',data:{doctorsAvailable,chairAvailable,assistantAvailable,specialistAvailable},status:true});
       // res.json(data) 
    }
    } catch (error) {
        next(error)
    }

} 
module.exports = getAvailabilityChartCtrl