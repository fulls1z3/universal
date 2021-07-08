import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@ngx-config/core';

export class MockService {
  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient,
    private readonly settingsKey: string | Array<string>
  ) {}

  fetch$() {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.get<number>(backend.endpoint);
  }
}
