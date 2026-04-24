import { Page, Locator } from '@playwright/test';

export class BookingPage {
    readonly page: Page;
    readonly firstnameInput: Locator;
    readonly lastnameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly bookButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstnameInput = page.locator('input[name="firstname"]');
        this.lastnameInput = page.locator('input[name="lastname"]');
        this.emailInput = page.locator('input[name="email"]');
        this.phoneInput = page.locator('input[name="phone"]');
        this.bookButton = page.locator('button:has-text("Book")');
    }

    async fillForm(first: string, last: string, email: string, phone: string) {
        await this.firstnameInput.fill(first);
        await this.lastnameInput.fill(last);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
    }
}