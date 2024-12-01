


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { upsertTeeth } = require("./client/model/tooth.js");

const errorHandler = require("./middleware/errorHandler/errorHandler.js");

const swaggerDocs = require("./documentation/swagger.js");  
const swaggerUi = require('swagger-ui-express');


// upsertTeeth([
//     {
//       "toothNumber": 1,
//       "toothName": "Upper Right Third Molar",
//       "toothType": "Molar",
//       "quadrant": "Upper Right",
//       "eruptionAge": "17-21 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 2,
//       "toothName": "Upper Right Second Molar",
//       "toothType": "Molar",
//       "quadrant": "Upper Right",
//       "eruptionAge": "12-13 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 3,
//       "toothName": "Upper Right First Molar",
//       "toothType": "Molar",
//       "quadrant": "Upper Right",
//       "eruptionAge": "6-7 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 4,
//       "toothName": "Upper Right Second Premolar",
//       "toothType": "Premolar",
//       "quadrant": "Upper Right",
//       "eruptionAge": "10-11 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 5,
//       "toothName": "Upper Right First Premolar",
//       "toothType": "Premolar",
//       "quadrant": "Upper Right",
//       "eruptionAge": "9-11 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 6,
//       "toothName": "Upper Right Canine",
//       "toothType": "Canine",
//       "quadrant": "Upper Right",
//       "eruptionAge": "11-12 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 7,
//       "toothName": "Upper Right Lateral Incisor",
//       "toothType": "Incisor",
//       "quadrant": "Upper Right",
//       "eruptionAge": "7-8 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 8,
//       "toothName": "Upper Right Central Incisor",
//       "toothType": "Incisor",
//       "quadrant": "Upper Right",
//       "eruptionAge": "6-7 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 9,
//       "toothName": "Upper Left Central Incisor",
//       "toothType": "Incisor",
//       "quadrant": "Upper Left",
//       "eruptionAge": "6-7 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 10,
//       "toothName": "Upper Left Lateral Incisor",
//       "toothType": "Incisor",
//       "quadrant": "Upper Left",
//       "eruptionAge": "7-8 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 11,
//       "toothName": "Upper Left Canine",
//       "toothType": "Canine",
//       "quadrant": "Upper Left",
//       "eruptionAge": "11-12 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 12,
//       "toothName": "Upper Left First Premolar",
//       "toothType": "Premolar",
//       "quadrant": "Upper Left",
//       "eruptionAge": "9-11 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 13,
//       "toothName": "Upper Left Second Premolar",
//       "toothType": "Premolar",
//       "quadrant": "Upper Left",
//       "eruptionAge": "10-11 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 14,
//       "toothName": "Upper Left First Molar",
//       "toothType": "Molar",
//       "quadrant": "Upper Left",
//       "eruptionAge": "6-7 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 15,
//       "toothName": "Upper Left Second Molar",
//       "toothType": "Molar",
//       "quadrant": "Upper Left",
//       "eruptionAge": "12-13 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 16,
//       "toothName": "Upper Left Third Molar",
//       "toothType": "Molar",
//       "quadrant": "Upper Left",
//       "eruptionAge": "17-21 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 17,
//       "toothName": "Lower Left Third Molar",
//       "toothType": "Molar",
//       "quadrant": "Lower Left",
//       "eruptionAge": "17-21 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 18,
//       "toothName": "Lower Left Second Molar",
//       "toothType": "Molar",
//       "quadrant": "Lower Left",
//       "eruptionAge": "12-13 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 19,
//       "toothName": "Lower Left First Molar",
//       "toothType": "Molar",
//       "quadrant": "Lower Left",
//       "eruptionAge": "6-7 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 20,
//       "toothName": "Lower Left Second Premolar",
//       "toothType": "Premolar",
//       "quadrant": "Lower Left",
//       "eruptionAge": "10-11 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 21,
//       "toothName": "Lower Left First Premolar",
//       "toothType": "Premolar",
//       "quadrant": "Lower Left",
//       "eruptionAge": "9-11 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 22,
//       "toothName": "Lower Left Canine",
//       "toothType": "Canine",
//       "quadrant": "Lower Left",
//       "eruptionAge": "11-12 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 23,
//       "toothName": "Lower Left Lateral Incisor",
//       "toothType": "Incisor",
//       "quadrant": "Lower Left",
//       "eruptionAge": "7-8 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 24,
//       "toothName": "Lower Left Central Incisor",
//       "toothType": "Incisor",
//       "quadrant": "Lower Left",
//       "eruptionAge": "6-7 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 25,
//       "toothName": "Lower Right Central Incisor",
//       "toothType": "Incisor",
//       "quadrant": "Lower Right",
//       "eruptionAge": "6-7 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 26,
//       "toothName": "Lower Right Lateral Incisor",
//       "toothType": "Incisor",
//       "quadrant": "Lower Right",
//       "eruptionAge": "7-8 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 27,
//       "toothName": "Lower Right Canine",
//       "toothType": "Canine",
//       "quadrant": "Lower Right",
//       "eruptionAge": "11-12 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 28,
//       "toothName": "Lower Right First Premolar",
//       "toothType": "Premolar",
//       "quadrant": "Lower Right",
//       "eruptionAge": "9-11 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 29,
//       "toothName": "Lower Right Second Premolar",
//       "toothType": "Premolar",
//       "quadrant": "Lower Right",
//       "eruptionAge": "10-11 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 30,
//       "toothName": "Lower Right First Molar",
//       "toothType": "Molar",
//       "quadrant": "Lower Right",
//       "eruptionAge": "6-7 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 31,
//       "toothName": "Lower Right Second Molar",
//       "toothType": "Molar",
//       "quadrant": "Lower Right",
//       "eruptionAge": "12-13 years",
//       "permanent": true
//     },
//     {
//       "toothNumber": 32,
//       "toothName": "Lower Right Third Molar",
//       "toothType": "Molar",
//       "quadrant": "Lower Right",
//       "eruptionAge": "17-21 years",
//       "permanent": true
//     }
//   ]
//   )

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

