import {
    by,
    element,
    ElementArrayFinder,
    ElementFinder,
} from 'protractor';

export class WeatherWidgetComponent {
    public widget: ElementFinder;
    public city: ElementFinder;
    public day: ElementFinder;
    public description: ElementFinder;
    public temperature: ElementFinder;
    public dailyForecasts: ElementArrayFinder;

    private self: ElementFinder;

    constructor() {
        this.self = element(by.tagName('wf-weather-widget'));
        this.widget = this.self.element(by.className('weatherWidget'));
        this.city = this.widget.element(by.className('city'));
        this.day = this.widget.element(by.className('day'));
        this.description = this.widget.element(by.className('description'));
        this.temperature = this.widget.element(by.className('temperature'));
        this.dailyForecasts = this.widget.all(by.tagName('wf-daily-weather-widget'));
    }

    public selectDailyForecastByIndex(index: number) {
        return this.dailyForecasts.get(index).click();
    }
}
