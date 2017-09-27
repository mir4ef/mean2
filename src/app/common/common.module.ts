import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { LoadingIndicatorService } from './loading-indicator/loading-indicator.service';

import { throwIfAlreadyLoaded } from '../utils/module-import-guard';

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingIndicatorComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingIndicatorComponent
  ],
  providers: [
    LoadingIndicatorService
  ]
})

export class CommonModule {
  constructor(@Optional() @SkipSelf() parentModule: CommonModule) {
    throwIfAlreadyLoaded(parentModule, 'CommonModule');
  }
}
