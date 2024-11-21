



const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const clinetChairSchema = require("../../client/model/chair");



const chairService = require("../../client/service/chair.services")






// create Chair by business unit
exports.createChairByBusinessUnit = async (req, res, next) => {

    try {

        // Destructure fields from request body
        const { clientId, chairLocation, chairNumber, createdBy, branchId } = req.body;

        const mainUser = req.user;

        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }

        // Check if required fields are missing
        if (!chairLocation || !chairNumber) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }

        const clientConnection = await getClientDatabaseConnection(clientId);

        const Branch = clientConnection.model('branch', clinetBranchSchema);

        const branch = await Branch.findById(branchId);

        if (!branch) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchNotFound,
            });
        }

        // create new chair with service
        const newChair = await chairService.createChair(clientId, {
            chairLocation,
            chairNumber,
            branch: branchId,
            createdBy : mainUser._id,
        });

        return res.status(statusCode.OK).send({
            message: message.lblChairCreatedSuccess,
            data: { chairId: newChair._id, chairLocation: newChair.chairLocation },
        });

    } catch (error) {
        next(error)
    }
};

// update branch by business unit
exports.updateChairByBusinessUnit = async (req, res, next) => {

    try {
        // Destructure fields from request body
        const { chairId, clientId, chairLocation, chairNumber, } = req.body;

        // Check if branchId and clientId are provided
        if (!chairId || !clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblChairIdIdAndClientIdRequired,
            });
        }

        // Check if required fields are missing
        if (!chairLocation || !chairNumber) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }

        const updatedChair = await chairService.updateChair(clientId, chairId, {
            chairLocation,
            chairNumber,
        });



        return res.status(statusCode.OK).send({
            message: message.lblChairUpdatedSuccess,
            data: { chairId: updatedChair._id, chairLocation: updatedChair.chairLocation },
        });

    } catch (error) {

        next(error);
    }
};

// get particular chair by business unit
exports.getParticularChairByBusinessUnit = async (req, res, next) => {
    try {
        const { clientId, chairId } = req.params; // Extract clientId and branchId from request params

        // Validate inputs
        if (!clientId || !chairId) {
            return res.status(400).send({
                message: message.lblChairIdIdAndClientIdRequired,
            });
        }

        const chair = await chairService.getChairById(clientId, chairId);

        return res.status(200).send({
            message: message.lblChairFoundSucessfully,
            data: chair,
        });

    } catch (error) {
        next(error)
    }
};

// list chair by business unit
// exports.listChair = async (req, res, next) => {
//     try {
//         const { clientId, keyword = '', page = 1, perPage = 10 } = req.query;

//         const searchText = keyword ? keyword.trim() : '';

//         if (!clientId) {
//             return res.status(statusCode.BadRequest).send({
//                 message: message.lblClinetIdIsRequired,
//             });
//         }

//         let filters = {
//             deletedAt: null,
//         };

//         if (searchText) {
//             filters.$or = [
//                 { chairLocation: { $regex: searchText, $options: "i" } },
//                 { chairNumber: { $regex: searchText, $options: "i" } },
//             ];
//         }

//         const result = await chairService.listChairs(clientId, filters, { page, limit: perPage });

//         return res.status(statusCode.OK).send({
//             message: message.lblChairFoundSucessfully,
//             data: result,
//         });
//     } catch (error) {
//         next(error) 
//     }
// };
exports.listChair = async (req, res, next) => {
    try {
        const { clientId, keyword = '', page = 1, perPage = 10 } = req.query;

        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }

        const filters = {
            deletedAt: null,
            ...(keyword && {
                $or: [
                    { chairLocation: { $regex: keyword.trim(), $options: "i" } },
                    { chairNumber: { $regex: keyword.trim(), $options: "i" } },
                ],
            }),
        };

        const result = await chairService.listChairs(clientId, filters, { page, limit: perPage });

        return res.status(statusCode.OK).send({
            message: message.lblChairFoundSucessfully,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


// active inactive chair by Business unit
// exports.activeinactiveChairByBusinessUnit = async (req, res, next) => {


//     try {
//         const { keyword, page, perPage, status, chairId, clientId } = req.body;
//         req.query.keyword = keyword;
//         req.query.page = page;
//         req.query.perPage = perPage;
//         req.query.clientId = clientId;


//         // Validate inputs
//         if (!clientId || !chairId) {
//             return res.status(400).send({
//                 message: message.lblChairIdIdAndClientIdRequired,
//             });
//         }

//         const updatedChair = await chairService.updateChair(clientId, chairId, {
//             isActive : status === "1"
//         });

//         // // Get client database connection
//         // const clientConnection = await getClientDatabaseConnection(clientId);
//         // const Chair = clientConnection.model('chair', clinetChairSchema);


//         // // Find the business unit by ID
//         // const chair = await Chair.findById(chairId)

//         // if (!chair) {
//         //     return res.status(statusCode.ExpectationFailed).send({
//         //         message: message.lblChairNotFound,
//         //     });
//         // }

//         // chair.isActive = status === "1";
//         // await chair.save();

//         this.listChair(req, res, next);

//     } catch (error) {


//        next(error)

//     }
// };

exports.activeinactiveChairByBusinessUnit = async (req, res, next) => {
    try {
        const { status, chairId, clientId } = req.body;

        // Validate inputs
        if (!clientId || !chairId) {
            return res.status(400).send({
                message: message.lblChairIdIdAndClientIdRequired,
            });
        }

        const updatedChair = await chairService.activeInactiveChair(clientId, chairId, {
            isActive: status === "1",
        });

        // Optionally, you can return the updated chair details if needed
        return res.status(statusCode.OK).send({
            message: message.lblChairUpdatedSuccess,
            data: updatedChair,
        });
    } catch (error) {
        next(error);
    }
};

// // Soft delete chair by business unit
exports.softDeleteChairByBusinesssUnit = async (req, res, next) => {

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

        await chairService.deleteChair(clientId, chairId, softDelete = true)

        this.listChair(req, res, next);


    } catch (error) {
        next(error);
    }
};

// restore chair
exports.restoreChairByBusinessUnit = async (req, res, next) => {

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

        await chairService.restoreChair(clientId, chairId)
      
        this.listChair(req, res, next);


    } catch (error) {

        next(error)
    }
};





