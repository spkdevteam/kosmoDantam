function formatChair(chair) {
    return {
        _id: chair._id,
        branch: chair.branch ? { _id: chair.branch._id, name: chair.branch.name } : null,
        businessUnit: chair.businessUnit ? { _id: chair.businessUnit._id, name: chair.businessUnit.name } : null,
        chairLocation: chair.chairLocation,
        chairNumber: chair.chairNumber,
        isActive: chair.isActive,
        status: chair.status,
        activePatientId: chair.activePatientId ? { _id: chair.activePatientId._id, firstName: chair.activePatientId.firstName, lastName: chair.activePatientId.lastName } : null,
        activeAppointmentId: chair.activeAppointmentId ? { _id: chair.activeAppointmentId._id, displayId: chair.activeAppointmentId.displayId } : null,
        createdBy: chair.createdBy
            ? { _id: chair.createdBy._id, firstName: chair.createdBy.firstName, lastName: chair.createdBy.lastName }
            : null,
        deletedBy: chair.deletedBy
            ? { _id: chair.deletedBy._id, firstName: chair.deletedBy.firstName, lastName: chair.deletedBy.lastName }
            : null,
        updatedBy: chair.updatedBy
            ? { _id: chair.updatedBy._id, firstName: chair.updatedBy.firstName, lastName: chair.updatedBy.lastName }
            : null,
        deletedAt: chair.deletedAt || null,
        createdAt: chair.createdAt || null,
        updatedAt: chair.updatedAt || null,
        __v: chair.__v,
    };
};

function formatDepartment(department) {
    return {
        _id: department._id,
        deptName: department.deptName,
        displayId: department.displayId,
        branchId: department.branchId ? { _id: department.branchId._id, name: department.branchId.name } : null,
        buId: department.buId ? { _id: department.buId._id, name: department.buId.name } : null,
        description: department.description ? department.description : null,
        isActive: department.isActive,
        createdBy: department.createdBy
            ? { _id: department.createdBy._id, firstName: department.createdBy.firstName, lastName: department.createdBy.lastName }
            : null,
        deletedBy: department.deletedBy
            ? { _id: department.deletedBy._id, firstName: department.deletedBy.firstName, lastName: department.deletedBy.lastName }
            : null,
        updatedBy: department.updatedBy
            ? { _id: department.updatedBy._id, firstName: department.updatedBy.firstName, lastName: department.updatedBy.lastName }
            : null,
        deletedAt: department.deletedAt || null,
        createdAt: department.createdAt || null,
        updatedAt: department.updatedAt || null,
        __v: department.__v,
    };
};

function formatService(service) {
    return {
        _id: service._id,
        displayId: service.displayId,
        departmentId: service.departmentId ? { _id: service.departmentId._id, deptName: service.departmentId.deptName } : {},
        serviceName: service.serviceName ? service.serviceName : null,
        description: service.description ? service.description : null,
        isActive: service.isActive,
        branchId: service.branchId ? { _id: service.branchId._id, name: service.branchId.name } : null,
        buId: service.buId ? { _id: service.buId._id, name: service.buId.name } : null,
        price: service.price,
        createdBy: service.createdBy
            ? { _id: service.createdBy._id, firstName: service.createdBy.firstName, lastName: service.createdBy.lastName }
            : null,
        deletedBy: service.deletedBy
            ? { _id: service.deletedBy._id, firstName: service.deletedBy.firstName, lastName: service.deletedBy.lastName }
            : null,
        updatedBy: service.updatedBy
            ? { _id: service.updatedBy._id, firstName: service.updatedBy.firstName, lastName: service.updatedBy.lastName }
            : null,
        deletedAt: service.deletedAt || null,
        createdAt: service.createdAt || null,
        updatedAt: service.updatedAt || null,
        __v: service.__v,
    }
};

