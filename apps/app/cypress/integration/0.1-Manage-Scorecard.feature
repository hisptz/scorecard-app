Feature: Manage Scorecard

  As Hussein, a user with privilege access at national level,
  I would like to be able to manage scorecard for selected set of indicators
  so that managers at national and subnational levels can access


  @focus
  Scenario: Create Scorecard
    Given authorized user at national level
    When opening scorecard form
    And providing general scorecard details
    And configuring indicator groups details
    And configuring indicator data details
    And configuring highlighted indicators
    And configuring access and organisation unit
    And configuring options
    Then scorecard should be saved and be available in the list

  @focus
  Scenario: Assign Indicators to groups
    Given authorized user at national level
    When opening scorecard form to edit Sample Scorecard
    And configuring indicator groups details
    And selecting an indicator group
    And configuring indicator data details
    Then the configured indicator should be displayed in the specific data group on the scorecard visualization

  @focus
  Scenario: Creating/updating Scorecard legends
    Given authorized user at national level
    When opening scorecard form to edit Sample Scorecard
    And editing scorecard legends
    Then the changes on the scorecard legends should be visible

  @focus
  Scenario: Pair Indicators
    Given authorized user at national level
    When opening scorecard form to edit Sample Scorecard
    And configuring indicator groups details
    And selecting indicators
    And selecting an indicator group
    And selecting an indicator
    And configuring indicator data details
    And selecting pair with another indicator
    And selecting an indicator to pair with
    Then the configured indicator should be displayed with the paired indicator on the same column  on the scorecard visualization

  @focus
  Scenario: Sharing Scorecard to user groups
    Given authorized coordinator
    When Creating/updating scorecard
    And selecting to share with a specific user group and saving the changes
    Then the users in the specific user group should be able to access the scorecard

  @focus
  Scenario: Configure legends for indicators
    Given authorized coordinator
    When adding indicators to a scorecard
    And configuring maximum and minimum values for predefined legend values and saving the changes
    Then the changes on the legend values should be reflected in the scorecard

