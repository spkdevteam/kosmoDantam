const sanitizeBody = require("../../../utils/sanitizeBody");
const { mongoIdValidation, clientIdValidation, isValidDate } = require("../../../utils/validation");
const getAppointmentWithFilterFn = require("../../services/appointment/getAppointmentWithFilterFn");

const getAppointmentWithFilter = async (req, res, next) => {
    try {
        const { page = null, perPage = null, searchKey, chairId, appointmentId, fromDate, toDate, buId, branchId, dutyDoctorId, specialistDoctorId, dentalAssistant, patientId, caseSheetId, caseId, createdUser, updatedUser, clientId } = await sanitizeBody(req.query);

        const validation = [
            clientIdValidation({ clientId })
        ];
        if(appointmentId){
            validation.push(mongoIdValidation({_id: appointmentId, name: "appointmentId"}));
        }
        if(buId){
            validation.push(mongoIdValidation({_id: buId, name: "buId"}));
        }
        if(dutyDoctorId){
            validation.push(mongoIdValidation({_id: dutyDoctorId, name: "dutyDoctorId"}));
        }
        if(chairId){
            validation.push(mongoIdValidation({_id: chairId, name: "chairId"}));
        }
        if(specialistDoctorId){
            validation.push(mongoIdValidation({_id: specialistDoctorId, name: "specialistDoctorId"}));
        }
        if(dentalAssistant){
            validation.push(mongoIdValidation({_id: dentalAssistant, name: "dentalAssistantId"}));
        }
        if(patientId){
            validation.push(mongoIdValidation({_id: patientId, name: "patientId"}));
        }
        if(caseSheetId){
            validation.push(mongoIdValidation({_id: caseSheetId, name: "caseSheetId"}));
        }
        if(caseId){
            validation.push(mongoIdValidation({_id: caseId, name: "caseId"}));
        }
        if(branchId){
            validation.push(mongoIdValidation({_id: branchId, name: "branchId"}));
        }
        if(createdUser){
            validation.push(mongoIdValidation({_id: createdUser, name: "createdUser"}));
        }
        if(updatedUser){
            validation.push(mongoIdValidation({_id: updatedUser, name: "updatedUser"}));
        }
        // if(deletedUser){
        //     validation.push(mongoIdValidation({_id: deletedUser, name: "deletedUser"}));
        // }
        // if(status){
        //     validation.push(validateStatus({ value: status }));
        // }

        const errors = validation.filter((e)=> !e.status);
        if(errors.length > 0) return res.status(400).json({status: false, message: errors.map((e)=> e.message).join(", ")})

        if (page && (isNaN(page) || page < 1)) return { status: false, message: "Invalid page number" };
        if (perPage && (isNaN(perPage) || perPage < 1)) return { status: false, message: "Invalid per page number" };

        if (fromDate && !isValidDate({ value: fromDate }).status) return { status: false, message: "Invalid from date" };
        if (toDate && !isValidDate({ value: toDate }).status) return { status: false, message: "Invalid to date" };
        // if (slotFrom && !isValidDate({ value: slotFrom }).status) return { status: false, message: "Invalid slot from date" };
        // if (slotTo && !isValidDate({ value: slotTo }).status) return { status: false, message: "Invalid slot to date" };
        const result = await getAppointmentWithFilterFn({ page, perPage, searchKey, chairId, appointmentId, fromDate, toDate, buId, branchId, dutyDoctorId, specialistDoctorId, dentalAssistant, patientId, caseSheetId, caseId ,createdUser, updatedUser, clientId });
        return res.status(200).json({ status: result?.status, message: result?.message, data: result?.data });
    } catch (error) {
        next(error);
    }
}

module.exports = getAppointmentWithFilter;