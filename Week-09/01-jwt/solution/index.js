const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email
    if (!emailRegex.test(username) || password.length < 6) {
        return null; // Return null for invalid inputs
    }
    return jwt.sign({ username, password }, jwtPassword);
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    try {
        jwt.verify(token, jwtPassword); // Verifies the token with the secret
        return true; // Token is valid
    } catch (error) {
        return false; // Token is invalid or expired
    }
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {boolean} Returns true if the token is successfully decoded.
 *                    Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    try {
        const decoded = jwt.decode(token); // Decode without verification
        return decoded ? true : false; // Return true if decoded, false otherwise
    } catch (error) {
        return false; // Return false for invalid tokens
    }
}


module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword,
};
