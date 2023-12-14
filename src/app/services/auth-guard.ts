import { inject } from "@angular/core";
import { CanActivateFn, CanActivateChildFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { of, switchMap } from "rxjs";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // if (authService.isAuthenticated()) {
  //   return true;
  // } else {
  //   router.navigate(["/Login"]);
  //   return false;
  // }
  return authService.isAuthenticated().pipe(
    switchMap((authenticated) => {
      if (!authenticated) {
        return of(router.parseUrl("Login"));
      } else {
        return of(true);
      }
    })
  );
};
