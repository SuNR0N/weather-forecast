Feature: Weather Forecast Application

    Scenario: Loading the application
        Given The application is loaded
        Then I should see the title as 'Weather Forecast'
        Then I should see the city selector
        Then I should not see the weather widget