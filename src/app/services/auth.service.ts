import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/v1/users/login'; // Cambia esto si es necesario

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    // Añadir { responseType: 'text' } para que el token se maneje como texto
    return this.http.post(this.loginUrl, { email, password }, { responseType: 'text' });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
