import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@ngx-config/core';

import { BaseService } from '../../base-service';
import { BaseDocument } from '../../models/base-document';

export class MockBaseService extends BaseService<BaseDocument> {
  constructor(
    protected readonly config: ConfigService,
    protected readonly http: HttpClient,
    protected readonly settingsKey: string | Array<string>
  ) {
    super(config, http, settingsKey);
  }
}
