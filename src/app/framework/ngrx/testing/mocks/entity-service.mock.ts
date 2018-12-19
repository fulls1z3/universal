import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@ngx-config/core';

import { BaseEntityService } from '../../base-entity.service';
import { BaseDocument } from '../../models/base-document';

export class MockEntityService extends BaseEntityService<BaseDocument> {
  constructor(
    protected readonly config: ConfigService,
    protected readonly http: HttpClient,
    protected readonly settingsKey: string | Array<string>
  ) {
    super(config, http, settingsKey);
  }
}
