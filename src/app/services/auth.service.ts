import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  signup(username: string,email : string, password: string): Observable<any> {
    const signupData = { username, email, password };
    return this.http.post(`${this.apiUrl}/register`, signupData);
  }

  // Add other authentication methods as needed

}
