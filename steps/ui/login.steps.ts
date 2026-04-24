// steps/login.steps.ts
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import {ICustomWorld} from "@support/world";

// ── Hooks ────────────────────────────────────────────────────

Before(async function (this: ICustomWorld) {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext({
        baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        viewport: { width: 1280, height: 720 },
        recordVideo: process.env.CI ? { dir: 'test-results/videos' } : undefined,
    });
    this.page       = await this.context.newPage();
    this.loginPage  = new LoginPage(this.page);
});

After(async function (this: ICustomWorld, scenario) {
    if (scenario.result?.status === 'FAILED') {
        const screenshot = await this.page?.screenshot({ fullPage: true });
        if (screenshot) {
            this.attach(screenshot, 'image/png');
        }
    }
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
});

// ── Given ────────────────────────────────────────────────────

Given('I am on the SauceDemo login page', async function (this: ICustomWorld) {
    await this.loginPage!.goto();
});

// ── When ─────────────────────────────────────────────────────

When(
    'I enter username {string} and password {string}',
    async function (this: ICustomWorld, username: string, password: string) {
        await this.loginPage!.fillUsername(username);
        await this.loginPage!.fillPassword(password);
    }
);

When('I click the login button', async function (this: ICustomWorld) {
    await this.loginPage!.clickLogin();
});

When('I click the error dismiss button', async function (this: ICustomWorld) {
    await this.loginPage!.dismissError();
});

When('I open the burger menu', async function (this: ICustomWorld) {
    await this.loginPage!.openBurgerMenu();
});

When('I click logout', async function (this: ICustomWorld) {
    await this.loginPage!.clickLogout();
});

// ── Then ─────────────────────────────────────────────────────

Then('I should be redirected to the inventory page', async function (this: ICustomWorld) {
    await this.loginPage!.expectRedirectedToInventory();
});

Then('I should be redirected to the login page', async function (this: ICustomWorld) {
    await this.loginPage!.expectRedirectedToLogin();
});

Then('the page title should be {string}', async function (this: ICustomWorld, title: string) {
    await this.loginPage!.expectPageTitle(title);
});

Then(
    'I should see the error message {string}',
    async function (this: ICustomWorld, message: string) {
        await this.loginPage!.expectErrorMessage(message);
    }
);

Then('the error message should not be visible', async function (this: ICustomWorld) {
    await this.loginPage!.expectErrorNotVisible();
});