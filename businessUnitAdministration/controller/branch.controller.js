



const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { getClientDatabaseConnection } = require("../../db/connection");
const clinetBranchSchema = require("../../client/model/branch");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit");
const getserialNumber = require("../../model/services/getserialNumber");




// create branch by business unit
exports.createBranchByBusinessUnit = async (req, res) => {
    try {
        const { clientId, name, emailContact, contactNumber, country, state, city, ZipCode, address, incorporationName, cinNumber, gstNumber, businessUnit, branchHeadId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!name || !incorporationName || !emailContact || !contactNumber ) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const existingBranch = await Branch.findOne({
            $or: [{ emailContact: emailContact.toLowerCase() }, { contactNumber }],
        });
        if (existingBranch) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchAlreadyExists,
            });
        }
        // const prefixExist = await Branch.findOne({branchPrefix});
        // if (prefixExist) {
        //     return res.status(statusCode.BadRequest).send({
        //         message: message.lblBranchprefixConflict,
        //     });
        // }
        const displayId = await getserialNumber('branch', clientId, "", businessUnit);
        const newBranch = await Branch.create(
            [
                {
                    displayId: displayId, clientId, name, emailContact, contactNumber, country, state, city, ZipCode, address, incorporationName, cinNumber, gstNumber, businessUnit: businessUnit, branchHead: branchHeadId
>>>>>>>>> Temporary merge branch 2
                },
            ],
        );
        return res.status(statusCode.OK).send({
            message: message.lblBranchCreatedSuccess,
            data: { branchId: newBranch[0]._id, emailContact: newBranch[0].emailContact },
        });
    } catch (error) {
        console.error("Error in createBranch:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// update branch by business unit
exports.updateBranchByBusinessUnit = async (req, res) => {

    try {
        // Destructure fields from request body
        const { branchId, clientId, name, emailContact, contactNumber, country, state, city, ZipCode, address, incorporationName, cinNumber, gstNumber } = req.body;

        // Check if branchId and clientId are provided
        if (!branchId || !clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchIdAndClientIdRequired,
            });
        }

        // Check if required fields are missing
        if (!name || !incorporationName || !emailContact || !contactNumber) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }

        // Get the client-specific database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);

        // Find the branch to be updated
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(statusCode.NotFound).send({
                message: message.lblBranchNotFound,
            });
        }

        // Check if email or contact number is already used by another branch
        const existingBranch = await Branch.findOne({
            $and: [
                { _id: { $ne: branchId } },
                {
                    $or: [
                        { emailContact: emailContact.toLowerCase() },
                        { contactNumber: contactNumber },
                    ],
                },
            ],
        });
        // const prefixExist = await Branch.findOne({branchPrefix:branchPrefix,_id: { $ne: branchId }});
        // if (prefixExist) {
        //     return res.status(statusCode.BadRequest).send({
        //         message: message.lblBranchprefixConflict,
        //     });
        // }


        if (existingBranch) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblBranchAlreadyExists,
            });
        }

        // Update branch details
        branch.name = name;
        branch.emailContact = emailContact.toLowerCase();
        branch.contactNumber = contactNumber;
        branch.country = country;
        branch.state = state;
        branch.city = city;
        branch.ZipCode = ZipCode;
        branch.address = address;
        branch.incorporationName = incorporationName;
        branch.cinNumber = cinNumber;
        branch.gstNumber = gstNumber;
        // branchPrefix ? branch.branchPrefix = branchPrefix:'';

        // Save the updated branch
        await branch.save();

        return res.status(statusCode.OK).send({
            message: message.lblBranchUpdatedSuccess,
            data: { branchId: branch._id, emailContact: branch.emailContact },
        });

    } catch (error) {
        console.error("Error in updateBranch:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// get particular branch by business unit
exports.getParticularBranchByBusinessUnit = async (req, res) => {
    try {
        const { clientId, branchId } = req.params; // Extract clientId and branchId from request params

        // Validate inputs
        if (!clientId || !branchId) {
            return res.status(400).send({
                message: message.lblBranchIdAndClientIdRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);


        // Fetch the branch by ID
        const branch = await Branch.findById(branchId)
            .populate({
                path: 'businessUnit',
                model: BusinessUnit,
                select: 'name emailContact city state', // Specify fields to return from businessUnit
            });


        if (!branch) {
            return res.status(404).send({
                message: message.lblBranchNotFound
            });
        }

        // Respond with branch data
        return res.status(200).send({
            message: message.lblBranchFoundSucessfully,
            data: branch,
        });

    } catch (error) {
        console.error("Error in getBranchById:", error);

        // Handle errors
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// list branch for business unit
exports.listBranch = async (req, res) => {
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
                { name: { $regex: searchText, $options: "i" } },
                { incorporationName: { $regex: searchText, $options: "i" } },
                { emailContact: { $regex: searchText, $options: "i" } },
                { contactNumber: { $regex: searchText, $options: "i" } },
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
        const Branch = clientConnection.model('branch', clinetBranchSchema);

        const [branches, count] = await Promise.all([
            Branch.find(whereCondition)
                .skip(skip)
                .limit(limit)
                .sort({ _id: 'desc' }),
            Branch.countDocuments(whereCondition),
        ]);

        return res.json({
            message: 'List of all Branches!',
            count: count,
            listOfBranches: branches,
        });


    } catch (error) {
        console.error("Error in listBranches:", error);

        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// active inactive branch by Business unit
exports.activeinactiveBranchByBusinessUnit = async (req, res) => {


    try {
        const { keyword, page, perPage, status, branchId, clientId } = req.body;
        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        req.query.clientId = clientId;


        // Validate inputs
        if (!clientId || !branchId) {
            return res.status(400).send({
                message: message.lblBranchIdAndClientIdRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);


        // Find the business unit by ID
        const branch = await Branch.findById(branchId)

        if (!branch) {
            return res.status(statusCode.ExpectationFailed).send({
                message: message.lblBranchNotFound,
            });
        }

        branch.isActive = status === "1";
        await branch.save();

        this.listBranch(req, res);

    } catch (error) {


        console.error("Error in activeinactiveBusinessUnit:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });

    }
};


// Soft delete branch by business unit
exports.softDeleteBranchByBusinesssUnit = async (req, res) => {

    try {

        const { keyword, page, perPage, branchId, clientId } = req.body;

        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;
        req.query.clientId = clientId;


        // Validate inputs
        if (!clientId || !branchId) {
            return res.status(400).send({
                message: message.lblBranchIdAndClientIdRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);


        const branch = await Branch.findById(branchId)

        if (!branch) {
            return res.status(statusCode.ExpectationFailed).send({
                message: message.lblBusinessUnitNotFound,
            });
        }

        branch.deletedAt = new Date();
        await branch.save()
        this.listBranch(req, res);


    } catch (error) {
        if (session.inTransaction()) await session.abortTransaction();
        session.endSession();
        console.error("Error in softDeleteBusinessUnit:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};


// restore branch
exports.restoreBranchByBusinessUnit = async (req, res) => {

    try {
        session.startTransaction();

        const { keyword, page, perPage, branchId, clientId } = req.body;

        req.query.keyword = keyword;
        req.query.page = page;
        req.query.perPage = perPage;


        // Validate inputs
        if (!clientId || !branchId) {
            return res.status(400).send({
                message: message.lblBranchIdAndClientIdRequired,
            });
        }

        // Get client database connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);


        const branch = await Branch.findById(branchId)

        if (!branch) {
            return res.status(statusCode.ExpectationFailed).send({
                message: message.lblBusinessUnitNotFound,
            });
        }


        if (!branch) {
            return res.status(statusCode.ExpectationFailed).send({
                message: message.lblBranchNotFound,
            });
        }

        branch.deletedAt = null;
        await branch.save();

        this.listBranch(req, res);

    } catch (error) {

        if (session.inTransaction()) await session.abortTransaction();
        session.endSession();

        console.error("Error in restoreBusinessUnit:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};

// get all active branch
exports.getAllActiveBranch = async (req, res) => {
    try {

        const clientId = req.query.clientId;
        let whereCondition = {
            deletedAt: null,
            isActive: true,
        };
        if (!clientId) {
            return res.status(400).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const [branches] = await Promise.all([
            Branch.find(whereCondition).sort({ _id: 'desc' }),
        ]);
        return res.json({
            message: 'List of all Branches!',
            listOfBranches: branches,
        });
    } catch (error) {
        console.error("Error in list Branches:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
};