function formatProcedure(procedure) {
    return {
        _id: procedure._id,
        services: procedure.services
            ? procedure.services.map(service => ({
                _id: service._id,
                serviceName: service.serviceName
            }))
            : [],
        procedureName: procedure.procedureName,
        displayId: procedure.displayId,
        buId: procedure.buId ? { _id: procedure.buId._id, name: procedure.buId.name } : null,
        branchId: procedure.branchId ? { _id: procedure.branchId._id, name: procedure.branchId.name } : null,
        isActive: procedure.isActive,
        createdBy: procedure.createdBy
            ? { _id: procedure.createdBy._id, firstName: procedure.createdBy.firstName, lastName: procedure.createdBy.lastName }
            : null,
        deletedBy: procedure.deletedBy
            ? { _id: procedure.deletedBy._id, firstName: procedure.deletedBy.firstName, lastName: procedure.deletedBy.lastName }
            : null,
        updatedBy: procedure.updatedBy
            ? { _id: procedure.updatedBy._id, firstName: procedure.updatedBy.firstName, lastName: procedure.updatedBy.lastName }
            : null,
        deletedAt: procedure.deletedAt || null,
        createdAt: procedure.createdAt || null,
        updatedAt: procedure.updatedAt || null,
        __v: procedure.__v,
    }
};

function formatPrescription(prescription) {
    return {
        _id: prescription._id,
        displayId: prescription.displayId,
        additionalAdvice: prescription.additionalAdvice,
        branchId: prescription.branchId ? { _id: prescription.branchId._id, name: prescription.branchId.name } : null,
        buId: prescription.buId ? { _id: prescription.buId._id, name: prescription.buId.name } : null,
        doctorId: prescription.doctorId ? { _id: prescription.doctorId._id, firstName: prescription.doctorId.firstName, lastName: prescription.doctorId.lastName } : null,
        caseSheetId: prescription.caseSheetId ? { _id: prescription.caseSheetId._id, displayId: prescription.caseSheetId.displayId } : null,
        drugArray: prescription.drugArray
            ? prescription.drugArray.map(prescription => ({
                _id: prescription._id,
                drugName: prescription.drugName,
                drug: prescription.drug,
                dosage: prescription.dosage,
                freequency: prescription.freequency,
                duration: prescription.duration,
                instruction: prescription.instruction,
                note: prescription.note,
                timing: prescription.timing,
            }))
            : [],
        patientId: prescription.patientId ? { _id: prescription.patientId._id, firstName: prescription.patientId.firstName, lastName: prescription.patientId.lastName } : null,
        isActive: prescription.isActive,
        createdBy: prescription.createdBy
            ? { _id: prescription.createdBy._id, firstName: prescription.createdBy.firstName, lastName: prescription.createdBy.lastName }
            : null,
        deletedBy: prescription.deletedBy
            ? { _id: prescription.deletedBy._id, firstName: prescription.deletedBy.firstName, lastName: prescription.deletedBy.lastName }
            : null,
        updatedBy: prescription.updatedBy
            ? { _id: prescription.updatedBy._id, firstName: prescription.updatedBy.firstName, lastName: prescription.updatedBy.lastName }
            : null,
        deletedAt: prescription.deletedAt || null,
        createdAt: prescription.createdAt || null,
        updatedAt: prescription.updatedAt || null,
        __v: prescription.__v,
    }
};

