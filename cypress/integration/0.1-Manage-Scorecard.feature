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
        Then scorecard should be saved and be available in the list


    As Mariam, an administrative user at national level,
    I would like to assign indicators in a scorecard in specific created groups
    so that related indicators can be easily accessible in the same group

    @focus
    Scenario: Assign Indicators to groups
        Given authorized user at national level
        When opening scorecard form
        And creating data groups
        And selecting to view available indicators
        And selecting an indicator group
        And adding an indicator to a data group
        And configuring indicator data details
        Then the configured indicator should be displayed in the specific data group on the scorecard visualization

    As Maria, an administrative user at national level,
    I would like to define color codes as legends for showing performance of indicators in scorecard

    @focus
    Scenario: Creating/updating Scorecard legends
        Given authorized user at national level
        When opening scorecard form
        And editing scorecard legends
        And saving the changes
        Then the changes on the scorecard legends should be visible

    As Martin, an administrative user at national level,
    I would like to pair two related indicators in the same column when creating scorecard
    so that managers at subnational levels can easily compare their performance

    @focus
    Scenario: Pair Indicators
        Given authorized user at national level
        When opening scorecard form
        And selecting indicators
        And selecting an indicator group
        And selecting an indicator
        And configuring indicator data details
        And selecting pair with another indicator
        And selecting an indicator to pair with
        Then the configured indicator should be displayed with the paired indicator on the same column  on the scorecard visualization

    As Walter, and administrative user at national level,
    I would like to be able to set up national targets (cut-off points) for each indicator during and after scorecard generation
    so that subnational levels can use them to analyse performance of indicators in their programs

    As Mariam, HMIS coordinator at MoH, I want to be able to share dashboards as user’s groups of interests

    @focus
    Scenario: Sharing Scorecard to user groups
        Given authorized coordinator
        When Creating/updating scorecard
        And selecting to share with a specific user group
        And saving the changes
        Then the users in the specific user group should be able to access the scorecard


    As Mariam, HMIS coordinator at MoH,
    I want to able to configure dashboards assigning indicators with specific colour codes for indicating performance levels

    @focus
    Scenario: Configure legends for indicators
        Given an authorized coordinator
        When adding indicators to a scorecard
        And configuring maximum and minimum values for predefined legend values
        And saving the changes


