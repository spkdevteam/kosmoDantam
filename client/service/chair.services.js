// services/chairService.js
const { getClientDatabaseConnection } = require("../../db/connection");
const clinetChairSchema = require("../../client/model/chair");

const message = require("../../utils/message");
const statusCode = require("../../utils/http-status-code");

const CustomError = require("../../utils/customeError");
const clinetBranchSchema = require("../model/branch");


const createChair = async (clientId, chairData) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);

        const existingChair = await Chair.findOne({
            $or: [{ chairNumber: chairData.chairNumber },
            // { chairLocation: chairData?.chairLocation }
            ],
            deletedAt: null,
            branch : chairData?.branch,
            businessUnit : chairData?.businessUnit
        });

        if (existingChair) {
            throw new CustomError(statusCode.Conflict, message.lblChairhAlreadyExists);
        }

        return await Chair.create(chairData);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating chair: ${error.message}`);
    }
};

const updateChair = async (clientId, chairId, updateData) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);

        const chair = await Chair.findById(chairId);
        if (!chair) {
            throw new CustomError(statusCode.NotFound, message.lblChairNotFound);
        }

        const existingChair = await Chair.findOne({
            $and: [
                { _id: { $ne: chairId } },
                {
                    $or: [
                        // { chairLocation: updateData?.chairLocation },
                        { chairNumber: updateData?.chairNumber },
                    ],
                },
            ],
        }).lean();

        if (existingChair) {
            throw new CustomError(statusCode.Conflict, message.lblChairhAlreadyExists);
        }

        // Update chair properties
        Object.assign(chair, updateData);
        return await chair.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error updating chair: ${error.message}`);
    }
};

const activeInactiveChair = async (clientId, chairId, updateData) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);

        const chair = await Chair.findById(chairId);

        if (!chair) {
            throw new CustomError(statusCode.NotFound, message.lblChairNotFound);
        }
        // Update chair properties
        Object.assign(chair, updateData);
        return await chair.save();

    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error active inactive chair: ${error.message}`);
    }
};

const getChairById = async (clientId, chairId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);

        const chair = await Chair.findById(chairId);
        if (!chair) {
            throw new CustomError(statusCode.NotFound, message.lblChairNotFound);
        }

        return chair;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error getting chair: ${error.message}`);
    }
};

const listChairs = async (clientId, filters = {}, options = { page: 1, limit: 10 }) => {
    try {
        console.log(clientId,filters,options,'clientId,filters,options')

        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const { page, limit } = options;
        const skip = (page - 1) * limit;
        const [chairs, total] = await Promise.all([
            Chair.find(filters).skip(skip).limit(limit).sort({ _id: -1 }).populate({
                path: 'branch',
                model: Branch,
                select: 'displayId name _id'
            }),
            Chair.countDocuments(filters),
        ]);
        return { count: total, chairs };

    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing chair: ${error.message}`);

    }
};

const deleteChair = async (clientId, chairId, softDelete = true, id) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);

        const chair = await Chair.findById(chairId);
        if (!chair) {
            throw new CustomError(statusCode.NotFound, message.lblChairNotFound);
        }

        if (softDelete) {
            chair.deletedAt = new Date();
            chair.deletedBy = id;
            await chair.save();
        } else {
            await chair.remove();
        }

        return chair;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error soft delete chair: ${error.message}`);
    }
};

const restoreChair = async (clientId, chairId) => {

    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);

        const chair = await Chair.findById(chairId);
        if (!chair) {
            throw new CustomError(statusCode.NotFound, message.lblChairNotFound);
        }

        chair.deletedAt = null;
        chair.deletedBy = null;
        await chair.save();

        return chair;

    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error soft delete chair: ${error.message}`);

    }
};

module.exports = {
    createChair,
    updateChair,
    getChairById,
    listChairs,
    activeInactiveChair,
    deleteChair,
    restoreChair
};
