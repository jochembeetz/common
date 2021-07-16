import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  request<T>(
    method: ApiMethod,
    api: string,
    options?: ReqOptions
  ): Observable<T> {
    if (!options) {
      options = {
        data: undefined,
        params: new HttpParams(),
        headers: new HttpHeaders(),
      };
    }
    let response;
    switch (method) {
      case ApiMethods.GET:
        response = this.http
          .get<T>(`${api}`, {
            params: options.params,
            headers: options.headers,
          })
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case ApiMethods.PUT:
        response = this.http
          .put<T>(`${api}`, options.data, {
            params: options.params,
            headers: options.headers,
          })
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case ApiMethods.POST:
        response = this.http
          .post<T>(`${api}`, options.data, {
            params: options.params,
            headers: options.headers,
          })
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case ApiMethods.PATCH:
        response = this.http
          .patch<T>(`${api}`, options.data, {
            params: options.params,
            headers: options.headers,
          })
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case ApiMethods.DELETE:
        response = this.http
          .delete<T>(`${api}`, {
            params: options.params,
            headers: options.headers,
          })
          .pipe(catchError((err) => this.handleError(err)));
        break;
      default:
        response = this.http
          .get<T>(`${api}`, {
            params: options.params,
            headers: options.headers,
          })
          .pipe(catchError((err) => this.handleError(err)));
        break;
    }
    return response;
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
export const ApiMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;
export type ApiMethod = typeof ApiMethods[keyof typeof ApiMethods];
export const Serializers = {
  URLENCODED: 'urlencoded',
  JSON: 'json',
  UTF8: 'utf8',
  MULTIPART: 'multipart',
  RAW: 'raw',
} as const;
export type Serializer = typeof Serializers[keyof typeof Serializers];
export interface ReqOptions {
  data?: any;
  params?: HttpParams;
  headers?: HttpHeaders;
  serializer?: Serializer;
}
