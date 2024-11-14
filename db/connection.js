const mongoose = require('mongoose');
require('dotenv').config();

const ConnectDb = async (DATABASE_URL) => {
    try {
        const DB_OPTION = { dbName: "SPK_Techno_Kosmo" };
        await mongoose.connect(DATABASE_URL, DB_OPTION);
        console.log("Main database connected successfully...");
    } catch (error) {
        console.error("Error connecting main database:", error);
    }
};

// Cache for active client connections
const clientConnections = {};

// Function to create or retrieve a database connection for a specific client
const createClientDatabase = async (clientId) => {
    // Check if the client connection already exists
    if (clientConnections[clientId]) {
        return clientConnections[clientId];
    }

    // Append the client-specific database name to the base URL
    const clientDatabaseUrl = `${process.env.DATABASE_URL}client_${clientId}?retryWrites=true&w=majority`;
    
    // Create a new database connection for the client
    const clientConnection = mongoose.createConnection(clientDatabaseUrl, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    clientConnections[clientId] = clientConnection;

    return clientConnection;
};

module.exports = { ConnectDb, createClientDatabase };
