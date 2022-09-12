Feature: Download Feature

  This is feature which involve all download activities scenarios in scorecards

#  @focus
  Scenario: Download Indicator Visualizations PDF
    Given authorized Regional Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And downloading the PDF of the visualization
    Then a PDF document of the scorecard visualization should automatically download to my computer

  @focus
  Scenario: Download Indicator Visualizations Excel
    Given authorized Regional Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And downloading the excel of the  visualization
    Then a Excel document of the scorecard visualization should automatically download to my computer

  @focus
  Scenario: : Download Excel of Raw Data(CSV)
    Given authorized M&E Officer
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And downloading the raw scorecard details in Excel format
    Then an excel file with the scorecard raw data should automatically download

  @focus
  Scenario: : Download DataJson of Raw Data
    Given authorized M&E Officer
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And downloading the raw scorecard details in DataJson format
    Then an DataJson file with the scorecard raw data should automatically download

  @focus
  Scenario: : Download Metadata of Raw Data
    Given authorized M&E Officer
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And downloading the raw scorecard details in Metadata format
    Then an Metadata file with the scorecard raw data should automatically download

# TODO


  Scenario: Download scorecard with filtered greater than 100 values
    Given authorized Data Manager
    When opening a list of available scorecards
    And selecting to view one of the scorecards
    And filtering values greater than 100
    And downloading the filtered values
    Then an excel file with indicators whose values are greater than 100 should automatically download


