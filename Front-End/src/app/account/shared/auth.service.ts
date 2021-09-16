import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = "http://localhost:3000/api/v1";
  private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) { }

  async login(user: {email: string, password: string}): Promise<boolean> {
    try {
      let token = null;

      let response = await this.http.post<any>(`${this.baseUrl}/login`, user, this.httpOptions).toPromise();

      token = response.data.token;

      if(!token)
        return false;

      window.localStorage.setItem('token', token);
      return true;
    }
    catch (error) {
      console.error(error);
      return false;
    }
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, this.httpOptions);
  }
}
