Feature: Display Indicators

@focus
Scenario: Visualising Indicator Perfomance
    Given authorized department officer
    When opening a list of available scorecards
    And  selecting to view one of the scorecards
    Then a table of indicators against locations should displayed

@focus
Scenario: Visualising Indicator perfomance on lower levels
Given authorized programme coordinator
When opening a list of available scorecards
And  selecting to view one of the scorecards
And selecting a lower level locations
Then a table of indicators against selected lower level locations should be displayed

@focus
Scenario: Visualize Scorecards without empty rows
Given authorized data officer
When opening a list of available scorecards
And selecting to view on of the scorecards
And deselecting view of the emptpy rows
Then a table of indicators against locations should be displayed without empty rows

@focus
Scenario: visualize Scorecards with Hierarchy
Given authorized data Officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And selecting to view hierarchy
Then table of indicators against locations with hierarchy should be displayed

@focus
Scenario: Visualize Scorecard with Average Column
Given authorized data officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And selecting to view average column
Then a table of indicators against locations with an average column should be displayed

@focus
Scenario: Visualize Scorecard with Average Row
Given authorized data officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And selecting to view average row
Then a table of indicators against locations with an average row should be displayed

@focus
Scenario: Visualize Scorecard with Highlighted Indicators
Given authorized data officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And selecting to view highlighted indicators
Then a table of indicators against locations with an highlighted indicators should be displayed


@focus
Scenario: Visualize Scorecard with Title
Given authorized data officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And selecting to view scorecard title
Then scorecard title should be displayed

@focus
Scenario: Visualize Scorecard with Item numbers
Given authorized data officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And selecting to view item with numbers
Then a table of indicators against location with numbers should be displayed


@focus
Scenario: Visualize Scorecard with Legend
Given authorized data officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And selecting to view legend
Then legend should be displayed

@focus

Scenario: Visualize 5 Best Location Based on Selected Indicator
Given authorized data officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And selecting an indicator column
And selecting to view top 5 of the selected indicator
Then table of 5 best locations based on the selected indicator against the indicators should be displayed

@focus
Scenario: Visualize 10 Best Location Based on Selected Indicator
Given authorized data officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And selecting an indicator column
And selecting to view top 10 of the selected indicator
Then table of 10 best locations based on the selected indicator against the indicators should be displayed

@focus
Scenario: Visualize League Table Based on Selected Indicator
Given authorized data officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And selecting an indicator column
And selecting to view  league table
Then a league table with ranking based on the selected indicator should be displayed
