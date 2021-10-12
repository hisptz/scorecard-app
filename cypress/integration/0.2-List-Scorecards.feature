Feature: List Scorecards

    @focus
    Scenario: Accessing Scorecard List
        Given authorized department officer
        When opening a list of available scorecards
        Then I should be presented with a list of already configured scorecards

    @focus
    Scenario: Accessing scorecard empty list
        Given an authorized department officer
        When opening a list where there are no available scorecards
        Then I should be presented with a message "Welcome to Scorecard App"

    @focus
    Scenario: Accessing many scorecards
        Given authorized department officer
        When opening a list of many scorecards
        Then I should be presented with a chunked list of scorecards
        And I should be able to navigate through chunks to view more scorecards



    @focus
    Scenario: Listing Scorecards on card view
        Given authorized department officer
        When opening a list of available scorecards
        And choose to view scorecards in card orientation
        Then I should be presented with a cards of already configured scorecards

    @focus
    Scenario: Listing Scorecards on thumbnail view
        Given authorized department officer
        When opening a list of available scorecards
        And choose to view scorecards in thumbnail orientation
        Then I should be presented with a thumbnails of already configured scorecards





