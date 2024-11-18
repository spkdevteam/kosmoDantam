
function  validateEmail (email){
    try {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        return isEmail
    } catch (error) {
        return false
    }

}
module.exports = validateEmail