import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/takeUntil';

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
  styleUrls: [ './data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

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
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (data: IResponse): void => {
          this.loadingIndicator.setIndicatorState(false);
          this.userData = data.message;
        },
        (err: HttpErrorResponse): void => {
          this.loadingIndicator.setIndicatorState(false);
          this.errMsg = err.message;
        }
      );
  }

  public logout(): void {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
