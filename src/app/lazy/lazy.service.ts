import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CoreHttpService, IResponse } from '../core/http/core-http.service';

@Injectable()
export class LazyService {

  constructor(private httpService: CoreHttpService) { }

  public getData(): Observable<IResponse | HttpErrorResponse> {
    return this.httpService.apiGet({ path: 'sampleData' });
  }
}
