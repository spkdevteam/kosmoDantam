


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const errorHandler = require("./middleware/errorHandler/errorHandler.js");


// cors setup
const cors = require("cors");


// env setup
const dotnev = require("dotenv");
dotnev.config();


// socket setup
const { app, server } = require("./socket/socket.js");

// databse connection setup
const { ConnectDb, createClientDatabase } = require("./db/connection.js");


// routes import
const welcomeRouter = require("./routes/welcome");
const superAdminRouter = require("./superAdminManagement/routes/superAdmin.routes.js");
const superAdminBuRouter = require("./superAdminBuManagement/routes/superAdminBu.routes.js");

const clientAuthRouter = require("./commonClinetAuthentication/routes/clientAuth.js")


const clinetBranchRouter = require("./businessUnitAdministration/routes/branch.routes.js");
const clinetChairhRouter = require("./businessUnitAdministration/routes/chair.routes.js");
const clinetRoleRouter = require("./businessUnitAdministration/routes/rolesAndPermission.routes.js");




// model import
const Roles = require("./model/role.js");
const User = require("./model/user.js");

const appointmentSchema = require("./model/patient.js"); // Import the Appointment schema


// middleware setup

app.use(cors());
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json());



// connecting database
const DATABASE_URL = process.env.DATABASE_URL;
ConnectDb(DATABASE_URL);


// routes setup
app.use("/api", welcomeRouter.router);
app.use("/api/superAdmin", superAdminRouter.router);
app.use("/api/superAdmin/bu/", superAdminBuRouter.router);

app.use("/api/clinet/auth/", clientAuthRouter.router);

app.use("/api/clinet/bu/branch", clinetBranchRouter.router);
app.use("/api/clinet/bu/chair", clinetChairhRouter.router);
app.use("/api/clinet/branch/chair", clinetChairhRouter.router);
app.use("/api/clinet/bu/role", clinetRoleRouter.router);


// insert role
const roles = [
    { id: 1, name: 'super admin' },
    { id: 2, name: 'superAdminEmployee' },
    { id: 3, name: 'partner' },
    { id: 4, name: 'businessUnit' },
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

insertRole()

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


// createDummyClient()

// Place errorHandler at the END after all routes
app.use(errorHandler);


// port setup
const port = process.env.PORT;

// listening server
server.listen(port, () => {
    console.log(`APP STARTED SUCCESSFULLY on port ${port}....`)
});





