Feature: SMS Send

  I want to send SMS

  Scenario: SMS is valid
    Given AccessRequest
    When I send SMS
    Then I should have valid SMS response

  Scenario: Insufficient Balance
    Given AccessRequest
    When I send SMS
    Then I should have Insufficient Balance error

  Scenario: Invalid token
    Given AccessRequest
    When I send SMS with Invalid token
    Then I should have Invalid token error

  Scenario: Invalid message
    Given AccessRequest
    When I send SMS without message
    Then I should have Invalid value of a field

  Scenario: Invalid phone
    Given AccessRequest
    When I send SMS without phone
    Then I should have Invalid value of a field

  Scenario: Invalid phone
    Given AccessRequest
    When I send SMS with Invalid phone
    Then I should have Invalid value of a field

  Scenario: Invalid sender
    Given AccessRequest
    When I send SMS without sender
    Then I should have Invalid sender of a field

  Scenario: Invalid sender
    Given AccessRequest
    When I send SMS with Invalid sender
    Then I should have Invalid sender of a field