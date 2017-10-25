import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TokenService } from '../auth/token.service';

// Request scheme definition
type Scheme = 'http' | 'https';

// Request params definition
interface IParams {
  [key: string]: string;
}

// Request options definition
interface IRequestOptions<T> {
  scheme?: Scheme;
  host?: string;
  headers?: { [key: string]: string };
  port?: number;
  path?: string;
  params?: IParams;
  body?: T;
}

// Response object definition
export interface IResponse {
  success: boolean;
  message: any;
  token?: string;
  status?: number;
}

@Injectable()
export class CoreHttpService {
  private apiURI: string = '/api/v1';

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) { }

  /**
   * @description Handles HTTP GET requests
   * @param {IRequestOptions} request - The request object containing the data for the request
   * @returns {Observable<IResponse | HttpErrorResponse>}
   */
  public apiGet(request: IRequestOptions<{}>): Observable<IResponse | HttpErrorResponse> {
    return this.http
      .get<IResponse>(
        this.buildURL(request),
        {
          headers: this.setRequestHeaders(request.headers),
          params: this.setQueryParams(request.params)
        }
      )
      .catch(this.handleError);
  }

  /**
   * @description Handles HTTP POST requests
   * @param {IRequestOptions} request - The request object containing the data for the request
   * @returns {Observable<IResponse | HttpErrorResponse>}
   */
  public apiPost(request: IRequestOptions<{}>): Observable<IResponse | HttpErrorResponse> {
    return this.http
      .post<IResponse>(
        this.buildURL(request),
        this.setRequestBody(request.body),
        {
          headers: this.setRequestHeaders(request.headers),
          params: this.setQueryParams(request.params)
        }
      )
      .catch(this.handleError);
  }

  /**
   * @description Handle response errors
   * @param {HttpErrorResponse} err - The error response
   * @returns {Observable<IResponse | HttpErrorResponse>}
   */
  private handleError = (err: HttpErrorResponse): Observable<IResponse | HttpErrorResponse> => {
    if (err.status === 403) {
      this.tokenService.token = '';
      this.router.navigate([ '/login' ]);
    }

    // The backend returned an unsuccessful response code
    if (err.error.message) {
      // add the http status code to the response if it is not the
      if (!err.error.status) {
        err.error.status = err.status;
      }

      return Observable.throw(err.error);
    }

    // A client-side or network error occurred
    return Observable.throw(err);
  }

  /**
   * @description Build the endpoint URL with a default URI or passed URL options like scheme, host, etc.
   * @param {IRequestOptions} options - The request options
   * @returns {String} Completed URL to an endpoint
   */
  private buildURL(options: IRequestOptions<{}>): string {
    // set the url to the default api URI
    let url: string = this.apiURI;

    // build a completely new URL if the requester needs it
    if (options.scheme && options.host) {
      const host: string = options.host.endsWith('/') ? options.host.slice(0, -1) : options.host;

      url = `${options.scheme}://${host}`;
      url += options.port ? `:${options.port}` : '';
    }

    if (options.path) {
      url += options.path.startsWith('/') ? options.path : `/${options.path}`;
    }

    return url;
  }

  /**
   * @description Build the URL query params
   * @param {Object} params - The query params to be appended to the URL
   * @returns {HttpParams|null} An object with all the params and values to be appended to the URL
   */
  private setQueryParams(params: IParams | undefined): HttpParams | null {

    if (!params) {
      return null;
    }

    let httpParams = new HttpParams();

    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        httpParams = httpParams.append(param, params[param]);
      }
    }

    return httpParams;
  }

  /**
   * @description Get the headers for this request or an empty Headers object
   * @param {Object} headers - An object with headers that need to be passed along with the request
   * @returns {Headers} The Angular headers object
   */
  private setRequestHeaders(headers: {} | undefined): HttpHeaders | null {
    return headers ? new HttpHeaders(headers) : new HttpHeaders({});
  }

  /**
   * @description Get the request body or an empty/null body object
   * @returns {Object} The request body or null object
   */
  private setRequestBody(body: {} | undefined): {} | null {
    if (!body) {
      return null;
    }

    return body;
  }
}
