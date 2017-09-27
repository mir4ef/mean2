import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Lazy2Component } from './lazy2.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: Lazy2Component,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: ':id',
        component: DetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: []
})

export class Lazy2RoutingModule { }
