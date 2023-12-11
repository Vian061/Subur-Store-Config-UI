import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isAuthenticated: boolean = false;
  private currentUser: any;
  private router: Router;

  constructor(router: Router) {
    this.router = router;
    // this._isAuthenticated = !!sessionStorage.getItem("token");
    // this.currentUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  }

  login(username: string, password: string) {
    if ((username != null && password != null) || (username != "" && password != "")) {
      this.currentUser = { username, password }; // Store user data
      sessionStorage.setItem("token", "someToken"); // Store authentication token
      sessionStorage.setItem("user", JSON.stringify(this.currentUser)); // Store user data

      this.router.navigate(["/"]);
      this._isAuthenticated = true;
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this._isAuthenticated = false;
    this.currentUser = null;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.router.navigate(["/Login"]);
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
