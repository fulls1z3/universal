import { baseUrl, browser } from 'e2e-config';
import { e2e } from '~/app/framework/testing/e2e';

e2e.describe('HomeComponent', () => {
  e2e.it('should have title', async () => {
    const page = browser.goto(`${baseUrl}/`);

    const text = await page.evaluate(() => document.title).end();

    e2e.e(text).toContain('showcasing the ng-seed app');
  });
});
