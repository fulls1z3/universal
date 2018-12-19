import { ApplicationRef, ComponentRef, NgModuleRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';
import { flow } from 'lodash/fp';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  module.hot.accept();

  const bootstrap$ = bootstrap();

  module.hot.dispose(async () => {
    const ngModule = await bootstrap$;
    const elements = flow(
      (cur: NgModuleRef<any>) => cur.injector.get(ApplicationRef),
      cur => cur.components.map((component: ComponentRef<any>) => component.location.nativeElement)
    )(ngModule);

    const makeVisible = createNewHosts(elements);

    ngModule.destroy();
    makeVisible();
  });
};
