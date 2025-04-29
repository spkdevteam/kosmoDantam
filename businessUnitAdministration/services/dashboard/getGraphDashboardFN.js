const getGraphDashboardFN = async ({ clientId,
    buId,
    branchId, module, viewType, fromDate, toDate }) => {
    try {
        //db connection :
        const db = await getClientDatabaseConnection(clientId);
        const Appointment = await db.model('Appointment', appointmentSchema);
        const User = await db.model('clientUsers', clinetUserSchema);
        if(module == 'Appointment'){
            const filterQuery = {
                deletedAt: null,
            };
            
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