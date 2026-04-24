import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(20 * 1000);

let browser: Browser;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: true });
});

Before(async function () {
    const context = await browser.newContext();
    // 'this' anahtar kelimesi Cucumber World'e erişir.
    // 'page' objesini buraya atıyoruz.
    this.page = await context.newPage();
});

After(async function () {
    await this.page.close();
});

AfterAll(async function () {
    await browser.close();
});