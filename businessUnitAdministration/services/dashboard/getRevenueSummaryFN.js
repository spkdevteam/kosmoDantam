const { getClientDatabaseConnection } = require("../../../db/connection")

const getRevenueSummaryCTRL = async ({clientId,buid,branchId,from_date,to_date})=>{
    try {
        const db =await getClientDatabaseConnection(clientId)



    } catch (error) {
        
    }
}


module.exports = getRevenueSummaryCTRL