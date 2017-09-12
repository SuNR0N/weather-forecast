import {
    expect,
    use,
} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {
    binding,
    then,
    when,
} from 'cucumber-tsflow';

import { AppPage } from '../pages/app.po';

use(chaiAsPromised);

@binding()
class WeatherWidgetSteps {
    private appPage = new AppPage();

    @when(/^I select the '(\d)(?:st|nd|rd|th)' forecast$/)
    public whenISelectTheForecastWithOrdinal(ordinal: string) {
        const index = parseInt(ordinal, 10);
        return this.appPage.weatherWidget.selectDailyForecastByIndex(index - 1);
    }

    @then(/^I should not see the weather widget$/)
    public thenIShouldNotSeeTheWeatherWidget() {
        return expect(this.appPage.weatherWidget.widget.isPresent()).to.eventually.be.false;
    }

    @then(/^I should see the weather widget$/)
    public thenIShouldSeeTheWeatherWidget() {
        return expect(this.appPage.weatherWidget.widget.isPresent()).to.eventually.be.true;
    }

    @then(/^I should see the weather forecast for '(.*)'$/)
    public thenIShouldSeeTheWeatherForecastFor(name: string) {
        return expect(this.appPage.weatherWidget.city.getText()).to.eventually.contain(name);
    }

    @then(/^I should see a 5 day weather forecast$/)
    public thenIShouldSeeAFiveDayWeatherForecast() {
        return expect(this.appPage.weatherWidget.dailyForecasts.count()).to.eventually.equal(5);
    }

    @then(/^I should see the weather forecast in '(\d)' days time$/)
    public thenIShouldSeeTheWeatherForecastInDaysTime(value: string) {
        const number = parseInt(value, 10);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayIndex = new Date().getDay();
        const givenDayIndex = (todayIndex + number - 1) % days.length;
        const givenDay = days[givenDayIndex];
        return expect(this.appPage.weatherWidget.day.getText()).to.eventually.equal(givenDay);
    }
}

export default WeatherWidgetSteps;
