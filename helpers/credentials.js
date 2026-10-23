require('dotenv').config();

function getCredentials(role, environment) {

    const prefix = environment.toUpperCase();
    const roleName = role.toUpperCase();

    const usernameKey = `${prefix}_${roleName}_USERNAME`;
    const passwordKey = `${prefix}_${roleName}_PASSWORD`;

    const username = process.env[usernameKey];
    const password = process.env[passwordKey];

    if (!username || !password) {
        throw new Error(
            `Credentials not found for ${environment} / ${role}`
        );
    }

    return {
        username,
        password
    };
}

module.exports = {
    getCredentials
};