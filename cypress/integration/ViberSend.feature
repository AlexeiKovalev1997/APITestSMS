Feature: Viber message Send

  I want to send Viber message

  Scenario: Viber message
    Given AccessRequest
    When I send Viber message
    Then I should have valid Viber message response
    And Response time is less than 3000 ms

  Scenario: Viber message with Callback
    Given AccessRequest
    When I send Viber message with Callback
    Then I should have valid Viber message response with Callback
    And Response time is less than 3000 ms

  Scenario: Invalid token
    Given AccessRequest
    When I send Viber message with Invalid token
    Then I should have Invalid token error
    And Response time is less than 3000 ms

  Scenario: Invalid phone (without phone)
    Given AccessRequest
    When I send Viber message without phone
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid phone
    Given AccessRequest
    When I send Viber message with Invalid phone
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid campaignName (less then 2)
    Given AccessRequest
    When I send Viber message with Invalid campaignName (less then 2)
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid campaignNam (more then 30)
    Given AccessRequest
    When I send Viber message with Invalid campaignName (more then 30)
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid message (without message)
    Given AccessRequest
    When I send Viber message without message
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid message (more then 1000)
    Given AccessRequest
    When I send Viber message with Invalid message (more then 1000)
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid imageURL (without imageURL)
    Given AccessRequest
    When I send Viber message without imageURL
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid imageURL (more then 62)
    Given AccessRequest
    When I send Viber message with Invalid imageURL (more then 62)
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid caption (without caption)
    Given AccessRequest
    When I send Viber message without caption
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid caption (more then 30)
    Given AccessRequest
    When I send Viber message with Invalid caption (more then 30)
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid targetUrl (without targetUrl)
    Given AccessRequest
    When I send Viber message without targetUrl
    Then I should have Invalid sender of a field
    And Response time is less than 3000 ms
  
  Scenario: Campaign with same name
    Given AccessRequest
    When I send Viber message with Campaign with same name
    Then I should have Invalid Viber message with Campaign with same name
    And Response time is less than 3000 ms

  Scenario: Invalid ttl (less then 30)
    Given AccessRequest
    When I send Viber message with Invalid ttl (less then 30)
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Invalid ttl (more then 86400)
    Given AccessRequest
    When I send Viber message with Invalid ttl (more then 86400)
    Then I should have Invalid value of a field
    And Response time is less than 3000 ms

  Scenario: Insufficient Balance
    Given AccessRequest Insufficient Balance
    When I send Viber message
    Then I should have Insufficient Balance error
    And Response time is less than 3000 ms