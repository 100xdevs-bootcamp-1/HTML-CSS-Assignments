const jwt = require('jsonwebtoken');
const jwtPassword = 'secret_key';

/**
 * Generates a JWT that includes a user's role (admin or guest).
 * * @param {string} username - The user's email.
 * @param {string} role - The user's role, must be either 'admin' or 'guest'.
 * @returns {string|null} A JWT if role is valid; otherwise null.
 */
function signJwtWithRole(username, role) {
    if (role !== 'admin' && role !== 'guest') {
        return null;
    }

    const token = jwt.sign({
        username: username,
        role: role
    }, jwtPassword);

    return token;
}

/**
 * Checks if a given token belongs to an admin.
 * * @param {string} token - The JWT string.
 * @returns {boolean} True if the role in the payload is 'admin', false otherwise.
 */
function isAdmin(token) {
    try {
        const decoded = jwt.verify(token, jwtPassword);
        return decoded.role === 'admin';
    } catch (e) {
        // If token is invalid or expired
        return false;
    }
}

module.exports = {
    signJwtWithRole,
    isAdmin,
    jwtPassword
};