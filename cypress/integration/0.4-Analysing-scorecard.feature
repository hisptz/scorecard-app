Feature: Display Indicators

@focus
Scenario: Visualising Indicator Perfomance
    Given authorized department officer
    When opening a list of available scorecards
    And  selecting to view one of the scorecards
    Then a table of indicators against locations should displayed
