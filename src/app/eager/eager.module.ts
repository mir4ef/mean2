import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EagerRoutingModule } from './eager-routing.module';
import { EagerComponent } from './eager.component';

@NgModule({
  imports: [
    CommonModule,
    EagerRoutingModule
  ],
  declarations: [
    EagerComponent
  ]
})
export class EagerModule { }
