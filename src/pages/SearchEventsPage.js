// src/pages/SearchEventsPage.js
class SearchEventsPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input[type="email"], input[name="email"], #email, [placeholder*="email" i]').first();
        this.passwordInput = page.locator('input[type="password"], input[name="password"], #password, [placeholder*="password" i]').first();
        this.loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")').first();
        this.dashboardUrlPattern = /dashboard|home|recruiter/i;
        this.searchBar = page.locator('input[placeholder*="search" i]').first();
        this.searchButton = page.locator('button:has-text("Search")').first();
        this.resultsContainer = page.locator('.results-container').first();
    }

    async navigate() {
        await this.page.goto(process.env.BASE_URL, { waitUntil: 'networkidle' });
        await this.page.waitForLoadState('networkidle');
    }

    async goToSignin() {
        const isLoginVisible = await this.loginButton.isVisible();
        if (!isLoginVisible) {
            await this.page.locator('text=Get Started').first().click();
            const continueButton = this.page.locator('text=Continue as Organization').first();
            if (await continueButton.isVisible()) {
                await continueButton.click();
            }
        }
        await this.page.waitForLoadState('networkidle');
    }

    async login() {
        await this.emailInput.waitFor({ state: 'visible' });
        await this.emailInput.fill(process.env.EMAIL);
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.passwordInput.fill(process.env.PASSWORD);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyDashboard() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForURL(this.dashboardUrlPattern, { timeout: 30000 });
    }

    async searchForKeyword(keyword) {
        await this.searchBar.waitFor({ state: 'visible' });
        await this.searchBar.fill(keyword);
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifySearchResults(expectedCount) {
        const results = await this.resultsContainer.locator('.event-record').count();
        expect(results).toBe(expectedCount);
    }
}

module.exports = SearchEventsPage;