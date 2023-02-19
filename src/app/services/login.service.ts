import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getData(username: string, password: string) {
    let obj = {
      username: username,
      password: password
    }
    console.log(obj)
    return this.http.post<any>(`${this.apiUrl}/v1/login`, obj, this.httpOptions);
  }
}
