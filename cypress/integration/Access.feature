Feature: Authentication

  I want to authenticate

  Scenario: Base64Token is valid
    Given AccessRequest
    When I send AccessRequest with valid Base64Token
    Then I should have Authenticate response
    And Response time is less than 3000 ms

  Scenario: Base64Token isn't valid
    Given AccessRequest
    When I send AccessRequest without valid Base64Token
    Then I should have Authentication error response
    And Response time is less than 3000 ms