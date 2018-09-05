// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HelloBossComponent } from './components/hello-boss/hello-boss.component';

// routes & components
import { routes } from './hello.routes';

// framework
// import { SharedModule } from '~/app/framework/core/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
    // SharedModule
  ],
  declarations: [HelloBossComponent]
})
export class HelloModule { }
