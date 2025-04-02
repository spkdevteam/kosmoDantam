const { default: mongoose } = require("mongoose");
const clientIdValidation = ({ clientId }) => {
    if (!clientId || typeof clientId !== "string" || clientId.length !== 24 || !/^[A-Za-z0-9]+$/.test(clientId)) {
        return { status: false, message: "Some networking problem" };
    }
    return { status: true, message: "Success" };
}
const emptyStringValidation = ({ string, name = "" }) => {
    if (typeof string !== "string" || string.length > 600 || !/^[A-Za-z0-9_\-,.'!?;()": ]*$/.test(string)) {
        return { status: false, message: `Invalid ${name}${string}` };
    }
    return { status: true, message: "Success" };
}
const mongoIdValidation = ({ _id, name = "" }) => {
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
        return { status: false, message: `Invalid ${name}` }
    }
    return { status: true, message: "Success" }
}
function isValidDate({ value }) {
    if (isNaN(new Date(value))) {
        return { status: false, message: "Invalid date" };
    }
    return { status: true, message: "Success" };
}

module.exports = {clientIdValidation, emptyStringValidation, mongoIdValidation, isValidDate}