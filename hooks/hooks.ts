import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';

setDefaultTimeout(20 * 1000);

let browser: Browser;

BeforeAll(async function () {
    browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });
});

Before(async function () {
    const context = await browser.newContext();
    this.page = await context.newPage();
});

After(async function () {
    if (this.page) {
        await this.page.close();
    }
});

AfterAll(async function () {
    if (browser) {
        await browser.close();
    }
});