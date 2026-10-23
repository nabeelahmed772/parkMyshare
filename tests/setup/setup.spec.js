const { test: setup, expect } = require('@playwright/test');

const {
    getCurrentEnvironment
} = require('../../helpers/environment');

const {
    getCredentials
} = require('../../helpers/credentials');

const fs = require('fs');

const environment = getCurrentEnvironment();

const authDirectory = './auth';

if (!fs.existsSync(authDirectory)) {
    fs.mkdirSync(authDirectory, { recursive: true });
}

setup('authenticate host', async ({ page }) => {

    const credentials = getCredentials('host', environment);

    await page.goto('/dashboard');

    await page.getByRole('textbox', { name: 'Email' })
        .fill(credentials.username);

    await page.getByRole('textbox', { name: 'Password' })
        .fill(credentials.password);

    await page.getByRole('button', { name: 'Sign In' })
        .click();

    // Wait until login is completed
    await expect(page).toHaveURL(/vehicle/);

    await page.context().storageState({
        path: `auth/${environment}-host.json`
    });
});

setup('authenticate backoffice', async ({ page }) => {
    const credentials = getCredentials('backoffice', environment);

    await page.goto('/dashboard');

    await page.getByRole('textbox', { name: 'Email' })
        .fill(credentials.username);

    await page.getByRole('textbox', { name: 'Password' })
        .fill(credentials.password);

    await page.getByRole('button', { name: 'Sign In' })
        .click();

    await expect(page).toHaveURL(/dashboard/);

    await page.context().storageState({
        path: `auth/${environment}-backoffice.json`
    });
});