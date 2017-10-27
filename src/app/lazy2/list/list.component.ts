import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/take';

import { IResponse } from '../../core/http/core-http.service';
import { LoadingIndicatorService } from '../../common/loading-indicator/loading-indicator.service';

import { IEntry, Lazy2Service } from '../lazy2.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.scss' ]
})

export class ListComponent implements OnInit {
  public entries: Array<IEntry>;
  public errorMsg: string = '';

  constructor(private loaderIndicator: LoadingIndicatorService, private entryService: Lazy2Service) { }

  ngOnInit(): void {
    this.loaderIndicator.setIndicatorState(true);
    this.entryService.getData()
      .take(1)
      .subscribe(
      (res: IResponse): void => {
        this.loaderIndicator.setIndicatorState(false);
        this.entries = res.message;
      },
      (err: IResponse | HttpErrorResponse): void => {
        this.loaderIndicator.setIndicatorState(false);
        this.errorMsg = err.message;
      }
    );
  }
}
