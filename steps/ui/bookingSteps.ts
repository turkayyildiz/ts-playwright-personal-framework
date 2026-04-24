import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BookingPage } from '../../pages/bookingPage';

Given('I navigate to the Restful Booker home page', async function () {
    await this.page.goto('https://restful-booker.herokuapp.com/');
});

When('I fill the booking form with valid details:', async function (table) {
    const data = table.rowsHash();
    const bookingPage = new BookingPage(this.page);
    await bookingPage.fillForm(data.firstname, data.lastname, data.email, data.phone);
});

When('I select the booking dates', async function () {
    // Restful Booker'da tarihler genellikle takvimden sürükle-bırak veya tıklama ile seçilir.
    // Şimdilik en basit haliyle bir tarih seçimi simüle edelim.
    await this.page.click('.rb-calendar-day-selected');
});

When('I click the book button', async function () {
    const bookingPage = new BookingPage(this.page);
    await bookingPage.bookButton.click();
});

Then('I should see a success message {string}', async function (expectedMessage) {
    // Başarı mesajının çıktığı elementi doğrula
    const successModal = this.page.locator('.alert-success');
    await expect(successModal).toContainText(expectedMessage);
});