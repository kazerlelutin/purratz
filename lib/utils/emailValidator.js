
/**
 * 
 * @param {string} email email address
 * @description determine if email address if valid string.
 * @returns {boolean} true if valid email
 */
function emailValidator(email){
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !!email.match(mailFormat)
}
module.exports = emailValidator;