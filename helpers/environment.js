const fs = require('fs');

const envConfig = JSON.parse(
    fs.readFileSync('./config/env.json', 'utf-8')
);

function getCurrentEnvironment() {
    return envConfig.current;
}

function getBaseURL() {
    const environment = getCurrentEnvironment();

    return envConfig.environments[environment].baseURL;
}

module.exports = {
    getCurrentEnvironment,
    getBaseURL
};