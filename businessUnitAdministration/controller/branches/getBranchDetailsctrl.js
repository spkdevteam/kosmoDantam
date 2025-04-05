const httpStatusCode = require("../../../utils/http-status-code");
const message = require("../../../utils/message");
const sanitizeBody = require("../../../utils/sanitizeBody");
const {mongoIdValidation, clientIdValidation, emptyStringValidation,isValidDate } = require("../../../utils/validation");
const getBranchDetailsFn = require("../../services/branches/getBranchDetailsFn");

const getBranchDetailsctrl = async (req, res) => {
    try {
        console.log("req?.query==>>>",req?.query);
        const data = await sanitizeBody(req?.query);
        console.log("inputData==>>>",data);
        const {from_Date, toDate, clientId, businessUnitId, updatedUser, createdUser} = data;
        //from_Date, toDate,SearchKey, page, perPage, clientId, businessUnitId
        
        const validation = [
            clientIdValidation({ clientId }),
            // emptyStringValidation({string:data?.SearchKey, name: "searchKey"}),
        ];
        if(from_Date){
            validation.push(isValidDate({ value :from_Date}));
        }
        if(toDate){
            validation.push(isValidDate({ value : toDate}));
        }
        if(businessUnitId){
            validation.push(mongoIdValidation({_id :businessUnitId, name:"businessUnitId" }));
        }
        if(createdUser){
            validation.push(mongoIdValidation({_id : createdUser, name : createdUser}))
        }
        if(updatedUser){
            validation.push(mongoIdValidation({_id : updatedUser, name : updatedUser}))
        }
        const error = validation.filter((e) => e && e.status == false);
        // if (error.length > 0) return { status: false, message: error.map(e => e.message).join(", ") };
        if (error.length > 0) {
            console.log("Validation failed:", error);
            return res.status(httpStatusCode.BadRequest).send({
                status: false,
                message: error.map(e => e.message).join(", ")
            });
        }
        console.log("here");
        const cleanQuery = {
            page: data.page ? data.page.replace(/^"|"$/g, "") : null, // default to "1" if missing
            perPage: data.perPage ? data.perPage.replace(/^"|"$/g, "") : null, // default to "10"
            SearchKey: data.SearchKey ? String(data.SearchKey.replace(/^"|"$/g, "")) : "", // default to empty string
        };
        const { page, perPage, SearchKey } = cleanQuery;
        const result = await getBranchDetailsFn({from_Date, toDate, SearchKey, page, perPage, clientId, businessUnitId,
            createdBy : createdUser, updatedBy : updatedUser
         });
        console.log("result=>>>>",result) 
        if(!result?.status) return res.status(httpStatusCode.InternalServerError).send({
            message: result?.message,
            status: result?.status
        });
        return res.status(200).send({message : result?.message, data : {branches : result?.data, metaData : result?.metaData}, status : true});
    } catch (error) {
        console.error("Error in list Branches:", error);
        return res.status(httpStatusCode.InternalServerError).send({
            message: message.lblInternalServerError,
            error: error.message,
        });
    }
}


module.exports = getBranchDetailsctrl