import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'https://hogaresbackend.up.railway.app/api/auth';  // Cambia esta URL a tu servidor

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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
    if (isPlatformBrowser(this.platformId)) {
      console.log('Guardando token:', token);
      localStorage.setItem('token', token);
    }
  }


  // Obtener token
  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('Token en localStorage:', token);
    return !!token;  // Devuelve true si token existe, false si es null o undefined
  }


  // Cerrar sesión
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
