const { default: mongoose } = require("mongoose")
const { getClientDatabaseConnection } = require("../../../db/connection")

const { validateObjectId } = require("../validate.serialNumber")
const appointmentSchema = require("../../../client/model/appointments")

const cancelPatientChairReadyStatus = async ({ clientId, patientId, appointmentId }) => {
    try {
        if (!clientId) return { status: false, message: 'clientId is not valid' }
        if (!appointmentId) return { status: false, message: 'Appointment  is not valid' }
        if (!patientId) return { status: false, message: 'patientId   is not valid' }
        
        const db = await getClientDatabaseConnection(clientId)
        console.log( clientId, patientId, appointmentId,' clientId, patientId, appointmentId')
        const Appointment = await  db.model('appointment', appointmentSchema)
        const result = await Appointment.findOne({ _id: appointmentId, deletedAt: null })
        const selectedAppointment  = result?.toObject() 
        
        if (!Object.keys(selectedAppointment)?.length) return { status: false, message: 'no appointment found on this id' }
        
        if (selectedAppointment.status != 'Chair ready' && !selectedAppointment?.token) return { status: false, message: 'patient has not arrived yet ' }
        else if (selectedAppointment.status != 'Chair ready' && selectedAppointment?.token) return { status: false, message: 'Cant revoke an ongoing Consultation ' }

        const updateAppoinment = await Appointment.updateOne({_id:new mongoose.Types.ObjectId(appointmentId)},{$set:{status:'Arrived'}})
        console.log(updateAppoinment,'updateAppoinment')
        if (updateAppoinment?.modifiedCount){
            return { status: true, message: 'chair is ready for patient   ' }
        }
        else {
            return { status: false, message: 'no changes done   ' }
        }



    } catch (error) {

    }

}

module.exports = cancelPatientChairReadyStatus