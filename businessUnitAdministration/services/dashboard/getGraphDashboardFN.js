const getGraphDashboardFN = async ({ clientId, buId, branchId, module, viewType, fromDate, toDate }) => {
    try {
        //db connection :
        const db = await getClientDatabaseConnection(clientId);
        const Appointment = await db.model('Appointment', appointmentSchema);
        const User = await db.model('clientUsers', clinetUserSchema);
        const metaData = {
            fromDate: fromDate,
            toDate: toDate,
            module: module,
            viewType : viewType
        };
        const returnData = [];

        if(String(module?.toLowerCase()) == String('Appointment').toLowerCase()){
            const filterQuery = {
                deletedAt: null,
            };
            filterQuery.buId = new mongoose.Types.ObjectId(buId)
            if(branchId) filterQuery.branchId 
            filterQuery.date.$gte = new Date(`${fromDate}T00:00:00.000Z`);
            filterQuery.date.$lte = new Date(`${toDate}T23:59:59.999Z`);
        }
        else if(module == 'Registration'){

        }
        else{

        }

    }
    catch (error) {
        console.log("error", error?.message)
        return { status: false, message: error?.message, data: [], metadata: {} }
    }
}

module.exports = getGraphDashboardFN