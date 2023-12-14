import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class NetworkService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  get(apiUrl: string): Observable<any> {
    const token = this.authService.getToken();

    var httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      }),
    };

    return this.http.get<any>(apiUrl, httpOptions);
  }

  post(apiUrl: string, item: any): Observable<any> {
    const token = this.authService.getToken();

    var httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      }),
    };

    return this.http.post<any>(apiUrl, item, httpOptions);
  }

  update(apiUrl: string, item: any): Observable<any> {
    const token = this.authService.getToken();

    var httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      }),
    };

    return this.http.put<any>(apiUrl, item, httpOptions);
  }

  delete(apiUrl: string): Observable<any> {
    const token = this.authService.getToken();

    var httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      }),
    };

    return this.http.delete<any>(apiUrl, httpOptions);
  }
}
