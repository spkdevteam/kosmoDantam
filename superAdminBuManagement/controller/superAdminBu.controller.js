

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotnev = require("dotenv");
const mongoose = require("mongoose");

const User = require("../../model/user");
const Roles = require("../../model/role");

const clientRoleSchema = require("../../client/model/role");
const clinetUserSchema = require("../../client/model/user");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit");
const clinetBranchSchema = require("../../client/model/branch");
const serialNumebrSchema = require("../../model/serialNumber");




const { clientRoles, serialNumber, cheifComplaints, findings, medicalHistory } = require("../../utils/constant")



const { generateOtp } = require("../../helper/common");
const { mailSender } = require("../../email/emailSend");
const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");

const { createClientDatabase } = require("../../db/connection");
const complaintSchema = require("../../client/model/complaint");
const patientFindingsSchema = require("../../client/model/finding");
const medicalSchema = require("../../client/model/medical");


// env 
dotnev.config();
const PRIVATEKEY = process.env.PRIVATEKEY;






// create Business unit
exports.createBusinessUnit = async (req, res) => {
  const session = await mongoose.startSession(); // Start Mongoose session for transaction-like behavior
  try {
    session.startTransaction(); // Start transaction


    const superAdmin = req.user

    // Destructure fields from request body
    const { firstName, lastName, middleName, email, phone, password } = req.body;

    // Check if required fields are missing
    if (!firstName || !email || !phone || !password) {
      return res.status(statusCode.BadRequest).send({
        message: message.lblRequiredFieldMissing,
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }],
    }).session(session);

    if (existingUser) {
      return res.status(statusCode.BadRequest).send({
        message: message.lblBusinessUnitAlreadyExists,
      });
    }

    const role = await Roles.findOne({ id: 4 }).session(session);

    if (!role) {
      return res.status(statusCode.NotFound).send({
        message: message.lblRoleNotFound,
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user (business unit)
    const newUser = await User.create(
      [
        {
          firstName,
          lastName,
          middleName,
          email: email.toLowerCase(),
          phone,
          password: hashedPassword,
          role: role._id,
          roleId: role.id,
          isActive: true,
          isUserVerified: true,
          tc: true,
          isCreatedBySuperAdmin: true,
          createdBy: superAdmin._id,
        },
      ],
      { session }
    );

    // const clientConnection = await getClientDatabaseConnection(newUser._id);
    console.log(newUser)
    const clientConnection = await createClientDatabase(newUser[0]._id);

    // Use the imported schema to create the roles model in the client database
    const clientRole = clientConnection.model('clientRoles', clientRoleSchema);
    const roles = clientRoles;

    

    // insert fixed
    const createdRole = await clientRole.insertMany(roles);

    const buRoleId = createdRole.find((item) => {

      return item?.id == 2

    })

    const clientUser = clientConnection.model('clientUsers', clinetUserSchema);


    const newClient = await clientUser.create({

      role: buRoleId?._id,
      roleId: 2,
      firstName: newUser[0].firstName,
      lastName: newUser[0].lastName,
      email: newUser[0].email,
      phone: newUser[0].phone,
      password: newUser[0].password,
      tc: true,
      isUserVerified: true,
      isActive: true,

    });


    const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);

    const newBusinessUnit = await BusinessUnit.create({
      buHead: newClient._id,
      name: newUser[0].firstName + " " + newUser[0].lastName + " " + "Businsenss Unit",
      emailContact: newUser[0].email,
      contactNumber: newUser[0].phone,
      createdBy: newClient._id
    });

    //adding businessUnitId in clientUsers collection:=>
    newClient.businessUnit = newBusinessUnit?._id;
    await newClient.save();


    const SerialNumber = clientConnection.model("serialNumber", serialNumebrSchema);
    await SerialNumber.insertMany(serialNumber);

    // insert cheif complaints
    const Complaint = clientConnection.model('complaint', complaintSchema);
    const data1 = cheifComplaints;
    await Complaint.insertMany(data1);

    // insert clinical finding
    const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
    const data2 = findings;
    await Finding.insertMany(data2);

    // insert medical case
    const Medical = clientConnection.model('medical', medicalSchema);
    const data3 = medicalHistory;
    await Medical.insertMany(data3);


    // Commit the transaction (if everything goes well)
    await session.commitTransaction();
    session.endSession();
    return res.status(statusCode.OK).send({
      message: message.lblBusinessUnitCreatedSuccess,
      data: { userId: newUser[0]._id, email: newUser[0].email, roles, createdRole },
    });

  } catch (error) {
    // Rollback the transaction if an error occurs
    if (session.inTransaction()) await session.abortTransaction();
    session.endSession(); // End session

    console.error("Error in createBusinessUnit:", error);
    return res.status(statusCode.InternalServerError).send({
      message: message.lblInternalServerError,
      error: error.message, // Optional: Include detailed error message for debugging
    });
  }
};


// update business unit
exports.updateBusinessUnit = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session for transaction-like behavior

  try {
    session.startTransaction(); // Start transaction

    const { userId } = req.params; // Assuming the user ID is passed as a URL parameter
    const {
      firstName,
      lastName,
      middleName,
      phone,
      password,

    } = req.body;

    // Check if required fields are provided
    if (!userId) {
      return res.status(statusCode.BadRequest).send({
        message: lblUserIdRequired,
      });
    }

    // Check if user exists
    const user = await User.findById(userId).session(session);
    if (!user) {
      return res.status(statusCode.NotFound).send({
        message: message.lblUserNotFound,
      });
    }

    // Update fields if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (middleName) user.middleName = middleName;
    if (phone) user.phone = phone;

    // If password is provided, hash it before updating
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }



    // Save the updated user document
    await user.save({ session });

    // Commit transaction and end session
    await session.commitTransaction();
    session.endSession();

    return res.status(statusCode.OK).send({
      message: message.lblBusinessUnitUpdatedSuccess,
    });
  } catch (error) {
    // Rollback transaction in case of error
    if (session.inTransaction()) await session.abortTransaction();
    session.endSession();

    console.error("Error in updateBusinessUnit:", error);
    return res.status(statusCode.InternalServerError).send({
      message: message.lblInternalServerError,
      error: error.message,
    });
  }
};


