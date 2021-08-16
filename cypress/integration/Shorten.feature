Feature: Shorten

  As a Developer I want an endpoint that shortens the URL's i use when sending an sms so that i significantly lower the cost of my campaigns.

  Scenario: Shortener with 2 obsjects per request
    Given AccessRequest
    When I send Shortener with 2 obsjects per request
    Then I should have valid Shortener response
    And Response time is less than 3000 ms

  Scenario: Shortener with 20 obsjects per request
    Given AccessRequest
    When I send Shortener with 20 obsjects per request
    Then I should have valid Shortener response
    And Response time is less than 3000 ms

  Scenario: Shortener in case of missing persmissions single and campaign
    Given AccessRequest
    When I send Shortener in case of missing persmissions single and campaign
    Then I should have Access Denied response
    And Response time is less than 3000 ms

  Scenario: Shortener with empty body 
    Given AccessRequest
    When I send Shortener with empty body
    Then I should have invalid Shortener response
    And Response time is less than 3000 ms

  Scenario: Shortener with more than 20 objects in the request 
    Given AccessRequest
    When I send Shortener with more than 20 objects in the request
    Then I should have invalid Shortener response
    And Response time is less than 3000 ms

  Scenario: Shortener with domain that is not in the possetion of the user  
    Given AccessRequest
    When I send Shortener with domain that is not in the possetion of the user
    Then I should have invalid Shortener response
    And Response time is less than 3000 ms

  Scenario: Shortener with long url more than 1900
    Given AccessRequest
    When I send Shortener with long url more than 1900
    Then I should have invalid Shortener response
    And Response time is less than 3000 ms

  Scenario: Shortener with invalid url
    Given AccessRequest
    When I send Shortener with invalid url
    Then I should have invalid Shortener response
    And Response time is less than 3000 ms

  Scenario: Shortener with validity less than 3600
    Given AccessRequest
    When I send Shortener with validity less than 3600
    Then I should have invalid Shortener response
    And Response time is less than 3000 ms

  Scenario: Shortener with validity more than 2592000
    Given AccessRequest
    When I send Shortener with validity more than 2592000
    Then I should have invalid Shortener response
    And Response time is less than 3000 ms

  Scenario: Shortener with callback url null 
    Given AccessRequest
    When I send Shortener with callback url null
    Then I should have invalid Shortener response
    And Response time is less than 3000 ms

  Scenario: Shortener with callbackurl more than 1024
    Given AccessRequest
    When I send Shortener with callbackurl more than 1024
    Then I should have invalid Shortener response
    And Response time is less than 3000 ms

  Scenario: Shortener with missing the requiered fields name longurl domain
    Given AccessRequest
    When I send Shortener with missing the requiered fields name longurl domain
    Then I should have invalid Shortener response
    And Response time is less than 3000 ms