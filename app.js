


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { upsertTeeth } = require("./client/model/tooth.js");

const errorHandler = require("./middleware/errorHandler/errorHandler.js");

const swaggerDocs = require("./documentation/swagger.js");
const swaggerUi = require('swagger-ui-express');


const clientRoleSchema = require("./client/model/role.js");
const clinetPatientSchema = require("./client/model/patient.js");
const serialNumberSchema = require("./model/serialNumber.js")
const { defaultPersmissionsList, businessUnitPersmissionsList, cheifComplaints, findings, medicalHistory } = require("./utils/constant.js")


// cors setup
const cors = require("cors");


// env setup
const dotnev = require("dotenv");
dotnev.config();


// socket setup
const { app, server } = require("./socket/socket.js");

// databse connection setup
const { ConnectDb, createClientDatabase, getClientDatabaseConnection } = require("./db/connection.js");


// routes import
const welcomeRouter = require("./routes/welcome");
const superAdminRouter = require("./superAdminManagement/routes/superAdmin.routes.js");
const superAdminBuRouter = require("./superAdminBuManagement/routes/superAdminBu.routes.js");

const clientAuthRouter = require("./commonClinetAuthentication/routes/clientAuth.routes.js");
const staffAuthRouter = require("./comonStaffAuthentication/routes/staffAuth.routes.js");


const clinetBranchRouter = require("./businessUnitAdministration/routes/branch.routes.js");
const clinetChairhRouter = require("./businessUnitAdministration/routes/chair.routes.js");
const clientEmployeeRouter = require("./businessUnitAdministration/routes/employee.routes.js")
const clinetRoleRouter = require("./businessUnitAdministration/routes/rolesAndPermission.routes.js");
const clientPatientRouter = require("./businessUnitPatientCare/routes/patient.routes.js");
const clientCaseSheetRouter = require("./businessUnitPatientCare/routes/caseSheet.routes.js");
const clientComplaintRouter = require("./businessUnitAdministration/routes/complaint.routes.js");
const clientPatientFindingRouter = require("./businessUnitAdministration/routes/patientFinding.routes.js");
const clientMedicalRouter = require("./businessUnitAdministration/routes/medical.routes.js");


const clientDepartment = require("./businessUnitAdministration/routes/department.routes.js");
const clientservicesRouter = require("./businessUnitAdministration/routes/service.routes.js");
const clientProcedureRouter = require("./businessUnitAdministration/routes/procedure.routes.js");




// model import
const Roles = require("./model/role.js");
const User = require("./model/user.js");

const appointmentSchema = require("./model/patient.js"); // Import the Appointment schema
const toothRouter = require("./superAdminBuManagement/routes/tooth.routes.js");
const medHistoryRoutes = require("./businessUnitAdministration/routes/medicalCases.routes.js");
const findingsRouter = require("./businessUnitAdministration/routes/findings.routes.js");
const ccRouter = require("./businessUnitAdministration/routes/cheifComplaint..routes.js");
const investigationRouter = require("./businessUnitAdministration/routes/investigation.routes.js");
const bookingRoutes = require("./businessUnitAdministration/routes/appointment.routes.js");
const leaveRouter = require("./businessUnitAdministration/routes/leaveRegister.routes.js");
const cheifComplaintSchema = require("./client/model/cheifcomplaint.js");
const complaintSchema = require("./client/model/complaint.js");
const patientFindingsSchema = require("./client/model/finding.js");
const medicalSchema = require("./client/model/medical.js");
const preScriptionRouter = require("./businessUnitAdministration/routes/priscription.routes.js");
const priscriptionRouter = require("./businessUnitPatientCare/routes/prescription.routes.js");


const corsOptions = {
    origin:true,
    credentials: true,
    methods: ['GET', 'PATCH', 'PUT', 'POST','DELETE'],
    allowedHeaders: ['Origin','Access-Control-Allow-Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-refresh-token', 'x-user-role','x-verify-token'],
    optionsSuccessStatus: 204,
  }; 

// middleware setup

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))



// connecting database
const DATABASE_URL = process.env.DATABASE_URL;
ConnectDb(DATABASE_URL);


// routes setup
app.use("/api", welcomeRouter.router);
app.use("/api/superAdmin", superAdminRouter.router);
app.use("/api/superAdmin/tooth", toothRouter);
app.use("/api/superAdmin/bu/", superAdminBuRouter.router);

app.use("/api/client/auth/", clientAuthRouter.router);
app.use("/api/client/staff/auth/", staffAuthRouter.router);

