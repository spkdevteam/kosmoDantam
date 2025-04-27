const sanitizeBody = require("../../../utils/sanitizeBody");
const { clientIdValidation, mongoIdValidation, isValidDate } = require("../../../utils/validation");
const getActivitylogFn = require("../../services/activityLog/getActivitylogFn");

const activityLog = async (req, res, next) => {
    try {
      const { activityId, page, perPage, searchKey, fromDate, toDate, userId, buId, branchId, patientId, createdUser, updatedUser, clientId } = await sanitizeBody(req.query);

      const validation = [
          clientIdValidation({ clientId })
      ];
      if(activityId){
          validation.push(mongoIdValidation({_id: activityId, name: "activityId"}));
      }
      if(buId){
          validation.push(mongoIdValidation({_id: buId, name: "businessUnitId"}));
      }
      if(branchId){
          validation.push(mongoIdValidation({_id: branchId, name: "branchId"}));
      }
      if(userId){
          validation.push(mongoIdValidation({_id: userId, name: "userId"}));
      }
      if(createdUser){
          validation.push(mongoIdValidation({_id: createdUser, name: "createdUser"}));
      }
      if(updatedUser){
          validation.push(mongoIdValidation({_id: updatedUser, name: "updatedUser"}));
      }
      if(patientId){
          validation.push(mongoIdValidation({_id: patientId, name: "patientId"}));
      }
      // if(status){
      //     validation.push(validateStatus({ value: status }));
      // }

      const errors = validation.filter((e)=> !e.status);
      if(errors.length > 0) return res.status(400).json({status: false, message: errors.map((e)=> e.message).join(", ")})

      if (page && (isNaN(page) || page < 1)) return { status: false, message: "Invalid page number" };
      if (perPage && (isNaN(perPage) || perPage < 1)) return { status: false, message: "Invalid per page number" };

      if (fromDate && !isValidDate({ value: fromDate }).status) return { status: false, message: "Invalid from date" };
      if (toDate && !isValidDate({ value: toDate }).status) return { status: false, message: "Invalid to date" };
      const result = await getActivitylogFn({ activityId, page, perPage, searchKey, fromDate, toDate, userId, buId, branchId, patientId, createdUser, updatedUser, clientId });
      return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data });
    } catch (error) {
        next(error);
    }
}

module.exports = activityLog;