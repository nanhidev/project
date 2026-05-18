// src/tests/searchevents.spec.js
require('dotenv').config();
const { test, expect } = require('@playwright/test');
const SearchEventsPage = require('../pages/SearchEventsPage');

test('Search Events', async ({ page }) => {
    const searchEventsPage = new SearchEventsPage(page);
    await searchEventsPage.navigate();
    await searchEventsPage.goToSignin();
    await searchEventsPage.login();
    await searchEventsPage.verifyDashboard();

    await searchEventsPage.searchForKeyword('Tech Conference');
    await searchEventsPage.verifySearchResults(5); // Adjust expected count based on actual test data
});