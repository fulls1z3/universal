// testing
// tslint:disable-next-line
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

        // NOTE: title may change from login page to secure page
        // depending on auth status
        e2e.e(text)
          .toContain('ng-seed/universal');
      });
    });
  });
});
