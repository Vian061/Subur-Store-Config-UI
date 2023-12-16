import { inject } from "@angular/core";
import { CanActivateFn, CanActivateChildFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { catchError, map, of, switchMap } from "rxjs";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // if (authService.isAuthenticated()) {
  //   return true;
  // } else {
  //   router.navigate(["/Login"]);
  //   return false;
  // }
  // return authService.isAuthenticated().pipe(
  //   switchMap((authenticated) => {
  //     if (!authenticated) {
  //       return of(router.parseUrl("Login"));
  //     } else {
  //       return of(true);
  //     }
  //   })
  // );
  return authService.isAuthenticated().pipe(
    map((authenticated) => {
      console.log(authenticated);
      if (!authenticated) {
        return router.parseUrl("Login");
      } else {
        return true;
      }
    })
  );
};
