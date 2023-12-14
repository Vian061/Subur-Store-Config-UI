import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NetworkService {
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}

  get(apiUrl: string): Observable<any> {
    const token = sessionStorage.getItem("token");

    console.log(token);
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
    const token = sessionStorage.getItem("token");

    if (token) {
      this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${token}`);
    }

    return this.http.post<any>(apiUrl, item, this.httpOptions);
  }

  update(apiUrl: string, item: any): Observable<any> {
    const token = sessionStorage.getItem("token");

    if (token) {
      this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${token}`);
    }

    return this.http.put<any>(apiUrl, item, this.httpOptions);
  }

  delete(apiUrl: string): Observable<any> {
    const token = sessionStorage.getItem("token");

    if (token) {
      this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${token}`);
    }

    return this.http.delete<any>(apiUrl, this.httpOptions);
  }
}
