import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { Constants } from "../constants";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isAuthenticated: boolean = false;
  private currentUser: any;

  constructor(private router: Router, private http: HttpClient) {}

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

  login(username: string, password: string): Observable<any> {
    var errorResponse = "";
    if (username && password) {
      return this.getToken(username, password).pipe(
        map((response) => {
          var decodedToken = jwtDecode<any>(response.access_token);
          sessionStorage.setItem("token", response.access_token);
          sessionStorage.setItem("refresh_token", response.access_token);
          sessionStorage.setItem("username", decodedToken.name);

          this.router.navigate(["/"]);
          this._isAuthenticated = true;

          return decodedToken.name;
        }),
        catchError((error) => {
          console.log("error:", error);
          return throwError(() => error.error.error_description);
        })
      );
    } else {
      return throwError(() => "Username & Passsword cannot be empty");
    }
  }

  logout(): void {
    this._isAuthenticated = false;
    this.currentUser = null;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("username");
    this.router.navigate(["/Login"]);
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
