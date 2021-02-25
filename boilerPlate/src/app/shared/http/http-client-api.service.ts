import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IHttpOptions, IRequestOptions } from './http-interface';

@Injectable({
  providedIn: 'root',
})
export class HttpClientApiService {
  constructor(private http: HttpClient) {}

  // call http get method
  // tslint:disable-next-line: typedef
  get(url: string, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.setURL(url);
    return this.http.get(
      url,
      this.getRequestOptions(headers, params, options) as any
    );
  }

  // http post method
  // tslint:disable-next-line: typedef
  post(
    url: string,
    body: any = '',
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ) {
    url = this.setURL(url);
    return this.http.post(
      url,
      body,
      this.getRequestOptions(headers, params, options) as any
    );
  }

  // tslint:disable-next-line: typedef
  patch(
    url: string,
    body: any = '',
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ) {
    url = this.setURL(url);
    return this.http.patch(
      url,
      body,
      this.getRequestOptions(headers, params, options) as any
    );
  }

  // http put
  // tslint:disable-next-line: typedef
  put(
    url: string,
    body: any,
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ) {
    url = this.setURL(url);
    return this.http.put(
      url,
      body,
      this.getRequestOptions(headers, params, options) as any
    );
  }

  // http delete request
  // tslint:disable-next-line: typedef
  delete(url: string, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.setURL(url);
    return this.http.delete(
      url,
      this.getRequestOptions(headers, params, options) as any
    );
  }

  // build URL from the url received from service
  // tslint:disable-next-line: typedef
  private setURL(req: string) {
    if (req.indexOf('https://') === -1) {
      return `${environment.apiUrl}/${req}`;
    } else {
      return req;
    }
  }

  // set request parameters
  private getRequestOptions(
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ): IRequestOptions {
    headers = headers || {};
    params = params || {};
    options = options || {};
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'text/plain';
    }

    const customParams = new HttpParams();
    for (const key of Object.keys(params)) {
      customParams.append(key, params[key]);
    }
    const requestOptions = Object.assign({}, options);
    return requestOptions;
  }
}
