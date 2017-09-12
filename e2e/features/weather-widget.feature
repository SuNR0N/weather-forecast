Feature: Weather Widget

    Scenario: Selecting a city
        Given The application is loaded
        When I search for 'Budapest' in the typeahead
        When I select 'Budapest' in the search results
        Then I should see the weather widget
        Then I should see the weather forecast for 'Budapest'
        Then I should see a 5 day weather forecast

    Scenario: Selecting a daily forecast
        Given The application is loaded
        When I search for 'Budapest' in the typeahead
        When I select 'Budapest' in the search results
        When I select the '3rd' forecast
        Then I should see the weather forecast in '3' days time
    