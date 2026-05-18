// src/pages/LoginScreenForRecruitersPage.js
class LoginScreenForRecruitersPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input[type="email"], input[name="email"], #email, [placeholder*="email" i]').first();
        this.passwordInput = page.locator('input[type="password"], input[name="password"], #password, [placeholder*="password" i]').first();
        this.loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")').first();
        this.getStartedButton = page.locator('text=Get Started').first();
        this.continueAsOrganizationButton = page.locator('text=Continue as Organization').first();
    }

    async navigate() {
        await this.page.goto(process.env.BASE_URL);
        await this.page.waitForLoadState('networkidle');
    }

    async goToSignin() {
        const url = this.page.url();
        if (!/signin|login/i.test(url)) {
            await this.getStartedButton.waitFor({ state: 'visible' });
            await this.getStartedButton.click();
            await this.page.waitForLoadState('networkidle');
            await this.continueAsOrganizationButton.waitFor({ state: 'visible' });
            await this.continueAsOrganizationButton.click();
            await this.page.waitForLoadState('networkidle');
        }
    }

    async login() {
        await this.emailInput.waitFor({ state: 'visible' });
        await this.emailInput.fill(process.env.EMAIL);
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.passwordInput.fill(process.env.PASSWORD);
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyDashboard() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/dashboard|home|recruiter/i, { timeout: 30000 });
    }
}

module.exports = LoginScreenForRecruitersPage;