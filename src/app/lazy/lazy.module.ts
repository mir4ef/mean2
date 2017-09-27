import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';
import { LazyService } from './lazy.service';

@NgModule({
  imports: [
    SharedModule,
    LazyRoutingModule
  ],
  declarations: [
    LazyComponent
  ],
  providers: [
    LazyService
  ]
})

export class LazyModule { }
