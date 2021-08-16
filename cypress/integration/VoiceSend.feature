Feature: Voice message Send

  I want to send Voice message

  Scenario: Voice message on greek language with female voice
    Given AccessRequest
    When I send Voice message on greek language with female voice
    Then I should have valid Voice message
    And Response time is less than 3000 ms

  Scenario: Voice message on english (US) language with male voice
    Given AccessRequest
    When I send Voice message on english language with male voice
    Then I should have valid Voice message
    And Response time is less than 3000 ms

  Scenario: Voice message with DTMF collect file
    Given AccessRequest
    When I send Voice message with DTMF collect file
    Then I should have valid Voice message
    And Response time is less than 3000 ms

  Scenario: Voice message with Callback and Campaign Callback
    Given AccessRequest
    When I send Voice message with Callback
    Then I should have valid Voice message
    And Response time is less than 3000 ms

  Scenario: Invalid token
    Given AccessRequest
    When I send Voice message with Invalid token
    Then I should have Invalid token error
    And Response time is less than 3000 ms

  Scenario: Invalid message
    Given AccessRequest
    When I send Voice message without message
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid phone (without phone)
    Given AccessRequest
    When I send Voice message without phone
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid phone
    Given AccessRequest
    When I send Voice message with Invalid phone
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid sender (without sender)
    Given AccessRequest
    When I send Voice message without sender
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid sender
    Given AccessRequest
    When I send Voice message with Invalid sender
    Then I should have Invalid sender of a field
    And Response time is less than 3000 ms
  
  Scenario: Insufficient Balance
    Given AccessRequest Insufficient Balance
    When I send Voice message
    Then I should have Insufficient Balance error
    And Response time is less than 3000 ms