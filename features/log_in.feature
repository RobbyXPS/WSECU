Feature: Log in
    Users expect to be able to log into the system to access their information

    Scenario: Log in from landing page
        Given I am on the "landing" page
        When I log in with an "invalid" user
        Then I see that I am on the "banking singin" page
        And I see the input fields have been auto-populated

    Scenario: Log in from online banking page
        Given I am on the "banking singin" page
        When I log in with an "invalid" user
        Then I see an error message
        And I see the input fields have been auto-populated
