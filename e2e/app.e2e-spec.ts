import { GigsPage } from './app.po';

describe('gigs App', () => {
  let page: GigsPage;

  beforeEach(() => {
    page = new GigsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
