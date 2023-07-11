import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8000/api';
  private getCookie(name: string): string {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || '';
    }
    return '';
  }

  constructor(private http: HttpClient) {
  }

  // Kullanıcının admin olup olmadığını kontrol eden fonksiyon
  isAdmin(): boolean {
    let cookie = this.getCookie('loggedIn');
    if(cookie === 'true') {
      return true;
    } else {
      return false;
    }
  }
  signup(username: string,email : string, password: string): Observable<any> {
    const signupData = { username, email, password };
    console.log(signupData)
    return this.http.post(`${this.apiUrl}/register`, signupData);
  }
  signIn(email : string, password: string): Observable<any> {
    const signInData = { email, password };
    console.log(signInData);
    console.log(document.cookie);

    return this.http.post(`${this.apiUrl}/login`, signInData , {responseType:'text'});
  }


  // Add other authentication methods as needed

}
