Feature: Booking Management

  Scenario: User should be able to create a successful booking
    Given I navigate to the Restful Booker home page
    And I fill the booking form with valid details:
      | firstname | Turkay           |
      | lastname  | Yildiz           |
      | email     | test@example.com |
      | phone     | 12345678901      |
    And I select the booking dates
    And I click the book button
    Then I should see a success message "Booking Successful!"