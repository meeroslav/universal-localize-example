import { UnLocExamPage } from './app.po';

describe('un-loc-exam App', function() {
  let page: UnLocExamPage;

  beforeEach(() => {
    page = new UnLocExamPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
