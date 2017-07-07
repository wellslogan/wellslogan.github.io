import { AotrtPage } from './app.po';

describe('aotrt App', () => {
  let page: AotrtPage;

  beforeEach(() => {
    page = new AotrtPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
