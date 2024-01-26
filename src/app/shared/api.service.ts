import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
   baseURL:any = 'https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json';

   getToken() {
    return sessionStorage.getItem("token");
  }

  setHeaders() {
    let headers = new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("token")!
    });
    return { headers };
    }  
  constructor(private http: HttpClient) { }
  getTableData():Observable<any>{
    return this.http.get(this.baseURL, this.getToken() ? this.setHeaders() : {});
  }
  removeUserMethod(id:string):Observable<any>{
    return this.http.delete(this.baseURL + '/' + id, this.getToken() ? this.setHeaders() : {})
  }
  updateUserMethod(id:string,body:any):Observable<any>{
    return this.http.put(this.baseURL + '/' + id,body, this.getToken() ? this.setHeaders() : {})
  }
}
