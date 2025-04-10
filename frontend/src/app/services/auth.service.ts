import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = {email, password};
    return this.http.post(`${this.apiUrl}/login`, body, {headers});
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  refreshToken() {
    return this.http.post<{ token: string }>(`${this.apiUrl}/refresh`, {}, {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      map(response => response.token)
    );
  }

  saveToken(response: any) {
    const token = response.access_token || response.token;
    if (token) {
      localStorage.setItem('token', token);
    }
  }
}
