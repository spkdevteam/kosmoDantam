



const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const clinetChairSchema = require("../../client/model/chair");





// create Chair by business unit
exports.createChairByBusinessUnit = async (req, res) => {

    try {

        // Destructure fields from request body
        const { clientId, chairLocation, chairNumber, createdBy, branchId } = req.body;
        console.log(req.body)
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }

        // Check if required fields are missing
        if (!chairLocation || !chairNumber ) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }

        const clientConnection = await getClientDatabaseConnection(clientId);

        const Chair = clientConnection.model('chair', clinetChairSchema);
        const Branch = clientConnection.model('branch', clinetBranchSchema);

        const branch = await Branch.findById(branchId);

        if(!branch){
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchNotFound,
            });

        }

        const existingChair = await Chair.findOne({
            $or: [ { chairNumber }],
        });

        if (existingChair) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblChairhAlreadyExists,
            });
        }

        // Create new chair 
        const newChair = await Chair.create(
            [
                {
                    chairLocation, chairNumber, branch : branchId, createdBy : createdBy
                 },
            ],
        );

        return res.status(statusCode.OK).send({
            message: message.lblChairCreatedSuccess,
            data: { chairId: newChair[0]._id, chairLocation: newChair[0].chairLocation },
        });

    } catch (error) {
        console.error("Error in createChair:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message, // Optional: Include detailed error message for debugging
        });
    }
};

// // update branch by business unit
exports.updateChairByBusinessUnit = async (req, res) => {

    try {
        // Destructure fields from request body
        const { chairId, clientId, chairLocation, chairNumber,} = req.body;

        // Check if branchId and clientId are provided
        if (!chairId || !clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblChairIdIdAndClientIdRequired,
            });
        }

        // Check if required fields are missing
        if (!chairLocation || !chairNumber ) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }

        // Get the client-specific database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);

        // Find the branch to be updated
        const chair = await Chair.findById(chairId);
        if (!chair) {
            return res.status(statusCode.NotFound).send({
                message: message.lblChairNotFound,
            });
        }

        // Check if email or contact number is already used by another branch
        const existingChair = await Chair.findOne({
            $and: [
                { _id: { $ne: chairId } },
                {
                    $or: [
                        { chairLocation: chairLocation },
                        { chairNumber: chairNumber },
                    ],
                },
            ],
        });

        if (existingChair) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblChairhAlreadyExists,
            });
        }

        

        // Update branch details
        branch.chairLocation = chairLocation;
        branch.chairNumber = chairNumber;

        // Save the updated branch
        await chair.save();

        return res.status(statusCode.OK).send({
            message: message.lblChairCreatedSuccess,
            data: { chairId: chair._id, chairLocation: chair.chairLocation },
        });

    } catch (error) {
        console.error("Error in updateChair:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// // get particular chair by business unit
exports.getParticularChairByBusinessUnit = async (req, res) => {
    try {
        const { clientId, chairId } = req.params; // Extract clientId and branchId from request params

        // Validate inputs
        if (!clientId || !chairId) {
            return res.status(400).send({
                message: message.lblChairIdIdAndClientIdRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);

        // Fetch the chair by ID
        const chair = await Chair.findById(chairId);

        if (!chair) {
            return res.status(404).send({
                message: message.lblChairNotFound
            });
        }

        // Respond with branch data
        return res.status(200).send({
            message: message.lblChairFoundSucessfully,
            data: chair,
        });

    } catch (error) {
        console.error("Error in getChairById:", error);

        // Handle errors
        return res.status(500).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// // list Chair for business unit
exports.listChair = async (req, res) => {
    try {

        const clientId = req.query.clientId;
        const searchText = req.query.keyword ? req.query.keyword.trim() : '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.perPage) || 10;
        const skip = (page - 1) * limit;


        let whereCondition = {
            deletedAt: null,
        };

        if (searchText) {
            whereCondition.$or = [
                { chairLocation: { $regex: searchText, $options: "i" } },
                { chairNumber: { $regex: searchText, $options: "i" } },
            ];
        }


        // Validate inputs
        if (!clientId) {
            return res.status(400).send({
                message: message.lblClinetIdIsRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);


        const [chairs, count] = await Promise.all([
            Chair.find(whereCondition)
                .skip(skip)
                .limit(limit)
                .sort({ _id: 'desc' }),
                Chair.countDocuments(whereCondition),
        ]);

        return res.json({
            message: 'List of all Chairs!',
            count: count,
            listOfChair: chairs,
        });


    } catch (error) {
        console.error("Error in listChairs:", error);

        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// // active inactive chair by Business unit
exports.activeinactiveChairByBusinessUnit = async (req, res) => {


    try {
        const { keyword, page, perPage, status, chairId, clientId } = req.body;
        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        req.query.clientId = clientId;


        // Validate inputs
        if (!clientId || !chairId) {
            return res.status(400).send({
                message: message.lblChairIdIdAndClientIdRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);


        // Find the business unit by ID
        const chair = await Chair.findById(chairId)

        if (!chair) {
            return res.status(statusCode.ExpectationFailed).send({
                message: message.lblChairNotFound,
            });
        }

        chair.isActive = status === "1";
        await chair.save();

        this.listChair(req, res);

    } catch (error) {


        console.error("Error in activeinactiveBusinessUnit:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });

    }
};

// // Soft delete chair by business unit
exports.softDeleteChairByBusinesssUnit = async (req, res) => {

    try {

        const { keyword, page, perPage, chairId, clientId } = req.body;

        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        req.query.clientId = clientId;


        // Validate inputs
        if (!clientId || !chairId) {
            return res.status(400).send({
                message: message.lblChairIdIdAndClientIdRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);


        const chair = await Chair.findById(chairId)

        if (!chair) {
            return res.status(statusCode.ExpectationFailed).send({
                message: message.lblChairNotFound,
            });
        }

        chair.deletedAt = new Date();
        await chair.save()
        this.listChair(req, res);


    } catch (error) {
        console.error("Error in softDeleteChair:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// // restore chair
exports.restoreChairByBusinessUnit = async (req, res) => {

    try {

        const { keyword, page, perPage, chairId, clientId } = req.body;

        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;

        // Validate inputs
        if (!clientId || !chairId) {
            return res.status(400).send({
                message: message.lblChairIdIdAndClientIdRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Chair = clientConnection.model('chair', clinetChairSchema);


        const chair = await Chair.findById(chairId)

        if (!chair) {
            return res.status(statusCode.ExpectationFailed).send({
                message: message.lblChairNotFound,
            });
        }

        chair.deletedAt = null;
        await chair.save();
        this.listChair(req, res);


    } catch (error) {

        console.error("Error in restoreChair:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};





