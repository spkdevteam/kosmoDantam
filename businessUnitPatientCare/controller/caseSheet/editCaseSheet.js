const editcaseSheet = require("../../services/caseSheet/editCaseSheet")

const postEditCaseSheet = async (req,res)=>{


    try {
        const result = await editcaseSheet()
        res.json({})
    } catch (error) {
        
    }
}

module.exports = postEditCaseSheet


// sample Object 


// tooth:[
//     {
//         toothNumber:47,
//         _id:id0001,
//         status:Cancelled
//     }
//     ,{
//         toothNumber:50,
//         _id:id0001,
//         status:Cancelled
//     },
//     {
//         toothNumber:24,
//         _id:id0001,
//         status:proposed 
//     },
//     {
//         toothNumber:14,
//         _id:id0001,
//         status:proposed 
//     },
//     {
//         toothNumber:15,
//         _id:id0001,
//         status:proposed 
//     },
//     {
//         toothNumber:20,
//         _id:id0001,
//         status:proposed
//     }
//      ]
//      service_id:serv0001,
//      rate:200
//      discount:60
//      total:1140