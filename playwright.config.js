
const { defineConfig, devices } = require('@playwright/test');
const fs = require('fs');
require('dotenv').config();

const envConfig = JSON.parse(
    fs.readFileSync('./config/env.json', 'utf-8')
);

const currentEnvironment = envConfig.environments[envConfig.current];

const hostAuthFile = `auth/${envConfig.current}-host.json`;
const backofficeAuthFile = `auth/${envConfig.current}-backoffice.json`;

module.exports = defineConfig({
    testDir: './tests',

    timeout: 100000,

    expect: {
        timeout: 10000
    },

    reporter: 'html',

    use: {
        baseURL: currentEnvironment.baseURL,
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        ignoreHTTPSErrors: true
    },

    projects: [
        {
            name: 'setup',
            testMatch: '**/setup/auth.setup.js'
        },

        {
            name: 'host',
            testMatch: '**/host/**/*.spec.js',
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                storageState: hostAuthFile
            }
        },

        {
            name: 'backoffice',
            testMatch: '**/backoffice/**/*.spec.js',
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                storageState: backofficeAuthFile
            }
        }
    ]
});
