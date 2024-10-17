// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:3000/api/auth';  // Cambia esta URL a tu servidor

  constructor(private http: HttpClient, private router: Router) {}

  // Registrar usuario
  register(user: any) {
    return this.http.post(`${this.apiURL}/register`, user);
  }

  // Iniciar sesión
  login(user: any) {
    return this.http.post(`${this.apiURL}/login`, user);
  }

  // Guardar token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Obtener token
  getToken() {
    return localStorage.getItem('token');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