app.use("/api/client/bu/branch", clinetBranchRouter.router);
app.use("/api/client/bu/chair", clinetChairhRouter.router);
app.use("/api/client/bu/employee", clientEmployeeRouter.router);
app.use("/api/client/branch/chair", clinetChairhRouter.router);
app.use("/api/client/bu/role", clinetRoleRouter.router);
app.use("/api/client/bu/patient", clientPatientRouter.router);
app.use("/api/client/bu/caseSheet", clientCaseSheetRouter.router);
app.use("/api/client/bu/complaint", clientComplaintRouter.router);
app.use("/api/client/bu/patientFinding", clientPatientFindingRouter.router);
app.use("/api/client/bu/medical", clientMedicalRouter.router);
app.use("/api/client/bu/department", clientDepartment);
app.use("/api/client/bu/services", clientservicesRouter);
app.use("/api/client/bu/procedures", clientProcedureRouter);
app.use("/api/client/bu/MediCases", medHistoryRoutes);
app.use("/api/client/bu/findings", findingsRouter);
app.use("/api/client/bu/chiefComplaint", ccRouter);
app.use("/api/client/bu/investigation", investigationRouter)
app.use("/api/client/bu/booking", bookingRoutes)
app.use("/api/client/bu/leave", leaveRouter)
app.use("/api/client/bu/prescription", priscriptionRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// insert role
const roles = [
    { id: 1, name: 'super admin' },
    { id: 2, name: 'superAdminEmployee' },
    { id: 3, name: 'partner' },
    { id: 4, name: 'businessUnit' },
    { id: 5, name: "clientStaff" }
];

async function insertRole() {

    Roles.countDocuments({})
        .exec()
        .then(count => {
            if (count === 0) {
                // Insert predefined roles into the Role collection
                return Roles.insertMany(roles);
            } else {
                console.log('Roles already exist in the database.');
            }
        })
        .catch(err => {
            console.error('Error:', err);
        })
        .finally(() => {
        });

}

// insertRole()

// insert super admin
async function createSuperAdmin() {

    try {

        const email = process.env.SUPER_ADMIN_EMAIL;
        const password = process.env.SUPER_ADMIN_PASSWORD;
        const phone = process.env.SUPER_ADMIN_PHONE;


        const isSuperAdminExists = await User.findOne({
            $or: [{ phone: phone }, { email: email }]
        })

        if (isSuperAdminExists) {

            console.log("Super admin credentials already exists", isSuperAdminExists);
            return
        }

        const role = await Roles.findOne({ id: 1 });

        const hash = bcrypt.hashSync(password, 10);

        const create = await User.create({
            role: role._id,
            roleId: 1,
            firstName: "Super",
            lastName: "Admin",
            email: email,
            phone: phone,
            password: hash,
            isActive: true,
            isUserVerified: true,
            tc: true,
        });

        console.log("super admin create successfully");

    } catch (error) {
        console.log("error in inserting super admin", error);
    }

}

// createSuperAdmin()




// insert dummy clinet
async function createDummyClient() {
    try {
        const email = "dummyClient2@yopmail.com";
        const password = "Spk@123";
        const firstName = "client";
        const lastName = "two";

        const isExists = await User.findOne({ email });
        if (isExists) {
            console.log("User already exists:", isExists);
            return;
        }

        const role = await Roles.findOne({ id: 4 });

        // Step 1: Create the client record in the main database
        const client = await User.create({
            role: role._id,
            roleId: 4,
            firstName,
            lastName,
            email,
            password,
            tc: true,
        });

        console.log("User created successfully:", client);

        // Step 2: Initialize the client-specific database
        const clientConnection = await createClientDatabase(client._id);

        // Use the imported schema to create the Appointment model in the client database
        const Appointment = clientConnection.model('Appointment', appointmentSchema);

        // Create a sample appointment in the new client's database
        await Appointment.create({ date: new Date(), patientName: "client two patiet" });

        console.log(`Client database for client_${client._id} initialized successfully.`);

    } catch (error) {
        console.error("Error creating dummy client:", error);
    }
}


async function createNewRole(params) {

    try {

        const roleData = {
            name: "clientStaff",
            id: 5,
        }

        const role = await Roles.findOne({ name: roleData.name });

        if (role) {

            console.log("ROle already Exisits", role);

            return
        }

        const create = await Roles.create(roleData);

        console.log("role created successfully", create);

    } catch (error) {
        console.error("Error creating new role:", error);
    }

}


// createNewRole()



async function createRoleInDatbaseInstance() {
    try {
        const clientId = "67441b73cbc8975325e14a3f";
        const data = { id: 17, name: "patienit", capability: defaultPersmissionsList };
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Role = clientConnection.model('clientRoles', clientRoleSchema);
        const existing = await Role.findOne({ id: 17 });
        if (existing) {
            console.log("patient role already exists");
            return false
        }
        const create = await Role.create(data);
        console.log("patient role created successfully");
        return true;
    } catch (error) {
        console.log("error while creating the petient", error);
    }
}
// createRoleInDatbaseInstance()



async function updateRoleInDatbaseInstance() {
    try {
        const clientId = "67441b73cbc8975325e14a3f";
        const buCapability = businessUnitPersmissionsList;
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Role = clientConnection.model('clientRoles', clientRoleSchema);
        const existing = await Role.findOne({ id: 2 });
        if (existing) {
            existing.capability = buCapability;
            await existing.save()
        } else {
            console.log("role not found");
        }

    } catch (error) {
        console.log("error while creating the petient", error);
    }
}

// updateRoleInDatbaseInstance()

async function dropIndexes() {
    const clientId = "67441b73cbc8975325e14a3f";
    try {
        // Establish client-specific connection
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Patient = clientConnection.model('patient', clinetPatientSchema);
        // Drop indexes if they exist
        const indexes = await Patient.collection.indexes();

        if (indexes.some(index => index.name === 'email_1')) {
            await Patient.collection.dropIndex('email_1');
            console.log('Dropped email index successfully');
        }
        if (indexes.some(index => index.name === 'phone_1')) {
            await Patient.collection.dropIndex('phone_1');
            console.log('Dropped phone index successfully');
        }
    } catch (error) {
        console.error('Error dropping indexes:', error.message);
    } finally {
        // Optionally close the connection or leave it in the pool for reuse
        console.log("11");
    }
}

// dropIndexes()


// create serial numbers in instance of database

async function createSerialNumber() {
    try {
        const clientId = "6760241a890afbdafd08198b";
        const collectionName = "caseSheet";
        const prefix = "CS";
        const nextNum = 100010;
        const clientConnection = await getClientDatabaseConnection(clientId);
        const SerialNumber = clientConnection.model('serialNumber', serialNumberSchema);
        const existing = await SerialNumber.findOne({ collectionName: collectionName });
        if (existing) {
            console.log("serial Number already exists");
            return
        }
        await SerialNumber.create({
            collectionName: collectionName,
            prefix: prefix,
            nextNum: nextNum
        })
        console.log("serial number created successfully");
    } catch (error) {
        console.log("error while creating the serial number");

    }
}

// createSerialNumber()


// create cheif complaints
async function createCheifComplaints() {
    try {
        const clientId = "6760241a890afbdafd08198b";
        const data = cheifComplaints;
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Complaint = clientConnection.model('complaint', complaintSchema);
        const count = await Complaint.countDocuments({});
        if (count == 0) {
            await Complaint.insertMany(data);
        }else{
            console.log("complaints alrady exits");
        }
    } catch (error) {
        console.log("error while creating cheif complaint", error);
    }
}

// createCheifComplaints()



// create clinical finding
async function createClinicalFinding() {
    try {
        const clientId = "6760241a890afbdafd08198b";
        const data = findings;
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Finding = clientConnection.model('patientFinding', patientFindingsSchema);
        const count = await Finding.countDocuments({});
        if (count == 0) {
            await Finding.insertMany(data);
        }else{
            console.log("Finding alrady exits");
        }
    } catch (error) {
        console.log("error while creating Finding", error);
    }
}

// createClinicalFinding()



// create medical history data
async function createMedicalData() {
    try {
        const clientId = "6760241a890afbdafd08198b";
        const data = medicalHistory;
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Medical = clientConnection.model('medical', medicalSchema);
        const count = await Medical.countDocuments({});
        if (count == 0) {
            await Medical.insertMany(data);
        }else{
            console.log("Medical alrady exits");
        }
    } catch (error) {
        console.log("error while creating Medical", error);
    }
}

// createMedicalData()












// createDummyClient()

// Place errorHandler at the END after all routes
app.use(errorHandler);


// port setup
const port = process.env.PORT;

// listening server
server.listen(port, () => {
    console.clear()
    console.log(`APP STARTED SUCCESSFULLY on port ${port}....`)
});





