import { Mean2Page } from './app.po';

describe('mean2 App', () => {
  let page: Mean2Page;

  beforeEach(() => {
    page = new Mean2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();

    expect(page.getParagraphText()).toEqual('app works!');
  });
});
