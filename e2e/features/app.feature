Feature: Weather Forecast

Scenario: On load
Given I am on the weather forecast page
Then I should see the title as "Weather Forecast"
Then I should see the city selector
Then I should not see the weather widget

Scenario: On search
Given I am on the weather forecast page
When I search for "Budapest" in the typeahead
Then I should see "Budapest" in the list

Scenario: On city not found
Given I am on the weather forecast page
When I search for "FooBarBarFooX" in the typeahead
Then I should see no results

Scenario: On city load
Given I am on the weather forecast page
When I search for "Cancun" in the typeahead
When I select "Cancun" from the results
Then I should see the weather widget