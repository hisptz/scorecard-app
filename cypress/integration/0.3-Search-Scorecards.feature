
Feature: Search Scorecards

    @focus
    Scenario: Searching scorecards by name
        Given authorized department officer
        When opening a list of available scorecards
        And I search in the list by name
        Then I should be presented scorecard results matching search criterias

    @focus
    Scenario: Searching scorecards by categories/tag
        Given authorized department officer
        When opening a list of available scorecards
        And search in the list by a certain tag or category
        Then I should be presented scorecard results matching search criterias

    @focus
    Scenario: Searching non existing scorecards
        Given authorized department officer
        When opening a list of available scorecards
        And search in the list by a non existing tag or category
        Then I should be presented with the text No Scorecards Found



