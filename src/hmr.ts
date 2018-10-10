// angular
import { ApplicationRef, NgModuleRef } from '@angular/core';

// libs
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  let ngModule: NgModuleRef<any>;

  module.hot.accept();

  bootstrap()
    .then(res => ngModule = res);

  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components
      .map(cur => cur.location.nativeElement);
    const makeVisible = createNewHosts(elements);

    ngModule.destroy();
    makeVisible();
  });
};
