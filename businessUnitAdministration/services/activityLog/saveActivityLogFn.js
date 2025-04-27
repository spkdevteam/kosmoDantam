const { getClientDatabaseConnection } = require("../../../db/connection");
const { activityLogSchema } = require("../../../model/activityLog");

const saveActivityLogFn = async ({ patientId, module, branchId, buId, userId, ipAddress, sourceLink, activity, description, data, status, dateTime, clientId }) => {
    try {
        const db = await getClientDatabaseConnection(clientId);

        const ActivityLogModel = await db.model("activityLog", activityLogSchema);

        const ActivityLog = new ActivityLogModel({
            patientId,
            module,
            branchId,
            buId,
            userId,
            ipAddress,
            sourceLink,
            activity,
            description,
            data,
            status,
            dateTime,
            createdBy: userId,
        });

        const savedActivity = await ActivityLog.save();

        return { status: true, message: "Activity log saved succesfully", data: savedActivity };
    } catch (error) {
        console.log("error while saving activity log-->",error.message);
        return { status: false, message: error.message };
    }
}


module.exports = saveActivityLogFn;



// "patientId": "P000001",
//         "module": "P000008",
//         "branchId": "Br00001",
//         "buId": "bu00001",
//         "userId": "Doctor-1",
//         "ipAddress": "192.168.152.1475",
//         "sourceLink": "dantam.app/invoice",
//         "activity": "Invoice Created",
//         "description": "",
//         "data":{},
//         "status":false ,
//         "datetime":'12/05/1988T00:10:51.000z'