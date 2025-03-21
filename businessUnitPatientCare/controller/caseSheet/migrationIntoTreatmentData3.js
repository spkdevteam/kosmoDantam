const migrationIntoTreatmentData3Fn = require("../../services/caseSheet/migrationIntoTreatmentData3Fn");

const migrationIntoTreatmentData3 = async(req, res, next)=>{
try{
    // const {services, clientId} = req?.body;
    // if(!services || !clientId) return res.status(200).json({ status: false, message: "CAn not found !! ", data: {}});
    // const clientIdValidation = ({ clientId }) => {
    //     if (!clientId || typeof clientId !== "string" || clientId.length !== 24 || !/^[A-Za-z0-9]+$/.test(clientId)) {
    //         return { status: false, message: "Some networking problem",  data : {} };
    //     }
    // }
    // clientIdValidation({ clientId });
    const result = await migrationIntoTreatmentData3Fn();
    return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data});
}
catch (error) {
    next(error);
}
}
module.exports = migrationIntoTreatmentData3