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
}

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
}

// services: procedure.services 
// ? procedure.services.map(service => ({
//     _id: service._id,
//     serviceName: service.serviceName
// }))
// : [],

module.exports = { formatChair, formatDepartment, formatService, formatProcedure };