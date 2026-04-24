import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser } from 'playwright';
import { ICustomWorld } from '../support/world';
import { LoginPage } from '../pages/loginPage';

let browser: Browser;

BeforeAll(async () => {
    browser = await chromium.launch({
        headless: false,
        slowMo: 800,
    });
});

AfterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000)); // ← wait 3s before browser dies
    await browser.close();
});

Before(async function (this: ICustomWorld) {
    this.context = await browser.newContext({
        baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        viewport: { width: 1280, height: 720 },
    });
    this.page      = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
});

After(async function (this: ICustomWorld, scenario) {
    if (scenario.result?.status === 'FAILED') {
        const shot = await this.page?.screenshot({ fullPage: true });
        if (shot) this.attach(shot, 'image/png');
    }
    await new Promise(resolve => setTimeout(resolve, 2000)); // ← 2s pause after each scenario
    await this.page?.close();
    await this.context?.close();
});