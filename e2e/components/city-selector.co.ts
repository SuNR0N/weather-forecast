import {
    by,
    element,
    ElementArrayFinder,
    ElementFinder,
} from 'protractor';

export class CitySelectorComponent {
    public typeahead: ElementFinder;
    public typeaheadContainer: ElementFinder;
    public typeaheadNoResults: ElementFinder;
    public typeaheadResults: ElementArrayFinder;

    private self: ElementFinder;

    constructor() {
        this.self = element(by.tagName('wf-city-selector'));
        this.typeahead = this.self.element(by.id('typeahead'));
        this.typeaheadContainer = this.self.element(by.tagName('typeahead-container'));
        this.typeaheadResults = this.typeaheadContainer.all(by.css('.dropdown-item'));
        this.typeaheadNoResults = this.self.element(by.id('typeaheadNoResults'));
    }

    public setCityName(value: string) {
        return this.typeahead.sendKeys(value);
    }

    public clearCityName() {
        return this.typeahead.clear();
    }

    public getItemByName(value: string) {
        return this.typeaheadContainer.element(by.cssContainingText('.dropdown-item span', value));
    }

    public selectItemByName(value: string) {
        return this.typeaheadContainer.element(by.cssContainingText('.dropdown-item span', value)).click();
    }
}
