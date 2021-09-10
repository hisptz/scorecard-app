Feature: Download Feature

This is feature which involve all download activities scenarios in scorecards

   @focus
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
Then a PDF document of the scorecard visualization should automatically download to my computer

@focus
Scenario: : Download Excel of Raw Data
Given authorized M&E Officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And downloading the raw scorecard details in Excel format
Then an excel file with the scorecard raw data should automatically download



@focus
Scenario: : Download JSON of Raw Data
Given authorized M&E Officer
When opening a list of available scorecards
And selecting to view one of the scorecards
And downloading the raw scorecard details in Excel format
Then an excel file with the scorecard raw data should automatically download
