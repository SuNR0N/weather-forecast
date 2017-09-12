import {
    expect,
    use,
} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {
    binding,
    given,
    then,
    when,
} from 'cucumber-tsflow';

import { WeatherForecastPage } from '../pages/app.po';

use(chaiAsPromised);

@binding()
class AppSteps {
    private weatherForecastPage = new WeatherForecastPage();

    @given(/^I am on the weather forecast page$/)
    public givenIAmOnTheHomePage() {
        return this.weatherForecastPage.navigateTo();
    }

    @when(/^I search for "([^"]*)" in the typeahead$/)
    public whenISearchFor(value: string) {
        return this.weatherForecastPage.citySelector.clearCityName()
            .then(() => this.weatherForecastPage.citySelector.setCityName(value));
    }

    @when(/^I select "([^"]*)" from the results$/)
    public whenISelectTheGivenValueFromTheResults(value: string) {
        return this.weatherForecastPage.citySelector.selectItemByName(value);
    }

    @then(/^I should see "([^"]*)" in the list$/)
    public thenIShouldSeeTheGivenValueInTheList(value: string) {
        return expect(this.weatherForecastPage.citySelector.getItemByName(value).isPresent()).to.eventually.be.true;
    }

    @then(/^I should see the title as "([^"]*)"$/)
    public thenIShouldSeeTheTitleAs(title: string) {
        return expect(this.weatherForecastPage.header.getText()).to.eventually.equal(title);
    }

    @then(/^I should see no results$/)
    public thenIShouldSeeNoResults() {
        return expect(this.weatherForecastPage.citySelector.typeaheadNoResults.isPresent()).to.eventually.be.true;
    }

    @then(/^I should see the city selector$/)
    public thenIShouldSeeTheCitySelector() {
        return expect(this.weatherForecastPage.citySelector.typeahead.isPresent()).to.eventually.be.true;
    }

    @then(/^I should not see the weather widget$/)
    public thenIShouldNotSeeTheWeatherWidget() {
        return expect(this.weatherForecastPage.weatherWidget.widget.isPresent()).to.eventually.be.false;
    }

    @then(/^I should see the weather widget$/)
    public thenIShouldSeeTheWeatherWidget() {
        return expect(this.weatherForecastPage.weatherWidget.widget.isPresent()).to.eventually.be.true;
    }
}

export = AppSteps;
