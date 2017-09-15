// testing
import { baseUrl, browser } from 'e2e-config';
import { e2e } from '../../framework/testing/e2e';

e2e.describe('ng-seed/universal', () => {
  e2e.describe('components', () => {
    e2e.describe('+secure: SecureComponent', () => {
      e2e.it('should have title', async () => {
        const page = browser.goto(`${baseUrl}/secure-page`);

        const text = await page
          .evaluate(() => document.title)
          .end();

        e2e.e(text).toContain('Secure page | ng-seed/universal');
      });
    });
  });
});
