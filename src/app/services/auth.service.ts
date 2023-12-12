import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { NetworkService } from "./network.service";
import { Constants } from "../constants";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isAuthenticated: boolean = false;
  private currentUser: any;
  private router: Router;

  constructor(router: Router, private http: HttpClient) {
    this.router = router;
    // this._isAuthenticated = !!sessionStorage.getItem("token");
    // this.currentUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  }

  getToken(username: string, password: string): Observable<any> {
    const body =
      "grant_type=password&username=" +
      username +
      "&password=" +
      password +
      "&scope=" +
      Constants.is4Client.scope;

    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": ["http, https"],
      "Access-Control-Allow-Methods": ["DELETE, POST, GET, OPTIONS"],
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      Authorization: "Basic " + btoa("SuburStoreConfiguration-Web:SuburStoreConfiguration-Web"),
    });

    return this.http.post<any>(Constants.UrlEndpoint.passwordTokenRequestEndpoint, body, {
      headers: headers,
    });
  }

  login(username: string, password: string) {
    if (username && password) {
      this.currentUser = { username, password }; // Store user data

      this.getToken(username, password).subscribe({
        next: (response) => {
          console.log(response);
          sessionStorage.setItem("token", "someToken"); // Store authentication token
          sessionStorage.setItem("user", JSON.stringify(this.currentUser)); // Store user data
          this.router.navigate(["/"]);

          this._isAuthenticated = true;
        },
        // error: (error) => {
        //   console.error(error);
        // },
      });
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
