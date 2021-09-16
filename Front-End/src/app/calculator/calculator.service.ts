import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private baseUrl = "http://localhost:3000/api/v1/calc-async";
  private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization':  window.localStorage.getItem('token') || ""
      })
  };

  constructor(private http: HttpClient) { }

  createSum(numbers: {number1: number, number2: number}): Observable<any> {
    return this.http.post(`${this.baseUrl}/sum`, numbers, this.httpOptions);
  }

  getResult(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.httpOptions);
  }
}
