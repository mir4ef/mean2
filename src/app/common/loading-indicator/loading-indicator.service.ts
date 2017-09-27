import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadingIndicatorService {
  private indicator = new BehaviorSubject<boolean>(false);

  /**
   * @description Update the visual state of loading indicator
   * @param {Boolean} show - The indicator visual state
   */
  public setIndicatorState(show: boolean): void {
    this.indicator.next(show);
  }

  /**
   * @description Create an observable for the indicator visual state so the component can subscribe and react to changes
   * @return {Observable<boolean>} The current state as an observable
   */
  public getIndicatorState(): Observable<boolean> {
    return this.indicator.asObservable();
  }
}
