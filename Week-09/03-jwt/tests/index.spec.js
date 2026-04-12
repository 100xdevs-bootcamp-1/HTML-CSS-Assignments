const jwt = require('jsonwebtoken');
const {
  signShortLivedToken,
  checkTokenStatus,
  jwtPassword
} = require('../');

describe('signShortLivedToken', () => {
    test('signs a token with an expiration field', () => {
        const token = signShortLivedToken('kirat@gmail.com');
        const decoded = jwt.decode(token);
        expect(decoded).toHaveProperty('exp');
        expect(decoded.username).toBe('kirat@gmail.com');
    });
});

describe('checkTokenStatus', () => {
    test('returns "valid" for a correctly signed active token', () => {
        const token = jwt.sign({ username: 'kirat@gmail.com' }, jwtPassword, { expiresIn: '1m' });
        const status = checkTokenStatus(token);
        expect(status).toBe('valid');
    });

    test('returns "expired" for a token that has timed out', () => {
        const expiredToken = jwt.sign(
            { username: 'kirat@gmail.com', exp: Math.floor(Date.now() / 1000) - 10 }, 
            jwtPassword
        );
        const status = checkTokenStatus(expiredToken);
        expect(status).toBe('expired');
    });

    test('returns "invalid" for a token signed with the wrong secret', () => {
        const token = jwt.sign({ username: 'kirat@gmail.com' }, 'wrong_secret');
        const status = checkTokenStatus(token);
        expect(status).toBe('invalid');
    });

    test('returns "invalid" for a random string', () => {
        const status = checkTokenStatus("not-even-a-jwt");
        expect(status).toBe('invalid');
    });
});