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

function formatBusinessUnit(chair) {
    return {
        _id: BusinessUnit._id,
        buHead: BusinessUnit.branch ? { _id: BusinessUnit.branch._id, name: BusinessUnit.branch.name } : null,
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

module.exports = { formatChair}