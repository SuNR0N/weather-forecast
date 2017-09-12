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
class CitySelectorSteps {
    private appPage = new AppPage();

    @when(/^I search for '(.*)' in the typeahead$/)
    public whenISearchFor(query: string) {
        return this.appPage.citySelector.clearCityName()
            .then(() => this.appPage.citySelector.setCityName(query));
    }

    @when(/^I select '(.*)' in the search results$/)
    public whenISelectCityWithName(name: string) {
        return this.appPage.citySelector.selectItemByName(name);
    }

    @then(/^I should see the city selector$/)
    public thenIShouldSeeTheCitySelector() {
        return expect(this.appPage.citySelector.typeahead.isPresent()).to.eventually.be.true;
    }

    @then(/^I should see '(.*)' in the search results$/)
    public thenIShouldSeeTheGivenValueInTheSearchResults(value: string) {
        return expect(this.appPage.citySelector.getItemByName(value).isPresent()).to.eventually.be.true;
    }

    @then(/^I should see no results$/)
    public thenIShouldSeeNoResults() {
        return expect(this.appPage.citySelector.typeaheadNoResults.isPresent()).to.eventually.be.true;
    }

    @then(/^I should see an empty typeahead$/)
    public thenIShouldSeeAnEmptyTypeahead() {
        return expect(this.appPage.citySelector.typeahead.getText()).to.eventually.equal('');
    }
}

export default CitySelectorSteps;
