// testing
import { baseUrl, browser } from 'e2e-config';
import { e2e } from '../../framework/testing/e2e';

e2e.describe('ng-seed/universal', () => {
  e2e.describe('components', () => {
    e2e.describe('+secure: SecureComponent', () => {
      e2e.it('should redirect to login page', async () => {
        const page = browser.goto(`${baseUrl}/secure-page`);

        const text = await page
          .evaluate(() => document.title)
          .end();

        // NOTE: should display the login page's title
        e2e.e(text).toContain('Log in | ng-seed/universal');
      });
    });
  });
});
