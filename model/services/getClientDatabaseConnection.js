
const connectionPool = new Map();
require('dotenv').config();

async function getClientDatabaseConnection (clientId){

    console.log("connectionPool",connectionPool);
    if (connectionPool.has(clientId)) {
        // Reuse existing connection if available
        return connectionPool.get(clientId);
    }

    // Create a new connection if none exists
    const clientData = await User.findById( clientId );
    if (!clientData) throw new Error('Client not found');

    // Append the client-specific database name to the base URL
    const clientDatabaseUrl = `${process.env.DATABASE_URL}client_${clientId}?retryWrites=true&w=majority`;

    const clientConnection = mongoose.createConnection(clientDatabaseUrl, {});

    // Store the connection in the pool
    connectionPool.set(clientId, clientConnection);

    // Optionally set a timeout to close the connection if idle
    // setTimeout(() => {
    //     if (connectionPool.has(clientId)) {
    //         connectionPool.get(clientId).close();
    //         connectionPool.delete(clientId);
    //     }
    // }, 10 * 60 * 1000); // Close after 10 minutes of inactivity

    return clientConnection;

};

module.exports = getClientDatabaseConnection