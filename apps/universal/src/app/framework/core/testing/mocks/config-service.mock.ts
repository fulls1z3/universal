import { ConfigService } from '@ngx-config/core';

export class MockConfigService extends ConfigService {
  constructor() {
    super(undefined);

    this.init();
  }

  init(): any {
    this.settings = {
      system: {
        applicationName: 'APP_NAME',
        applicationUrl: 'http://ng-seed.fulls1z3.com'
      },
      seo: {
        defaultPageTitle: 'DEFAULT_TITLE',
        pageTitlePositioning: 10,
        pageTitleSeparator: ' | ',
        defaultMetaDescription: 'DEFAULT_META_DESCRIPTION'
      },
      i18n: {
        defaultLanguage: {
          code: 'en',
          name: 'English',
          culture: 'en-US'
        },
        availableLanguages: [
          {
            code: 'en',
            name: 'English',
            culture: 'en-US'
          }
        ]
      },
      backend: {
        baseBrowserUrl: 'http://localhost:4200',
        baseServerUrl: 'http://localhost:4000',
        test: {
          local: {
            endpoint: './test'
          },
          remote: {
            endpoint: '{baseUrl}/test'
          }
        },
        flight: {
          airline: {
            endpoint: '{baseUrl}/assets/data/airlines.json'
          },
          airport: {
            endpoint: '{baseUrl}/assets/data/airports.json'
          },
          'flight-segment': {
            endpoint: '{baseUrl}/assets/data/flight-segments.json'
          },
          flight: {
            endpoint: '{baseUrl}/assets/data/flights.json'
          }
        }
      }
    };

    return undefined;
  }
}
