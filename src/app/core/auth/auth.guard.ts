import { Injectable } from '@angular/core';
import {
  Route,
  Router,
  CanActivate,
  CanActivateChild,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.verifyAccess(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    return this.verifyAccess(url);
  }

  /**
   * @description Verify that the user is logged in before navigating to a page
   * @param {String} url - The URL the user requested to access
   * @return {boolean}
   */
  private verifyAccess(url: string): boolean {
    if (this.tokenService.token) {
      // logged in so return true
      return true;
    }

    // save the url the user came from, so he/she can be redirected back to it after successful login
    this.authService.requestedURL = url;

    // not logged in so redirect to login page
    this.router.navigate([ '/login' ]);

    return false;
  }
}
