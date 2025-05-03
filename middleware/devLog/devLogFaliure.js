const { getClientDatabaseConnection } = require("../../db/connection");
const devLogSchema = require("../../model/devLog");

const devLogFaliure = async (req, res, next) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const LOG = clientConnection.model('devLog', devLogSchema);

        console.log("req.faliure==>>>>", req?.faliure);
        const saving = await LOG.insertOne(req?.faliure)
        if (saving) {
            console.log("error logged!!")
        }
        next();
    }
    catch (error) {
        console.error(error);
        next();
    }
}

module.exports = devLogFaliure