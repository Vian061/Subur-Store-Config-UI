import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { Constants } from "../constants";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUser: any;
  private TOKEN_KEY = "acess_token";
  private REFRESH_TOKEN_KEY = "refresh_token";
  private USERNAME_KEY = "username";
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.checkToken();
  }

  // Method to set token in a cookie
  setToken(token: string): void {
    this.cookieService.set(this.TOKEN_KEY, token);
  }

  // Method to get token from a cookie
  getToken(): string | undefined {
    return this.cookieService.get(this.TOKEN_KEY);
  }
  // Method to set token in a cookie
  setRefreshToken(token: string): void {
    this.cookieService.set(this.REFRESH_TOKEN_KEY, token);
  }

  // Method to get token from a cookie
  getRefreshToken(): string | undefined {
    return this.cookieService.get(this.REFRESH_TOKEN_KEY);
  }
  // Method to set token in a cookie
  setUsername(token: string): void {
    this.cookieService.set(this.USERNAME_KEY, token);
  }

  // Method to get token from a cookie
  getUsername(): string | undefined {
    return this.cookieService.get(this.USERNAME_KEY);
  }

  generateToken(username: string, password: string): Observable<any> {
    const body =
      "grant_type=password&username=" +
      username +
      "&password=" +
      password +
      "&scope=" +
      Constants.is4Client.scope;

    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(Constants.is4Client.client_id + ":" + Constants.is4Client.client_secret),
    });

    return this.http.post<any>(Constants.UrlEndpoint.passwordTokenRequestEndpoint, body, {
      headers: headers,
    });
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    const body =
      "grant_type=refresh_token&refresh_token=" +
      refreshToken +
      "&scope=" +
      Constants.is4Client.scope;

    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(Constants.is4Client.client_id + ":" + Constants.is4Client.client_secret),
    });

    return this.http.post<any>(Constants.UrlEndpoint.passwordTokenRequestEndpoint, body, {
      headers: headers,
    });
  }

  checkToken() {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<any>(token!);
      const expDate = new Date(decodedToken.exp * 1000);
      const currentDate = new Date();
      const currentUTCTime = new Date(currentDate.toUTCString());

      if (expDate <= currentUTCTime) {
        setTimeout(() => {
          this.refreshToken().subscribe({
            next: (response) => {
              var decodedToken = jwtDecode<any>(response.access_token);
              this.cookieService.deleteAll();
              this.setToken(response.access_token);
              this.setRefreshToken(response.refresh_token);
              this.setUsername(decodedToken.name);
              this.isAuthenticatedSubject.next(true);
            },
            error: (error) => {
              this.logout();
            },
          });
        }, 100);
      } else {
        this.isAuthenticatedSubject.next(true);
      }
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  login(username: string, password: string): Observable<any> {
    if (username && password) {
      return this.generateToken(username, password).pipe(
        map((response) => {
          var decodedToken = jwtDecode<any>(response.access_token);
          this.setToken(response.access_token);
          this.setRefreshToken(response.refresh_token);
          this.setUsername(decodedToken.name);
          this.isAuthenticatedSubject.next(true);

          this.router.navigate(["/"]);

          return "";
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
    } else {
      return throwError(() => "Username & Passsword cannot be empty");
    }
  }

  logout(): void {
    this.currentUser = null;
    this.cookieService.deleteAll();
    this.isAuthenticatedSubject.next(false);

    this.router.navigate(["/Login"]);
  }

  isAuthenticated(): Observable<boolean> {
    this.checkToken();

    return this.isAuthenticatedSubject.asObservable();
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
