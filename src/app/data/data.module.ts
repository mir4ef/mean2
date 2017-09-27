import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DataRoutingModule } from './data-routing.module';
import { DataService } from './data.service';

import { DataComponent } from './data.component';

@NgModule({
  imports: [
    SharedModule,
    DataRoutingModule
  ],
  declarations: [
    DataComponent
  ],
  providers: [
    DataService
  ]
})
export class DataModule { }
