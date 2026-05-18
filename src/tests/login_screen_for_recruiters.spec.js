// src/tests/LoginScreenForRecruiters.spec.js
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const LoginScreenForRecruitersPage = require('../pages/LoginScreenForRecruitersPage');

test('Login Screen for Recruiters - Get Started Flow', async ({ page }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await loginPage.navigate(process.env.BASE_URL);
  await loginPage.goToSignin();

  await loginPage.enterEmail('recruiter@example.com');
  await loginPage.enterPassword('SecurePassword123');

  await loginPage.clickLogin();
  await loginPage.verifyDashboard();
});

test('Login Screen for Recruiters - Show/Hide Password', async ({ page }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await loginPage.navigate(process.env.BASE_URL);
  await loginPage.goToSignin();

  await loginPage.enterPassword('P@ssw0rd123');
  const passwordField = this.page.locator('input[type="password"], input[name="password"], [placeholder*="password" i], #password').first();
  
  await passwordField.waitFor({ state: 'visible' });
  await this.page.locator('text=Show/Hide Password').first().click();
  await expect(passwordField).toHaveAttribute('type', 'text');
  
  await this.page.locator('text=Show/Hide Password').first().click();
  await expect(passwordField).toHaveAttribute('type', 'password');
});

test('Login Screen for Recruiters - Login Button Enabled', async ({ page }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await loginPage.navigate(process.env.BASE_URL);
  await loginPage.goToSignin();

  await loginPage.enterEmail('krishna@gmail.com');
  await loginPage.enterPassword('SecurePassword123');

  const loginButton = this.page.locator('button:has-text("Login"), button:has-text("Sign in"), [type="submit"]').first();
  await expect(loginButton).toBeEnabled();
});

test('Login Screen for Recruiters - Valid Email Formats', async ({ page }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await loginPage.navigate(process.env.BASE_URL);
  await loginPage.goToSignin();

  const validEmails = ['user.name@subdomain.example.com', 'user+test@example.com'];
  for (const email of validEmails) {
    await loginPage.enterEmail(email);
    await loginPage.enterPassword('ValidPassword123');
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
    await loginPage.navigate(process.env.BASE_URL); // Reset for next iteration
  }
});

test('Login Screen for Recruiters - Responsive Login', async ({ page }) => {
  const loginPage = new LoginScreenForRecruitersPage(page);

  await loginPage.navigate(process.env.BASE_URL);
  await loginPage.goToSignin();
  
  const devices = ['Desktop', 'Tablet', 'Mobile'];
  for (const device of devices) {
    await loginPage.enterEmail('recruiter@example.com');
    await loginPage.enterPassword('SecurePassword123');
    await loginPage.clickLogin();
    await loginPage.verifyDashboard();
    await loginPage.navigate(process.env.BASE_URL); // Reset for next iteration
  }
});