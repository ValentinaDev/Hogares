import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  private apiUrl = 'http://localhost:3000/api'; // Cambia esto por la URL de tu backend en producción

  constructor(private http: HttpClient) {}

  // Headers opcionales si los necesitas para autenticación o JSON
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Categorías

  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias`);
  }

  createCategoria(categoria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categorias`, categoria, this.httpOptions);
  }


  // Colores

  getColores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/colores`);
  }

  createColor(color: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/colores`, color, this.httpOptions);
  }


  // Productos

  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, producto, this.httpOptions);
  }


  // Tamaños

  getTamanos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tamanos`);
  }

  createTamano(tamano: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tamanos`, tamano, this.httpOptions);
  }


  // Tipos

  getTipos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tipos`);
  }

  createTipo(tipo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tipos`, tipo, this.httpOptions);
  }


  // Usuarios

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, userData, this.httpOptions);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, credentials, this.httpOptions);
  }
}
