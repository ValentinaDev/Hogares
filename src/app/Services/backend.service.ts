import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = 'http://localhost:3000/api'; // Cambia esto por la URL de tu backend en producción

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener los encabezados con el token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Método para obtener los encabezados con token y Content-Type JSON
  private getAuthJsonHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

    // **Categorías**

    getCategorias(): Observable<any> {
      return this.http.get(`${this.apiUrl}/categorias`);
    }

    createCategoria(categoria: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/categorias`, categoria, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    editCategoria(id: number, categoria: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/categorias/${id}`, categoria, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    deleteCategoria(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/categorias/${id}`, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    // **Colores**

    getColores(): Observable<any> {
      return this.http.get(`${this.apiUrl}/colores`);
    }

    createColor(color: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/colores`, color, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    editColor(id: number, color: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/colores/${id}`, color, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    deleteColor(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/colores/${id}`, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    // **Productos**

    getProductos(): Observable<any> {
      // Esto ya debería devolver los nombres de categoría, tipo y color gracias al cambio en el backend
      return this.http.get(`${this.apiUrl}/productos`, {
      });
    }

    createProducto(producto: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/productos`, producto, {
        headers: this.getAuthHeaders(), // Solo Authorization, no Content-Type
      });
    }

    editProducto(id: number, producto: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/productos/${id}`, producto, {
        headers: this.getAuthHeaders(), // Solo Authorization
      });
    }

    deleteProducto(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/productos/${id}`, {
        headers: this.getAuthHeaders(), // Solo Authorization
      });
    }

    getProductosPorCategoria(nombreCategoria: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/productos/categoria/${nombreCategoria}`);
    }

    getProductoById(id: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/productos/${id}`);
    }


    // **Tamaños**

    getTamanos(): Observable<any> {
      return this.http.get(`${this.apiUrl}/tamanos`);
    }

    createTamano(tamano: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/tamanos`, tamano, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    editTamano(id: number, tamano: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/tamanos/${id}`, tamano, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    deleteTamano(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/tamanos/${id}`, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    // **Tipos**

    getTipos(): Observable<any> {
      return this.http.get(`${this.apiUrl}/tipos`);
    }

    createTipo(tipo: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/tipos`, tipo, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    editTipo(id: number, tipo: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/tipos/${id}`, tipo, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    deleteTipo(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/tipos/${id}`, {
        headers: this.getAuthJsonHeaders(),
      });
    }

    // **Usuarios**

    registerUser(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/users/register`, userData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }

    loginUser(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/users/login`, credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
  }
