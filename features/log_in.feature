Feature: Log in to WSECU.org
    Users expect to be able to log into the system to access their information

    Scenario: User attempts to log in from landing page
        Given I am on the "landing" page
        When I log in with an "invalid" user
        Then I see the "online banking" page
#And the "username" field contains "the submitted username"
#And the "password" field is in focus
