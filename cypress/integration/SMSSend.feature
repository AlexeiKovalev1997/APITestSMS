Feature: SMS Send

  I want to send SMS

  Scenario: SMS is valid
    Given AccessRequest
    When I send SMS
    Then I should have valid SMS response
    And Response time is less than 3000 ms

  Scenario: Insufficient Balance
    Given AccessRequest Insufficient Balance
    When I send SMS
    Then I should have Insufficient Balance error
    And Response time is less than 3000 ms

  Scenario: Invalid token
    Given AccessRequest
    When I send SMS with Invalid token
    Then I should have Invalid token error
    And Response time is less than 3000 ms

  Scenario: Invalid message
    Given AccessRequest
    When I send SMS without message
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid phone (without phone)
    Given AccessRequest
    When I send SMS without phone
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid phone
    Given AccessRequest
    When I send SMS with Invalid phone
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid sender (without sender)
    Given AccessRequest
    When I send SMS without sender
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid sender
    Given AccessRequest
    When I send SMS with Invalid sender
    Then I should have Invalid sender of a field
    And Response time is less than 3000 ms

  Scenario: SMS with shorten URL
    Given AccessRequest
    When I send SMS with shorten URL
    Then I should have valid urlShortener SMS response
    And Response time is less than 3000 ms
    
  Scenario: SMS with multiple parts
    Given AccessRequest
    When I send SMS with multiple parts
    Then I should have valid multiple parts SMS response
    And Response time is less than 3000 ms

  Scenario: SMS with untranscode message
    Given AccessRequest
    When I send SMS with untranscode message
    Then I should have valid transcode message SMS response
    And Response time is less than 3000 ms

  Scenario: SMS with regulator with India
    Given AccessRequest
    When I send SMS with regulator with India
    Then I should have valid SMS response
    And Response time is less than 3000 ms

  Scenario: SMS with Callback
    Given AccessRequest
    When I send SMS with Callback
    Then I should have valid SMS response with Callback
    And Response time is less than 3000 ms

  Scenario: SMS Campaigns
    Given AccessRequest
    When I send SMS Campaigns
    Then I should have valid SMS response
    And Response time is less than 3000 ms