# features/login.feature
@login
Feature: Login - SauceDemo

  As a user of SauceDemo
  I want to authenticate via the login page
  So that I can access the inventory

  Background:
    Given I am on the SauceDemo login page

  @smoke @positive
  Scenario: Successful login with valid credentials
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be redirected to the inventory page
    And the page title should be "Swag Labs"

  @positive
  Scenario Outline: Multiple valid user types can log in
    When I enter username "<username>" and password "secret_sauce"
    And I click the login button
    Then I should be redirected to the inventory page

    Examples:
      | username                |
      | standard_user           |
      | problem_user            |
      | performance_glitch_user |

  @negative
  Scenario: Login fails with invalid credentials
    When I enter username "invalid_user" and password "wrong_password"
    And I click the login button
    Then I should see the error message "Username and password do not match any user in this service"

  @negative
  Scenario: Login fails when username is empty
    When I enter username "" and password "secret_sauce"
    And I click the login button
    Then I should see the error message "Username is required"

  @negative
  Scenario: Login fails when password is empty
    When I enter username "standard_user" and password ""
    And I click the login button
    Then I should see the error message "Password is required"

  @negative
  Scenario: Locked out user cannot log in
    When I enter username "locked_out_user" and password "secret_sauce"
    And I click the login button
    Then I should see the error message "Sorry, this user has been locked out"

  @security
  Scenario: Error message can be dismissed
    When I enter username "bad_user" and password "bad_pass"
    And I click the login button
    And I click the error dismiss button
    Then the error message should not be visible

  @smoke
  Scenario: User can log out after successful login
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be redirected to the inventory page
    When I open the burger menu
    And I click logout
    Then I should be redirected to the login page