// GET business unit by ID
exports.getBusinessUnit = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(statusCode.BadRequest).send({
        message: message.lblUserIdRequired
      });
    }

    // Fetch the business unit by userId with selected fields only
    const businessUnit = await User.findById(userId)
      .select("firstName middleName lastName email phone ")
      .session(session);

    // Check if business unit exists
    if (!businessUnit) {
      return res.status(statusCode.NotFound).send({
        message: message.lblBusinessUnitNotFound,
      });
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(statusCode.OK).send({
      message: message.lblBusinessUnitFoundSuccessfully,
      data: businessUnit, // Return only the selected fields
    });

  } catch (error) {
    // Rollback transaction if any error occurs
    if (session.inTransaction()) await session.abortTransaction();
    session.endSession();

    console.error("Error in getBusinessUnit:", error);

    return res.status(statusCode.InternalServerError).send({
      message: message.lblInternalServerError,
      error: error.message,
    });
  }
};

// list business unit
exports.listBusinessUnit = async (req, res) => {
  try {
    const searchText = req.query.keyword ? req.query.keyword.trim() : '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * limit;


    let whereCondition = {
      deletedAt: null,
      roleId : 4,
    };

    if (searchText) {
      whereCondition.$or = [
        { firstName: { $regex: searchText, $options: "i" } },
        { lastName: { $regex: searchText, $options: "i" } },
        { email: { $regex: searchText, $options: "i" } },
        { phone: { $regex: searchText, $options: "i" } },
      ];
    }

    const [businessUnit, count] = await Promise.all([
      User.find(whereCondition)
        .select('firstName lastName email phone isActive middleName')
        .skip(skip)
        .limit(limit)
        .sort({ _id: 'desc' }),

      User.countDocuments(whereCondition),
    ]);

    return res.json({
      message: 'List of all Business units!',
      count: count,
      listOfBusinessUnit: businessUnit,
    });

  } catch (error) {
    console.error("Error in listBusinessUnits:", error);

    return res.status(statusCode.InternalServerError).send({
      message: message.lblInternalServerError,
      error: error.message,
    });
  }
};

// active inactive business unit
exports.activeinactiveBusinessUnit = async (req, res) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { keyword, page, perPage, id, status } = req.body;
    req.query.keyword = keyword;
    req.query.page = page;
    req.query.perPage = perPage;

    // Find the business unit by ID
    const businessUnit = await User.findById(id).session(session);

    if (!businessUnit) {
      await session.abortTransaction();
      session.endSession();
      return res.status(statusCode.ExpectationFailed).send({
        message: message.lblBusinessUnitNotFound,
      });
    }

    businessUnit.isActive = status === "1";
    await businessUnit.save({ session });

    await session.commitTransaction();
    session.endSession();
    this.listBusinessUnit(req, res);

  } catch (error) {

    if (session.inTransaction()) await session.abortTransaction();
    session.endSession();

    console.error("Error in activeinactiveBusinessUnit:", error);
    return res.status(statusCode.InternalServerError).send({
      message: message.lblInternalServerError,
      error: error.message,
    });

  }
};

// Soft delete business unit
exports.softDeleteBusinessUnit = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { id, keyword, page, perPage, } = req.body;

    req.query.keyword = keyword;
    req.query.page = page;
    req.query.perPage = perPage;

    const businessUnit = await User.findById(id).session(session);

    if (!businessUnit) {
      await session.abortTransaction();
      session.endSession();
      return res.status(statusCode.ExpectationFailed).send({
        message: message.lblBusinessUnitNotFound,
      });
    }

    businessUnit.deletedAt = new Date();
    await businessUnit.save({ session });

    await session.commitTransaction();
    session.endSession();

    this.listBusinessUnit(req, res);


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


// restore business unit
exports.restoreBusinessUnit = async (req, res) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { id, keyword, page, perPage } = req.body;

    req.query.keyword = keyword;
    req.query.page = page;
    req.query.perPage = perPage;

    const businessUnit = await User.findById(id).session(session);

    if (!businessUnit || !businessUnit.deletedAt) {
      await session.abortTransaction();
      session.endSession();
      return res.status(statusCode.ExpectationFailed).send({
        message: message.lblBusinessUnitRestoredSuccess,
      });
    }

    businessUnit.deletedAt = null;
    await businessUnit.save({ session });

    await session.commitTransaction();
    session.endSession();

    this.listBusinessUnit(req, res);

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


