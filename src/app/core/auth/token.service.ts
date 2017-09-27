import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  private tokenKey: string = 'token';

  public set token(token: string | null) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  public get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