function formatEmployee(employee) {
    return {
        _id: employee._id,
        displayId : employee?.displayId ? employee?.displayId : null,
        rid : employee?.roleId ? employee?.roleId : null,
        role: employee.role ? { _id: employee.role._id, name: employee.role.name } : null,
        branch: employee.branch ? { _id: employee.branch._id, name: employee.branch.name } : null,
        businessUnit: employee.businessUnit ? { _id: employee.businessUnit._id, name: employee.businessUnit.name } : null,
        roleId: employee.roleId ? { _id: employee.roleId._id, name: employee.roleId.name } : null,
        firstName: employee.firstName ? employee.firstName : "",
        lastName: employee.lastName ? employee.lastName : "",
        email: employee.email ? employee.email : "",
        phone: employee.phone ? employee.phone : "",
        tc: employee.tc ? employee.tc : "",
        isUserVerified: employee.isUserVerified ? true : false,
        isActive: employee.isActive ? true : false,
        gender: employee.gender,
        age: employee.age,
        bloodGroup: employee.bloodGroup,
        patientGroup: employee.patientGroup,
        referedBy: employee.referedBy ? { _id: employee.referedBy._id, firstName: employee.referedBy.firstName, lastName: employee.referedBy.lastName } : null,
        profileImage: employee.profileImage ? employee.profileImage : "",
        profileCreated: employee.profileCreated ? true : false,
        panNumber: employee.panNumber ? employee.panNumber : "",
        adharNumber: employee.adharNumber ? employee.adharNumber : "",
        city: employee.city ? employee.city : "",
        state: employee.state ? employee.state : "",
        country: employee.country ? employee.country : "",
        ZipCode: employee.ZipCode ? employee.ZipCode : "",
        address: employee.address ? employee.address : "",
        dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth : null,
        optionalEmail: employee.optionalEmail ? employee.optionalEmail : "",
        emergencyPhone: employee.emergencyPhone ? employee.emergencyPhone : "",
        activePatientId: employee.activePatientId ? { _id: employee.activePatientId._id, firstName: employee.activePatientId.firstName, lastName: employee.activePatientId.lastName } : null,
        createdBy: employee.createdBy
            ? { _id: employee.createdBy._id, firstName: employee.createdBy.firstName, lastName: employee.createdBy.lastName }
            : null,
        deletedBy: employee.deletedBy
            ? { _id: employee.deletedBy._id, firstName: employee.deletedBy.firstName, lastName: employee.deletedBy.lastName }
            : null,
        updatedBy: employee.updatedBy
            ? { _id: employee.updatedBy._id, firstName: employee.updatedBy.firstName, lastName: employee.updatedBy.lastName }
            : null,
        deletedAt: employee.deletedAt || null,
        createdAt: employee.createdAt || null,
        updatedAt: employee.updatedAt || null,
        __v: employee.__v,
    };
};

function formatAppointment(appointment) {
    return {
        _id: appointment._id,
        buId: appointment.buId ? { _id: appointment.buId._id, name: appointment.buId.name } : null,
        displayId: appointment.displayId,
        branchId: appointment.branchId ? { _id: appointment.branchId._id, name: appointment.branchId.name } : null,
        caseSheetId: appointment.caseSheetId ? { _id: appointment.caseSheetId._id, displayId: appointment.caseSheetId.displayId } : null,
        token: appointment.token,
        date: appointment.date,
        caseId: appointment.caseId ? { _id: appointment.caseId._id, displayId: appointment.caseId.displayId } : null,
        dutyDoctorId: appointment.dutyDoctorId
        ? { _id: appointment.dutyDoctorId._id, firstName: appointment.dutyDoctorId.firstName, lastName: appointment.dutyDoctorId.lastName }
        : null,
        specialistDoctorId: appointment.specialistDoctorId
        ? { _id: appointment.specialistDoctorId._id, firstName: appointment.specialistDoctorId.firstName, lastName: appointment.specialistDoctorId.lastName }
        : null,
        dentalAssistant: appointment.dentalAssistant
        ? { _id: appointment.dentalAssistant._id, firstName: appointment.dentalAssistant.firstName, lastName: appointment.dentalAssistant.lastName }
        : null,
        slotFrom: appointment.slotFrom,
        slotTo: appointment.slotTo,
        chairId: appointment.chairId ? { _id: appointment.chairId._id, chairNumber: appointment.chairId.chairNumber } : null,
        patientId: appointment.patientId ? { _id: appointment.patientId._id, firstName: appointment.patientId.firstName } : null,
        status: appointment.status,
        chiefComplaint: appointment.chiefComplaint,
        isActive: appointment.isActive ? true : false,
        createdBy: appointment.createdBy
            ? { _id: appointment.createdBy._id, firstName: appointment.createdBy.firstName, lastName: appointment.createdBy.lastName }
            : null,
        deletedBy: appointment.deletedBy
            ? { _id: appointment.deletedBy._id, firstName: appointment.deletedBy.firstName, lastName: appointment.deletedBy.lastName }
            : null,
        updatedBy: appointment.updatedBy
            ? { _id: appointment.updatedBy._id, firstName: appointment.updatedBy.firstName, lastName: appointment.updatedBy.lastName }
            : null,
        deletedAt: appointment.deletedAt || null,
        createdAt: appointment.createdAt || null,
        updatedAt: appointment.updatedAt || null,
    }
}
// services: procedure.services 
// ? procedure.services.map(service => ({
//     _id: service._id,
//     serviceName: service.serviceName
// }))
// : [],

module.exports = { formatChair, formatDepartment, formatService, formatProcedure, formatPrescription, formatEmployee, formatAppointment };