import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {
  }

  // Kullanıcının admin olup olmadığını kontrol eden fonksiyon
  isAdmin(): boolean {
    const token = localStorage.getItem('authToken');
    if(token) {
      try {
        const decodedToken : any = jwtDecode(token);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTimestamp) {
          // Token is expired
          return false;
        } else {
          console.log('Token is valid');
          console.log('Decoded Token:', decodedToken);
          return true;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    } else {
      console.log('Token not found in localStorage');
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
