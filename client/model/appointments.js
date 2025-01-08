
const mongoose = require('mongoose');
 
const appointmentSchema = new mongoose.Schema({
    buId:{ type: mongoose.Schema.ObjectId, ref: 'businessUnit',index:true },
    displayId: { type: String, required: true }, 
    branchId: { type: mongoose.Schema.ObjectId, ref: 'branch', required: true,index:true },
    caseSheetId: { type: mongoose.Schema.ObjectId, ref: 'caseSheet', required: true,index:true },
    token: { type: String, default: null  }, 
    date: { type: Date, required: true }, 
    caseId: { type: mongoose.Schema.ObjectId, ref: 'caseSheet', index:true },
    dutyDoctorId: { type: mongoose.Schema.ObjectId, ref: 'clientUsers', required: true,index:true },
    specialistDoctorId: { type: mongoose.Schema.ObjectId, ref: 'clientUsers',index:true },
    dentalAssistant: { type: mongoose.Schema.ObjectId, ref: 'clientUsers', index:true }, 
    slotFrom: { type: Date  }, 
    slotTo: { type: Date }, 
    chairId: { type: mongoose.Schema.ObjectId, ref: 'chair', required: true,index:true },  
    patientId: { type: mongoose.Schema.ObjectId, ref: 'patient', required: true,index:true },
    status: { 
        type: String, 
        default: 'Scheduled' 
    }, 
    chiefComplaint:{type:String},
    isActive: { type: Boolean, default: true }, 
    deletedAt: { type: Date, default: null }, 
    // createdUser: { type: String, required: true }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps


const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = appointmentSchema;
