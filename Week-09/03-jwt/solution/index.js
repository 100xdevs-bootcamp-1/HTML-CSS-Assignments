const jwt = require('jsonwebtoken');
const jwtPassword = 'secret_key';

/**
 * Generates a "Short-Lived" JWT that expires in 1 minute.
 * * @param {string} username - The user's email.
 * @returns {string} A JWT that will be invalid after 60 seconds.
 */
function signShortLivedToken(username) {
    // The second argument is the payload, the third is options
    return jwt.sign({ username }, jwtPassword, { expiresIn: '1m' });
}

/**
 * Checks if a token is still valid or has expired.
 * * @param {string} token - The JWT string.
 * @returns {string} Returns "valid", "expired", or "invalid".
 */
function checkTokenStatus(token) {
    try {
        jwt.verify(token, jwtPassword);
        return "valid";
    } catch (err) {
        // jsonwebtoken library provides a specific name for expiry errors
        if (err.name === 'TokenExpiredError') {
            return "expired";
        }
        // Covers wrong passwords, malformed strings, etc.
        return "invalid";
    }
}

module.exports = {
    signShortLivedToken,
    checkTokenStatus,
    jwtPassword
};