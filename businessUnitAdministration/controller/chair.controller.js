



const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const clinetChairSchema = require("../../client/model/chair");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit")



const chairService = require("../../client/service/chair.services");
const getserialNumber = require("../../model/services/getserialNumber");
const sanitizeBody = require("../../utils/sanitizeBody");
const updateChairStatus = require("../services/chair/updateChairStatus");
const updateChairStatustoReady = require("../services/chair/updateChairStatus");
const updatePatientStatustoChairReady = require("../services/appointment/updatePatientStatustoChairReady");
const updateChairStatusInprogress = require("../services/chair/updateChairStatusInprogress");
const updatePatientStatustoInprogress = require("../services/appointment/updatePatientStatustoInprogress");
const updateChairCleared = require("../services/chair/updateChairCleared");
const updatePatientBookingCompleted = require("../services/appointment/updatePatientBookingCompleted");
const CancelChairReadyStatus = require("../services/chair/CancelChairReadyStatus");
const cancelPatientChairReadyStatus = require("../services/appointment/cancelPatientChairReadyStatus");






// create Chair by business unit
exports.createChairByBusinessUnit = async (req, res, next) => {

    try {

        // Destructure fields from request body
        const { clientId, chairLocation, chairNumber, branchId, businessUnit } = req.body;

        const mainUser = req.user;

        console.log(req.body)
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
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);


        const branch = await Branch.findById(branchId);

        if (!branch) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchNotFound,
            });
        }

        const bu = await BusinessUnit.findById(businessUnit)

        if (!bu) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBusinessUnitNotFound,
            });
        }

        // create new chair with service
        const newChair = await chairService.createChair(clientId, {
            chairLocation,
            chairNumber,
            branch: branchId,
            createdBy: mainUser._id,
            businessUnit: businessUnit,
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

        const mainUser = req.user;

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
            updatedBy: mainUser._id,
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
        const { clientId, keyword = '', page = 1, perPage = 10, isAdmin = true, branchId } = req.query;

        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }

        let filters = {
            deletedAt: null,
            ...(keyword && {
                $or: [
                    { chairLocation: { $regex: keyword.trim(), $options: "i" } },
                    { chairNumber: { $regex: keyword.trim(), $options: "i" } },
                ],
            }),
        };

        if (isAdmin == "false" && branchId) {
            filters = {
                ...filters,
                branch: branchId
            }
        }

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
        const mainUser = req.user;
        const { status, chairId, clientId } = req.body;

        // Validate inputs
        if (!clientId || !chairId) {
            return res.status(400).send({
                message: message.lblChairIdIdAndClientIdRequired,
            });
        }

        const updatedChair = await chairService.activeInactiveChair(clientId, chairId, {
            isActive: status === "1",
            updatedBy: mainUser?._id,
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
        const { keyword, page, perPage, chairId, clientId, isAdmin = true, branchId } = req.body;

        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        req.query.clientId = clientId;
        req.query.isAdmin = isAdmin;
        req.query.branchId = branchId;
        const mainUser = req.user;



        // Validate inputs
        if (!clientId || !chairId) {
            return res.status(400).send({
                message: message.lblChairIdIdAndClientIdRequired,
            });
        };

        await chairService.deleteChair(clientId, chairId, softDelete = true, mainUser._id);

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


exports.updateChairStatusReady = async (req, res, next) => {
    try {
        const mainUser = req.user;
        const data = await sanitizeBody(req.body)
        const updateChairStatus = await updateChairStatustoReady({ chairId: data?.chairId, clientId: data?.clientId, patientId: data?.patientId,appointmentId: data?.appointmentId, user: mainUser?._id })

        

        if (!updateChairStatus?.status) {
            res.json({ ...updateChairStatus });
        }
        else {
            const updateAppointStatus = await updatePatientStatustoChairReady({ appointmentId: data?.appointmentId, clientId: data?.clientId, patientId: data?.patientId });
            if (!updateAppointStatus?.status) res.json({ ...updateAppointStatus })
                else {
                    console.log(updateChairStatus,updateAppointStatus, '----------------------');

                if (updateChairStatus && updateAppointStatus) {
                    res.json({ status: true, message: 'chair status updated ' });
                }
                else {
                    res.json({ status: false, message: 'chair status updated ' });
                }
            }
        }
    } catch (error) {
        next(error)
    }

}



exports.updateChairStatusInprogress = async (req, res, next) => {
    try {
        const mainUser = req.user;
        const data = await sanitizeBody(req.body)
        const updateChairStatus = await updateChairStatusInprogress({ chairId: data?.chairId, clientId: data?.clientId, patientId: data?.patientId, user: mainUser._id })
        if (!updateChairStatus?.status) {
            res.json({ ...updateChairStatus });
        }
        else {
            const updateAppointStatus = await updatePatientStatustoInprogress({ appointmentId: data?.appointmentId, clientId: data?.clientId, patientId: data?.patientId })
            if (!updateAppointStatus?.status) res.json({ ...updateAppointStatus })
                else {
                    console.log(updateChairStatus,updateAppointStatus, '----------------------');

                if (updateChairStatus && updateAppointStatus) {
                    res.json({ status: true, message: 'chair status updated ' });
                }
                else {
                    res.json({ status: false, message: 'chair status updated ' });
                }
            }
        }
    } catch (error) {
        next(error)
    }

}



exports.updateChairCleared = async (req, res, next) => {
    try {
        const mainUser = req.user;
        const data = await sanitizeBody(req.body)
        const updateChairStatus = await updateChairCleared({ chairId: data?.chairId, clientId: data?.clientId, patientId: data?.patientId, user: mainUser._id });
        if (!updateChairStatus?.status) {
            res.json({ ...updateChairStatus })
        }
        else {
            const updateAppointStatus = await updatePatientBookingCompleted({ appointmentId: data?.appointmentId, clientId: data?.clientId, patientId: data?.patientId })
            if (!updateAppointStatus?.status) res.json({ ...updateAppointStatus })
                else {
                   

                if (updateChairStatus && updateAppointStatus) {
                    res.json({ status: true, message: 'chair status updated ' })
                }
                else {
                    res.json({ status: false, message: 'chair status updated ' })
                }
            }
        }
    } catch (error) {
        next(error)
    }

}

exports.CancelChairReadyStatus = async (req, res, next) => {
    try {
        const mainUser = req.user;
        const data = await sanitizeBody(req.body)
        const updateChairStatus = await  CancelChairReadyStatus({ chairId: data?.chairId, clientId: data?.clientId, patientId: data?.patientId,appointmentId: data?.appointmentId, user: mainUser._id })
        if (!updateChairStatus?.status) {
            res.json({ ...updateChairStatus })
        }
        else {
            const updateAppointStatus = await cancelPatientChairReadyStatus({ appointmentId: data?.appointmentId, clientId: data?.clientId, patientId: data?.patientId })
            if (!updateAppointStatus?.status) res.json({ ...updateAppointStatus })
                else {
                   

                if (updateChairStatus && updateAppointStatus) {
                    res.json({ status: true, message: 'chair status updated ' })
                }
                else {
                    res.json({ status: false, message: 'chair status updated ' })
                }
            }
        }
    } catch (error) {
        next(error)
    }

}



