import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
import { SelectivePreloadingStrategy } from './core/preloading-strategy/preloading-strategy';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'lazy',
    loadChildren: 'app/lazy/lazy.module#LazyModule',
    data: { preload: true }
  },
  {
    path: 'lazy2',
    loadChildren: 'app/lazy2/lazy2.module#Lazy2Module'
  },
  {
    path: 'protected',
    loadChildren: 'app/data/data.module#DataModule',
    canLoad: [ AuthGuard ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: SelectivePreloadingStrategy }) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
