const jwt = require('jsonwebtoken');
const {
  signJwtWithRole,
  isAdmin,
  jwtPassword
} = require('../');

describe('signJwtWithRole', () => {
    test('signs a jwt with correct role', () => {
        const token = signJwtWithRole('kirat@gmail.com', 'admin');
        const decoded = jwt.decode(token);
        expect(decoded.role).toBe('admin');
        expect(decoded.username).toBe('kirat@gmail.com');
    });

    test('returns null for an invalid role', () => {
        const token = signJwtWithRole('kirat@gmail.com', 'superman');
        expect(token).toBe(null);
    });

    test('signs a guest role correctly', () => {
        const token = signJwtWithRole('user@gmail.com', 'guest');
        const decoded = jwt.decode(token);
        expect(decoded.role).toBe('guest');
    });
});

describe('isAdmin', () => {
    test('returns true for a valid admin token', () => {
        const token = jwt.sign({ username: 'admin@gmail.com', role: 'admin' }, jwtPassword);
        const result = isAdmin(token);
        expect(result).toBe(true);
    });

    test('returns false for a guest token', () => {
        const token = jwt.sign({ username: 'user@gmail.com', role: 'guest' }, jwtPassword);
        const result = isAdmin(token);
        expect(result).toBe(false);
    });

    test('returns false for a token signed with the wrong password', () => {
        const token = jwt.sign({ username: 'admin@gmail.com', role: 'admin' }, 'wrong_password');
        const result = isAdmin(token);
        expect(result).toBe(false);
    });

    test('returns false for a non-jwt string', () => {
        const result = isAdmin("not-a-token");
        expect(result).toBe(false);
    });
});