import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { CoreHttpService, IResponse } from '../core/http/core-http.service';

export interface IEntry {
  id: number;
  name: string;
}

@Injectable()
export class Lazy2Service {
  // property to store an array
  // this property is used just as an example to show how to use Class properties with Observable/Promise response (please see handleResponse below)
  // it will be used to 'cache' a response and save a trip to the backend (not recommended approach unless you are dealing with data that
  // won't change i.e. image urls - not a perfect example, but the idea is that the image URLs will be pretty static, but the image itself
  // could change (which you don't care about))
  // however, if you are dealing with data that could change (i.e user data, shopping card), you should have an endpoint which returns a single entry (recommended)
  private dataArray: Array<IEntry>;

  constructor(private httpService: CoreHttpService) { }

  public getData(): Observable<IResponse | HttpErrorResponse> {
    return this.httpService
      .apiGet({ path: 'sampleEntries' })
      .pipe(map(this.handleResponse));
  }

  // ideally this should be a call to an API endpoint (please see ./server/api/routes/v1/sampleEntries.js - this file contains an API endpoint, which returns only one entry)
  public getEntry(id: number | string) {
    return this.dataArray.find((entry: IEntry): boolean => entry.id === +id);
  }

  // if you are not going to reference/call any Class properties/methods, you can just define a regular function if that suites your style
  // however, if you are going to reference/call any Class properties/methods, you will need to define it as an arrow function, because 'this' will be a different context, not the Class!
  private handleResponse = (res: IResponse): IResponse => {
    const response = res;

    this.dataArray = response.message;

    return response;
  }
}
