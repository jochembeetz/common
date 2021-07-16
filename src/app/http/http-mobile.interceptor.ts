import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { ApiMethod, ApiMethods, ReqOptions, Serializer } from './http.service';

@Injectable()
export class MobileHttpInterceptor implements HttpInterceptor {
  constructor(private platform: Platform, private mobHttp: HTTP) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.platform.is('capacitor')) {
      return from(
        this.requestMobile<any>(
          ApiMethods[request.method as ApiMethod],
          request.url,
          {
            data: request.body,
            params: request.params,
            headers: request.headers,
            serializer: request.headers.get('type-hint') as Serializer,
          }
        )
      );
    }
    return next.handle(request);
  }

  private async requestMobile<T>(
    method: ApiMethod,
    url: string,
    options?: ReqOptions
  ): Promise<HttpResponse<T>> {
    this.mobHttp.setDataSerializer(options?.serializer ?? 'json');
    let nativeResponse: HTTPResponse;
    try {
      switch (method) {
        case ApiMethods.GET:
          nativeResponse = await this.mobHttp.get(
            `${url}`,
            this.transformHttpParamsToObject(options?.params),
            this.transformHttpHeadersToObject(options?.headers)
          );
          break;
        case ApiMethods.PUT:
          nativeResponse = await this.mobHttp.put(
            `${url}`,
            options?.data,
            this.transformHttpHeadersToObject(options?.headers)
          );

          break;
        case ApiMethods.POST:
          nativeResponse = await this.mobHttp.post(
            `${url}`,
            options?.data ?? {},
            this.transformHttpHeadersToObject(options?.headers)
          );

          break;
        case ApiMethods.PATCH:
          nativeResponse = await this.mobHttp.patch(
            `${url}`,
            options?.data ?? {},
            this.transformHttpHeadersToObject(options?.headers)
          );

          break;
        case ApiMethods.DELETE:
          nativeResponse = await this.mobHttp.delete(
            `${url}`,
            this.transformHttpParamsToObject(options?.params),
            this.transformHttpHeadersToObject(options?.headers)
          );
          break;
        default:
          break;
      }
      const response = new HttpResponse({
        body: JSON.parse(nativeResponse.data),
        status: nativeResponse.status,
        url: nativeResponse.url,
        headers: new HttpHeaders(nativeResponse.headers),
      });
      return response;
    } catch (error) {
      if (!error.status) {
        const response = new HttpErrorResponse({
          error: error.error,
          statusText: error.statusText || 'No Statustext',
          status: 0,
          headers: new HttpHeaders(),
          url: 'Plugin error',
        });
        throw response;
      }
      const response = new HttpErrorResponse({
        error: error.error,
        statusText: error.statusText || 'No Statustext',
        status: error.status,
        headers: new HttpHeaders(error.headers),
        url: error.url,
      });
      throw response;
    }
  }
  private transformHttpParamsToObject(params: HttpParams | undefined) {
    let obj: any = {};
    if (!params) {
      return;
    }
    const keys: string[] = params.keys();
    keys.forEach((k) => {
      obj[k] = params.get(k)?.replace('[]', '');
    });
    return obj;
  }
  private transformHttpHeadersToObject(headers: HttpHeaders | undefined) {
    let obj: any = {};
    if (!headers) {
      return;
    }
    const keys: string[] = headers.keys();
    keys.forEach((k) => {
      obj[k] = headers.get(k);
    });
    return obj;
  }
}
