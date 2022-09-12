Feature: Display Indicators
  @focus
  Scenario: Visualising Indicator Performance
    Given authorized department officer
    When opening a list of available scorecards
    And  selecting to view one of the scorecards
    Then a table of indicators against locations should displayed

  @focus
  Scenario: Visualising Indicator performance on lower levels
    Given authorized programme coordinator
    When opening a list of available scorecards
    And  selecting to view one of the scorecards
    And selecting a lower level locations
# Then a table of indicators against selected lower level locations should be displayed

  @focus
  Scenario: Visualize Scorecards without empty rows
    Given authorized data officer
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And deselecting view of the empty rows
    Then a table of indicators against locations should be displayed without empty rows

  @focus
  Scenario: visualize Scorecards with Hierarchy
    Given authorized data officer
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


  Scenario: Visualize 5 Best Location Based on Selected Indicator
    Given authorized data officer
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And selecting an indicator column
    And selecting to view top 5 of the selected indicator
    Then table of 5 best locations based on the selected indicator against the indicators should be displayed


  Scenario: Visualize 10 Best Location Based on Selected Indicator
    Given authorized data officer
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And selecting an indicator column
    And selecting to view top 10 of the selected indicator
    Then table of 10 best locations based on the selected indicator against the indicators should be displayed


  Scenario: Visualize League Table Based on Selected Indicator
    Given authorized data officer
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And selecting an indicator column
    And selecting to view  league table
    Then a league table with ranking based on the selected indicator should be displayed

  @focus
  Scenario: Visualize Indicators for Selected Period
    Given authorized Regional Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And selecting different periods
    Then a table of indicators and respective selected periods againsts location is displayed

  @focus
  Scenario: Visualize scorecard in chart
    Given authorized Regional Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And selecting a specific indicator value
    And selecting to view chart
    Then chart of selected indicator for selected location and period should be displayed

  @focus
  Scenario: View Selected Indicator's Metadata
    Given authorized M&E Officer
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And selecting an indicator
    And selecting to view indicator details
    Then indicator details including metadata details,numerator,denominator and description


    @focus
  @focus
  Scenario: Visualize Scorecard by Facility Type
    Given authorized Data Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And filtering the locations by facility Type
    Then a table of indicators against location for the selected location type should be displayed


  @focus
  Scenario: Visualize Scorecard by Facility Ownership
    Given authorized Data Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And filtering the locations by facility ownership
    Then a table of indicators against location for the selected location ownership type should be displayed


  Scenario: Set targets for district level
    Given user with privilege access at district level
    When creating or editing scorecard
    And setting indicator targets for district level
    Then the target set should be saved and changes reflected on the scorecard visualization


  Scenario: Visualize Scorecard with National Targets
    Given authorized Data Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And selecting to view scorecard using national targets
    Then a table of indicators against locations graded by the national targets should be displayed


  Scenario: Visualize Scorecard with District Targets
    Given authorized Data Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And selecting to view scorecard using district targets
    Then a table of indicator against locations graded by the district targets should be displayed


  Scenario: Visualize Indicator perfomance
    Given authorized District Data Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    Then a table of indicators against locations graded by the district targets should be displayed


  Scenario: Visualize League Table Based on Selected Indicator
    Given authorized Data Officer
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And selecting an indicator column
    And selecting to view the league table
    Then a league table with ranking based on the selected indictor should be displayed and the best 3 perfomances should have trophies displayed

  @focus
  Scenario: Visualize Filtered Scorecard with The Parent Location at the Top Row
    Given authorized officer
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And sorting based on different Indicators
    Then the parent location should always be the first row

  @focus
  Scenario: Visualize scorecard for locations below average performance
    Given authorized Data Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And selecting to view locations below average
    Then a table of locations whose values for the selected indicator are below average should be displayed


  Scenario: Visualize scorecard with filtered greater than 100 values
    Given authorized Data Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And filtering values greater than 100
    Then a list of all locations with indicators whose values are greater than 100 displayed

  @focus
  Scenario: Visualize scorecard for locations above average performance
    Given authorized Data Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And selecting to view locations above  average
    Then a table of locations whose values for the selected indicator are above average should be displayed
