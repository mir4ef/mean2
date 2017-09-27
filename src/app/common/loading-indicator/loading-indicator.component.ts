import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/takeUntil';

import { LoadingIndicatorService } from './loading-indicator.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public isLoading: boolean = false;

  constructor(private loaderIndicator: LoadingIndicatorService) { }

  ngOnInit(): void {
    this.loaderIndicator.getIndicatorState()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (state: boolean): boolean => this.isLoading = state,
        (err): boolean => this.isLoading = false
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
