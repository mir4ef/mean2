import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { LoadingIndicatorService } from '../common/loading-indicator/loading-indicator.service';
import { IResponse } from '../core/http/core-http.service';

import { DataService } from './data.service';

interface IUserData {
  id: number;
  name: string;
  username: string;
}

@Component({
  templateUrl: './data.component.html',
  styleUrls: [ './data.component.scss' ]
})
export class DataComponent implements OnInit {
  public userData: IUserData;
  public errMsg: string;

  constructor(
    private router: Router,
    private loadingIndicator: LoadingIndicatorService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    // show the loading indicator
    this.loadingIndicator.setIndicatorState(true);

    // get the data from the service
    this.dataService.getUser(123)
      .pipe(take(1))
      .subscribe(
        (data: IResponse): void => {
          this.loadingIndicator.setIndicatorState(false);
          this.userData = data.message;
        },
        (err: IResponse | HttpErrorResponse): void => {
          this.loadingIndicator.setIndicatorState(false);
          this.errMsg = err.message;
        }
      );
  }

  public logout(): void {
    this.dataService.logout();
    this.router.navigate([ '/login' ]);
  }
}
