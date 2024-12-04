const mongoose = require('mongoose')

const leaveRegisterSchema = mongoose.Schema({
        displayId:{type:String},
        employeeId: { type: mongoose.Schema.ObjectId, ref: 'Employee', required: true, description: 'Reference to the Employee applying for leave.' },
        leaveType: { type: String, enum: ['Sick', 'Casual', 'Annual', 'Maternity', 'Paternity', 'Other'], required: true, description: 'Type of leave being requested.', },
        appliedDate: {type: Date,default: Date.now()},approvedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Manager',},
        startDate: { type: Date, required: true, description: 'Start date of the leave period.', }, 
        startTime: { type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/, description: 'Start time in HH:mm format', required: true,default:"09:00" },
        endDate: { type: Date, required: true, description: 'End date of the leave period.', }, 
        endTime: { type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/, description: 'End time in HH:mm format', required: true,default:"17:00" },
        reason: { type: String, maxlength: 500, description: 'Reason for the leave request.', }, 
        status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'], default: 'Pending', description: 'Current status of the leave application.', },
        approverId: { type: mongoose.Schema.ObjectId, ref: 'Employee', description: 'Reference to the approver of the leave application.', },
        comments: { type: String, maxlength: 500, description: 'Approver comments or notes regarding the application.', }, 
        createdAt: { type: Date, default: Date.now, description: 'Timestamp when the application was created.', }, 
        updatedAt: { type: Date, default: Date.now, description: 'Timestamp when the application was last updated.', }, 
        deletedAt: { type: Date, default: null, description: 'Soft delete flag for the leave application.', }, 
        rejectionReason: {type: String,maxlength: 500,required: function() {return this.status === 'Rejected';}},
        buId:{type:mongoose.Schema.ObjectId, ref:'businessunits',index:true},
        branchId:{type:mongoose.Schema.ObjectId, ref:'branch',index:true},
        isActive:{type:Boolean,default:true}
    }, { timestamps: true})

module.exports = leaveRegisterSchema 

