import {
    by,
    element,
    ElementArrayFinder,
    ElementFinder,
} from 'protractor';

export class WeatherWidgetComponent {
    public widget: ElementFinder;
    public city: ElementFinder;
    public description: ElementFinder;
    public temperature: ElementFinder;
    public dailyForecasts: ElementArrayFinder;

    private self: ElementFinder;

    constructor() {
        this.self = element(by.tagName('wf-weather-widget'));
        this.widget = this.self.element(by.className('weatherWidget'));
        this.city = this.self.element(by.className('city'));
        this.description = this.self.element(by.className('description'));
        this.temperature = this.self.element(by.className('temperature'));
        this.dailyForecasts = this.self.all(by.tagName('wf-daily-weather-widget'));
    }

    public selectDailyForecastByIndex(index: number) {
        return this.dailyForecasts.get(index).click();
    }

    public selectDailyForecastByDay(name: string) {
        // TODO
    }
}
