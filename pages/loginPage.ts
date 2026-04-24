// pages/loginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly errorDismiss: Locator;
    private readonly burgerMenu: Locator;
    private readonly logoutLink: Locator;

    constructor(private readonly page: Page) {
        this.usernameInput  = page.locator('#user-name');
        this.passwordInput  = page.locator('#password');
        this.loginButton    = page.locator('#login-button');
        this.errorMessage   = page.locator('[data-test="error"]');
        this.errorDismiss   = page.locator('.error-button');
        this.burgerMenu     = page.locator('#react-burger-menu-btn');
        this.logoutLink     = page.locator('#logout_sidebar_link');
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
        await expect(this.loginButton).toBeVisible();
    }

    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.clear();
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    async dismissError(): Promise<void> {
        await this.errorDismiss.click();
    }

    async openBurgerMenu(): Promise<void> {
        await this.burgerMenu.click();
        await this.logoutLink.waitFor({ state: 'visible' });
    }

    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }

    // ── Assertions ──────────────────────────────────────────────

    async expectRedirectedToInventory(): Promise<void> {
        await expect(this.page).toHaveURL(/inventory\.html/);
    }

    async expectRedirectedToLogin(): Promise<void> {
        await expect(this.page).toHaveURL('/');
        await expect(this.loginButton).toBeVisible();
    }

    async expectPageTitle(title: string): Promise<void> {
        await expect(this.page).toHaveTitle(title);
    }

    async expectErrorMessage(partial: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(partial);
    }

    async expectErrorNotVisible(): Promise<void> {
        await expect(this.errorMessage).not.toBeVisible();
    }
}