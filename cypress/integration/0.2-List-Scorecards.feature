Feature: List Scorecards

    @focus
    Scenario: Accessing Scorecard List
        Given authorized department officer
        When opening a list of available scorecards
        Then I should be presented with a list of already configured scorecards

    @focus
    Scenario: Accessing many scorecards
        Given authorized department officer
        When opening a list of many scorecards
        Then I should be presented with a chunked list of scorecards
        And I should be able to navigate through chunks to view more scorecards

    @focus
    Scenario: Accessing scorecard empty list
        Given an authorized department officer
        When opening a list of available scorecards
        And there are no configured scorecards
        Then I should be presented with a message "There are no configured scorecards"



