const getEmployeegraphFn = require("../../services/dashboard/getEmployeegraphFn")
const getPerformanceDashboardFN = require("../../services/dashboard/getPerformanceDashboardFN")

const getEmployeegraphCTRL =async  (req,res,next)=>{
try {
 const  {clientId, buId, branchId, roleId, fromDate, toDate} = req.query
    const result =await getEmployeegraphFn({clientId, buId, branchId, roleId, fromDate, toDate})
    res.json(result)

} catch (error) {
    next()
}
     
}

module.exports = getEmployeegraphCTRL