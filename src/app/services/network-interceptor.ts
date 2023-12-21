import { inject } from "@angular/core";
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { catchError, map, switchMap, throwError } from "rxjs";
import { error } from "console";

export const NetworkInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authService.refreshToken().pipe(
          switchMap((refreshResponse: any) => {
            authService.setToken(refreshResponse.access_token);
            authService.setRefreshToken(refreshResponse.refresh_token);

            const newRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${refreshResponse.access_token}`,
              },
            });
            return next(newRequest);
          }),
          catchError((error: any) => {
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
