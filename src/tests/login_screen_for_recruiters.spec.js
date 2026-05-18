// src/tests/loginscreenforrecruiters.spec.js
require('dotenv').config();
const { test, expect } = require('@playwright/test');
const LoginScreenForRecruitersPage = require('../pages/LoginScreenForRecruitersPage');

test('Login Screen for Recruiters', async ({ page }) => {
    const loginPage = new LoginScreenForRecruitersPage(page);
    await loginPage.navigate();
    await loginPage.goToSignin();
    await loginPage.login();
    await loginPage.verifyDashboard();
});