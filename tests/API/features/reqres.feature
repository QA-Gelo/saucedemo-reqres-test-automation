Feature: reqres.in

  This suite validates core RESTful operations against the publicly hosted API at https://reqres.in.
  It simulates real-world user flows such as listing users, creating new records, updating data,
  and handling failed login attempts — all using realistic mock responses.

  The goal is to ensure that each endpoint behaves as expected under both positive and negative conditions,
  while demonstrating clean request handling, response validation, and dynamic data assertions.

  @api @Scenario_1
  Scenario: Scenario_1: List of available users and print users with odd ID numbers to console
    Given the user send a GET request to "/api/users?page=1&per_page=12" endpoint to get the reqres user list
    Then the response status code is 200
    And the user print users with odd ID numbers to console

  @api @Scenario_2
  Scenario: Scenario_2: Create a new reqres user
    Given the user send a POST request to "/api/register" endpoint to create a new reqres user
    Then the response status code is 200
    And the response contains an id and token

  @api @Scenario_3
  Scenario: Scenario_3: Update an existing reqres user
    Given the user send a PUT request to "/api/users/4" endpoint to update an existing reqres user
    Then the response status code is 200
    And the response contains updated first_name, last_name and updatedAt timestamp

  @api @Scenario_4
  Scenario: Scenario_4: Validate delayed user response time
    Given the user sends a GET request to "/api/users" with delay "<delay>"
    Then the response time should be less than 1000 milliseconds
    Examples:
    | delay |
    | 0     |
    | 3     |

  @api @Scenario_5
  Scenario: Scenario_5: Validate user cannot login without password
    Given the user send a POST request to "/api/login" endpoint to login a reqres user without password
    Then the response status code is 400
    And the response contains error message "Missing password"