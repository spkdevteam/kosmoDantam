// appointments = [ {
//     appointmentId: "ap001",
//     branchId:'br0001',
//     token:'01',
//     date: '25/11/2024',
//     caseId: 'case001',
//     dutyDoctor:'Doctor 1',
//     dentalAssisteant:'Assistant One',
//     slotFrom:'10:10:00',
//     slotTo:'10:20:00',
//     chair:'Chair1',
//     patientId:'p00001',
//     status:'arrived'|| 'chairReady'|| 'inProgress'||'Completed'||'Cancelled'||'Rescheduled',
//     isActive:true,
//     deletedAt:null,
//     createdUser:'empo001'
// }]
const mongoose = require('mongoose');
 
const appointmentSchema = new mongoose.Schema({
    displayId: { type: String, required: true }, // Unique display identifier
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'branch', required: true,index:true }, // Reference to the branch
    token: { type: String, default: null  }, // Default value for token
    date: { type: String, required: true }, // Date in string format (should ideally be Date type)
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'medicalcase', required: true,index:true }, // Case identifier
    dutyDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'clientusers', required: true,index:true }, // Name of the doctor
    dentalAssistant: { type: mongoose.Schema.Types.ObjectId, ref: 'clientusers', required: true,index:true }, // Name of the dental assistant
    slotFrom: { type: String, required: true }, // Start time of the slot (consider using Date for precise control)
    slotTo: { type: String, required: true }, // End time of the slot
    chairId: { type: mongoose.Schema.Types.ObjectId, ref: 'chair', required: true,index:true },  // Chair information
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'clientusers', required: true,index:true }, // Patient identifier
    status: { 
        type: String, 
        enum: [ 'booked','arrived', 'chairReady', 'inProgress', 'Completed', 'Cancelled', 'Rescheduled'], 
        default: 'booked' 
    }, // Appointment status with restricted values
    isActive: { type: Boolean, default: true }, // Active status
    deletedAt: { type: Date, default: null }, // Deletion timestamp
    createdUser: { type: String, required: true } // User who created the record
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps


const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = appointmentSchema;
