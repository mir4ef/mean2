import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CoreHttpService, IResponse } from '../http/core-http.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  // property to hold the url the user came from
  private fromURL: string = '/';
  private loggedInState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn);

  constructor(private http: CoreHttpService, private tokenService: TokenService) { }

  // setter for the url the user came from
  public set requestedURL(url: string) {
    this.fromURL = url;
  }

  // getter for the url the user came from
  public get requestedURL(): string {
    return this.fromURL;
  }

  /**
   * @description login the user
   * @param {Object} user - The username and password of the user
   * @returns {Observable<IResponse>} Session details
   */
  public login(user: {}): Observable<IResponse> {
    const opt = {
      body: user,
      path: 'auth'
    };

    return this.http.apiPost(opt).map((data: IResponse): IResponse => {
      this.tokenService.token = data.token;
      this.updateLoggedInState();

      return data;
    });
  }

  /**
   * @description Logout the user
   * @return {void}
   */
  public logout(): void {
    this.tokenService.token = '';
    this.updateLoggedInState();
  }

  /**
   * @description Check if the user has a valid token
   * @return {Boolean} Whether the token is valid or not
   */
  public get isLoggedIn(): boolean {
    return !!this.tokenService.token;
  }

  /**
   * @description Update the user logged in state
   */
  public updateLoggedInState(): void {
    this.loggedInState.next(this.isLoggedIn);
  }

  /**
   * @description Create an observable for the user logged in state so a component can subscribe and react to changes
   * @return {Observable<boolean>}
   */
  public getLoggedInState(): Observable<boolean> {
    return this.loggedInState.asObservable();
  }

  /**
   * @description Get the user info from the token
   * @return {Observable<IResponse>} User details response
   */
  public getUser(): Observable<{}> {
    return this.http.apiGet({ path: 'me' });
  }
}