const clientAuthRouter = require("./commonClinetAuthentication/routes/clientAuth.routes.js");
const staffAuthRouter = require("./comonStaffAuthentication/routes/staffAuth.routes.js");


const clinetBranchRouter = require("./businessUnitAdministration/routes/branch.routes.js");
const clinetChairhRouter = require("./businessUnitAdministration/routes/chair.routes.js");
const clientEmployeeRouter = require("./businessUnitAdministration/routes/employee.routes.js")
const clinetRoleRouter = require("./businessUnitAdministration/routes/rolesAndPermission.routes.js");
const clientDepartment = require("./businessUnitAdministration/routes/department.routes.js");
const clientservicesRouter= require("./businessUnitAdministration/routes/service.routes.js");
const clientProcedureRouter= require("./businessUnitAdministration/routes/procedure.routes.js");




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


// middleware setup

app.use(cors());
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))



// connecting database
const DATABASE_URL = process.env.DATABASE_URL;
ConnectDb(DATABASE_URL);


// routes setup
app.use("/api", welcomeRouter.router);
app.use("/api/superAdmin", superAdminRouter.router);
app.use("/api/superAdmin/tooth", toothRouter); 
app.use("/api/superAdmin/bu/", superAdminBuRouter.router);

app.use("/api/clinet/auth/", clientAuthRouter.router);
app.use("/api/clinet/staff/auth/", staffAuthRouter.router);

app.use("/api/clinet/bu/branch", clinetBranchRouter.router);
app.use("/api/clinet/bu/chair", clinetChairhRouter.router);
app.use("/api/client/bu/employee", clientEmployeeRouter.router);
app.use("/api/clinet/branch/chair", clinetChairhRouter.router);
app.use("/api/clinet/bu/role", clinetRoleRouter.router);
app.use("/api/client/bu/department", clientDepartment);
app.use("/api/client/bu/services", clientservicesRouter);
app.use("/api/client/bu/procedures", clientProcedureRouter);
app.use("/api/client/bu/MediCases", medHistoryRoutes);
app.use("/api/client/bu/findings", findingsRouter);
app.use("/api/client/bu/chiefComplaint/",ccRouter )
app.use("/api/client/bu/investigation",investigationRouter)
app.use("/api/client/bu/booking",bookingRoutes)

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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





