import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from '../core/auth/auth.service';
import { IResponse } from '../core/http/core-http.service';
import { LoadingIndicatorService } from '../common/loading-indicator/loading-indicator.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
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
      .pipe(take(1))
      .subscribe(
        (): void => {
          this.loadingIndicator.setIndicatorState(false);
          this.router.navigate([this.authService.requestedURL]);
        },
        (err: IResponse | HttpErrorResponse): void => {
          this.loadingIndicator.setIndicatorState(false);
          this.errMsg = err.message;
        }
      );
  }
}
