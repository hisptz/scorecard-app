Feature: Delete Scorecard
  @focus
  Scenario: Deleting Scorecard
    Given  authorized coordinator
    When deleting scorecard
    And confirming to delete scorecard
    Then the deleted scorecard should not be on the list


