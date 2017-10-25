import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/takeUntil';

import { AuthService } from '../core/auth/auth.service';
import { LoadingIndicatorService } from '../common/loading-indicator/loading-indicator.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public user = {
    username: '',
    password: ''
  };
  public errMsg: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingIndicator: LoadingIndicatorService
  ) { }

  ngOnInit(): void {
    this.loadingIndicator.setIndicatorState(false);
    this.authService.updateLoggedInState();
  }

  public login(): void {
    // show the loading indicator
    this.loadingIndicator.setIndicatorState(true);

    // login the user
    this.authService
      .login(this.user)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (): void => {
          this.loadingIndicator.setIndicatorState(false);
          this.router.navigate([this.authService.requestedURL]);
        },
        (err: HttpErrorResponse): void => {
          this.loadingIndicator.setIndicatorState(false);
          this.errMsg = err.message;
        }
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
