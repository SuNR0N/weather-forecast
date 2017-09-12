import {
    expect,
    use,
} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {
    binding,
    given,
    then,
} from 'cucumber-tsflow';

import { AppPage } from '../pages/app.po';

use(chaiAsPromised);

@binding()
class AppSteps {
    private appPage = new AppPage();

    @given(/^The application is loaded$/)
    public givenTheApplicationIsLoaded() {
        return this.appPage.navigateTo();
    }

    @then(/^I should see the title as '(.*)'$/)
    public thenIShouldSeeTheTitleAs(title: string) {
        return expect(this.appPage.header.getText()).to.eventually.equal(title);
    }
}

export default AppSteps;
