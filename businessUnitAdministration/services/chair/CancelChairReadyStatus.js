const { default: mongoose } = require("mongoose")
const clinetChairSchema = require("../../../client/model/chair")
const { getClientDatabaseConnection } = require("../../../db/connection")

const CancelChairReadyStatus = async ({ clientId, chairId, patientId,appointmentId }) => {
    try {
        if (!clientId) return { status: false, message: 'clientId is not valid' }
        if (!chairId) return { status: false, message: 'chairId is not valid' }
        if (!patientId) return { status: false, message: 'patientId   is not valid' }
        const db = await getClientDatabaseConnection(clientId)
        const Chairs = db.model('chair', clinetChairSchema)
        const result = await Chairs.findOne({ _id: chairId })
        const selectedChair = result?.toObject()
        const updated = await Chairs.updateOne({ _id: new mongoose.Types.ObjectId(selectedChair?._id) }, { $set: { activeAppointmentId:null ,activePatientId: null, status: 'Ready' } })

        if (updated.modifiedCount) {
            return { status: true, message: 'chair is getting ready ' }
        }
        else {
            return { status: false, message: 'no changes done  ' }
        }


    } catch (error) {
        return { status: false, message: error?.message }
    }
}

module.exports = CancelChairReadyStatus