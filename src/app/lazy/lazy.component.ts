import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/takeUntil';

import { IResponse } from '../core/http/core-http.service';
import { LoadingIndicatorService } from '../common/loading-indicator/loading-indicator.service';
import { fade } from '../shared/animations';

import { LazyService } from './lazy.service';

interface IData {
  bodyText: string;
  title: string;
}

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: [ './lazy.component.scss' ],
  animations: [ fade('2s', .3, .95) ]
})

export class LazyComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public data: IData;
  public err: string;

  constructor(private loaderIndicator: LoadingIndicatorService, private dataService: LazyService) { }

  ngOnInit(): void {
    // show the loading indicator
    this.loaderIndicator.setIndicatorState(true);
    this.dataService
      .getData()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (data: IResponse): void => {
          this.loaderIndicator.setIndicatorState(false);
          this.data = data.message;
        },
        (err: IResponse | HttpErrorResponse): void => {
          this.loaderIndicator.setIndicatorState(false);
          this.err = err.message;
        }
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
