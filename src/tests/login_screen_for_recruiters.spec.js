// src/tests/LoginScreenForRecruiters.spec.js
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const LoginScreenForRecruitersPage = require('../pages/LoginScreenForRecruitersPage');

test('Verify Get Started button and login flow', async ({ page }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await loginPage.navigate(process.env.BASE_URL);
  await loginPage.goToSignin();

  await loginPage.enterEmail('recruiter@example.com');
  await loginPage.enterPassword('SecurePassword123');
  
  await loginPage.clickLogin();
  await loginPage.verifyDashboard();
});

test('Verify Show/Hide Password functionality', async ({ page }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await loginPage.navigate(process.env.BASE_URL);
  await loginPage.goToSignin();

  await loginPage.enterPassword('P@ssw0rd123');
  const passwordField = loginPage.page.locator('input[type="password"], input[name="password"], [placeholder*="password" i], #password').first();
  
  await passwordField.waitFor({ state: 'visible' });
  await loginPage.page.locator('text=Show/Hide Password').first().click();
  await expect(passwordField).toHaveAttribute('type', 'text');
  
  await loginPage.page.locator('text=Show/Hide Password').first().click();
  await expect(passwordField).toHaveAttribute('type', 'password');
});

test('Verify Login button enabled state', async ({ page }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await loginPage.navigate(process.env.BASE_URL);
  await loginPage.goToSignin();

  await loginPage.enterEmail('krishna@gmail.com');
  await loginPage.enterPassword('SecurePassword123');

  const loginBtn = loginPage.page.locator('button:has-text("Login"), button:has-text("Sign in"), [type="submit"]').first();
  await expect(loginBtn).toBeEnabled();
});

test('Verify login with various email formats', async ({ page }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await loginPage.navigate(process.env.BASE_URL);
  await loginPage.goToSignin();

  const emailFormats = ['user.name@subdomain.example.com', 'user+test@example.com'];
  for (const email of emailFormats) {
    await loginPage.enterEmail(email);
    await loginPage.enterPassword('ValidPassword123');
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
    await loginPage.navigate(process.env.BASE_URL); // Navigate back for the next iteration
  }
});

test('Verify login functionality across different browsers', async ({ browserName }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await loginPage.navigate(process.env.BASE_URL);
  await loginPage.goToSignin();

  await loginPage.enterEmail('recruiter@example.com');
  await loginPage.enterPassword('SecurePassword123');
  
  await loginPage.clickLogin();
  await loginPage.verifyDashboard();
});