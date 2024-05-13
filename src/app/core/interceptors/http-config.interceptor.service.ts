import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NEVER, Observable, catchError, tap } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { ErrorManagerService } from '../../services/error-manager.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private errorManagerService: ErrorManagerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(() => this.loadingService.setMainLoading(true)),
      catchError((response: HttpErrorResponse) => {
        this.loadingService.setMainLoading(false);
        return this.handleErrorsType(response);
      })
    );
  }

  private handleErrorsType(response: HttpErrorResponse): Observable<never> {
    this.errorManagerService.manage(response);
    this.loadingService.setMainLoading(false);
    return NEVER;
  }
}
