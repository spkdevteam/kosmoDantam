function validatePhone (phone){
    try {
        const isPhone = /^\d{10}$/.test(identifier);
        return isPhone
    } catch (error) {
        return false
    }
}
module.exports = validatePhone