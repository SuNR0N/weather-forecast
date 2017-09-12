Feature: City Selector

    Scenario: When loading the application
        Given The application is loaded
        Then I should see an empty typeahead

    Scenario: Searching for a city which exists
        Given The application is loaded
        When I search for 'Budapest' in the typeahead
        Then I should see 'Budapest' in the search results

    Scenario: Searching for a city which does not exist
        Given The application is loaded
        When I search for 'FooBar' in the typeahead
        Then I should see no results