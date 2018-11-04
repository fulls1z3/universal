// angular
import { HttpClient } from '@angular/common/http';

// libs
import { ConfigService } from '@ngx-config/core';

// module
import { BaseDocument } from '../../models/base-document';
import { BaseEntityService } from '../../base-entity.service';

export class MockEntityService extends BaseEntityService<BaseDocument> {
  constructor(protected readonly config: ConfigService,
              protected readonly http: HttpClient,
              protected readonly settingsKey: string | Array<string>) {
    super(config, http, settingsKey);
  }
}
