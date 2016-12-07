import { UniversalLocalizeExamplePage } from './app.po';

describe('universal-localize-example App', function() {
  let page: UniversalLocalizeExamplePage;

  beforeEach(() => {
    page = new UniversalLocalizeExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
