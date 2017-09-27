import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core/auth/auth.service';
import { CoreHttpService, IResponse } from '../core/http/core-http.service';

@Injectable()
export class DataService {

  constructor(private autService: AuthService, private http: CoreHttpService) { }

  public getUser(id: number | string): Observable<IResponse> {
    return this.http.apiGet({ path: `data/${id}` });
  }

  public logout(): void {
    this.autService.logout();
  }
}
