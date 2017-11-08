import { FrontendAssignmentPage } from './app.po';

describe('frontend-assignment App', () => {
  let page: FrontendAssignmentPage;

  beforeEach(() => {
    page = new FrontendAssignmentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
