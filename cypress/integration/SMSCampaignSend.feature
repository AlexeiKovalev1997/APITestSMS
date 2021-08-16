Feature: SMS Campaign Send

  I want to send SMS Campaign

  Scenario: SMS Campaigns with label, transcode, flash
    Given AccessRequest
    When I send SMS Campaigns with label, transcode, flash
    Then I should have valid SMS response
    And Response time is less than 3000 ms

  Scenario: SMS Campaigns with shorten URL
    Given AccessRequest
    When I send SMS Campaigns with shorten URL
    Then I should have valid SMS response
    And Response time is less than 3000 ms

  Scenario: SMS Campaigns with Callback and Campaign Callback
    Given AccessRequest
    When I send SMS Campaigns with Callback and Campaign Callback
    Then I should have valid SMS response with Callback
    And Response time is less than 3000 ms

  Scenario: SMS Campaigns with callback group
    Given AccessRequest
    When I send SMS Campaigns with callback group
    Then I should have valid SMS response
    And Response time is less than 3000 ms

  Scenario: SMS Campaigns with multiple parts
    Given AccessRequest
    When I send SMS Campaigns with multiple parts
    Then I should have valid multiple parts SMS response
    And Response time is less than 3000 ms

  Scenario: SMS Campaigns with regulator with India
    Given AccessRequest
    When I send SMS Campaigns with regulator with India
    Then I should have valid SMS response
    And Response time is less than 3000 ms

  Scenario: Invalid token
    Given AccessRequest
    When I send SMS Campaigns with Invalid token
    Then I should have Invalid token error
    And Response time is less than 3000 ms

  Scenario: Invalid message
    Given AccessRequest
    When I send SMS Campaigns without message
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid phone (without phone)
    Given AccessRequest
    When I send SMS Campaigns without phone
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid phone
    Given AccessRequest
    When I send SMS Campaigns with invalid phone
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid sender (without sender)
    Given AccessRequest
    When I send SMS Campaigns without sender
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid sender
    Given AccessRequest
    When I send SMS Campaigns with Invalid sender
    Then I should have Invalid sender of a field
    And Response time is less than 3000 ms
  
  Scenario: SMS with untranscode message
    Given AccessRequest
    When I send SMS Campaigns with untranscode message
    Then I should have valid transcode message SMS response
    And Response time is less than 3000 ms

  Scenario: Insufficient Balance
    Given AccessRequest Insufficient Balance
    When I send SMS Campaigns with label, transcode, flash
    Then I should have Insufficient Balance error
    And Response time is less than 3000 ms