Feature: Search Indicator

  @focus
  Scenario: Filter Indicator based on Location
    Given  authorized department officer
    When   opening a list of available scorecards
    And    selecting to view one of the scorecards
    And    filter the indicators based on a specific location
    Then    a table of indicators against locations should be displayed

  Scenario: Filter Indicator based on period
    Given   authorized department officer
    When    opening a list of available scorecards
    And     selecting to view one of the scorecards
    And     filter the indicators based on a specific period
    Then     a table of indicator against the specified period should be displayed
