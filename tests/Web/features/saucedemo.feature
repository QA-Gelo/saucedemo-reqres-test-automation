Feature: SauceDemo

  Using different user accounts, I want to log in, add item/s to the cart
  Remove the item/s listed by name from the cart and finish the item purchase
  Validate the successful checkout and order confirmation

  @web @Scenario_1
  Scenario: Scenario_1: As a standard_user, complete end-to-end purchasing of items, checkout cart update, and successful purchase
    Given the user is logged in as 'standard_user'
    When the user adds all the items to the cart
    And the user navigate to view cart page
    And the user remove the 3rd item by name in the cart
    And the user navigate to Checkout Overview page
    And the user validate the items and number of items added to the cart
    Then the user finished the purchase of the items
    And the user validate purchase of items was successful

  @web @Scenario_2
  Scenario: Scenario_2: As a problem_user, complete adding an item to the cart
    Given the user is logged in as 'problem_user'
    When the user clicks on an item
    And the user add the item to cart
    And the user navigate to view cart page
    Then the user validate that item was added to cart

  @web @Scenario_3
  Scenario: Scenario_3: As a standard_user, sort items by name and validate that items are sorted as expected
    Given the user is logged in as 'standard_user'
    When the user sort the items by name in the products page
    Then the user validate that items are sorted as expected

  @web @Scenario_4
  Scenario: Scenario_4: As a locked_out_user, user should not be able to login
    Given the user is logged in as 'locked_out_user'