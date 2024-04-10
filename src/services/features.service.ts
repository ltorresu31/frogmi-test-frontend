import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private baseUrl: string = environment.url;

  constructor(private http: HttpClient) { }
  all(params: any): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    let url = this.baseUrl + "features?page=" + (params.page || 1) + "&per_page=" + (params.per_page || 10)
    if(params.mag_type && params.mag_type.length > 0){
      params.mag_type.forEach((item: string) => {
        url = url + "&mag_type[]=" + item
      })
    }
    return this.http.get<any[]>(url, {headers});
  }

  createComment(body: string, id: number): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post<any>(this.baseUrl + "features/" + id + "/comments", {body: body}, {headers: headers});
  }
}
