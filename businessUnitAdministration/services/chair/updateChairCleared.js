const { default: mongoose } = require("mongoose")
const clinetChairSchema = require("../../../client/model/chair")
const { getClientDatabaseConnection } = require("../../../db/connection")

const updateChairCleared = async ({ clientId, chairId, patientId }) => {
    try {
        if (!clientId) return { status: false, message: 'clientId is not valid' }
        if (!chairId) return { status: false, message: 'chairId is not valid' }
        if (!patientId) return { status: false, message: 'patientId   is not valid' }
        const db = await getClientDatabaseConnection(clientId)
        const Chairs = db.model('chair', clinetChairSchema)
        const result = await Chairs.findOne({ _id: chairId })
        const selectedChair = result?.toObject()
        console.log(selectedChair, 'selectedChair')
        // if(selectedChair?.status  !== 'Ready' && selectedChair?.activePatientId){
        //     return {status:false, message:'chair is busy with other patient '}
        // }
        // else
        //  if (selectedChair?.status  !== 'Ready' && !selectedChair?.activePatientId){
        //     return {status:false, message:'chair is getting ready  '}
        // }
        // else {
        const updated = await Chairs.
            updateOne({
                _id: new mongoose.Types.ObjectId(selectedChair?._id),
                activePatientId: new mongoose.Types.ObjectId(patientId)
            }, {
                $set: {
                    status: 'Ready',
                    activePatientId: null,
                    activeAppointmentId:null
                }
            })

        if (updated.modifiedCount) {
            return { status: true, message: 'chair is getting ready  ' }
        }
        else {
            return { status: false, message: 'no changes done  ' }
        }
        // }

    } catch (error) {
        return { status: false, message: error?.message }
    }
}

module.exports = updateChairCleared