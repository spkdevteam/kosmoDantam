const editcaseSheet = require("../../services/caseSheet/editCaseSheet")

const postEditCaseSheet = async (req, res, next)=>{
    try {
        const {inputObj, clientId, caseSheetId, branchId, buid} = req?.body;
        //console.log("req?.bodyreq?.body=>>>",req?.body);
        if(!clientId || !caseSheetId ) return res.status(200).json({ status: false, message: "CAn not found !! ", data: {}});
        const result = await editcaseSheet({inputObj, clientId, caseSheetId,  branchId, buid});
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data});
    } catch (error) {
        next(error);
    }
}

module.exports = postEditCaseSheet

// 6782084da840f3a7bf1a2f72
///////////////////////////
            // /api/client/bu/caseSheet/editCaseSheet
            // req?.bodyreq?.body=>>> {
            // inputObj: {
            //     tooth: [ [Object], [Object], [Object] ],
            //     serviceid: '67a5c145451bda17bb4e42da',
            //     rate: 300,
            //     subTotal: 300,
            //     discount: 10,
            //     grantTotal: 290,
            //     finished: 'Proposed',
            //     prposedDate: '2025-03-17T00:00:00.000Z',
            //     department: '67a6edb65f984dad91cd02d9'
            // }
            // }
///////////////////////


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

/////
// {
//     "tooth":[
//         {
//             tooth:48,
//             serviceId:'67c94c385c39cf1c5a48e228',
//             status:'Proposed'
//         },
//          {
//             tooth:18,
//             serviceId:null,
//             status:'Proposed'
//         },
//         {
//             tooth:47,
//             serviceId:'67c94c385c39cf1c5a48e22b',
//             status:'cancelled'
//         },],
//     "serviceid": '67a5c145451bda17bb4e42da', 
//     "rate": 300,
//     "subTotal": 300,
//     "discount": 10,
//     "grantTotal": 290,
//     "finished": "Proposed",
//     "prposedDate":  "2025-03-17T00:00:00.000Z",
//     "department":"67a6edb65f984dad91cd02d9"
//     }