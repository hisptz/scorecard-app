Feature: Manage Scorecard

    As Hussein, a user with privilege access at national level,
    I would like to be able to manage scorecard for selected set of indicators
    so that managers at national and subnational levels can access


    @focus
    Scenario: Create Scorecard
        Given authorized user at national level
        When opening scorecard form
        And providing general scorecard details
        And selecting an indicator group
        And selecting an indicator
        And configuring indicator data details
        Then the configured indicator should be displayed on the scorecard visualization
