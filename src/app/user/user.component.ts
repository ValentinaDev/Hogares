import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackendService } from '../Services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NavbarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  products: any[] = [];
  categorias: any[] = [];
  colores: any[] = [];
  tamanos: any[] = [];
  tipos: any[] = [];
  userName: string | null = null;
  tablaSeleccionada: string = 'productos';
  cardTitulo: string = 'Agregar Producto';
  mostrarDialogo: boolean = false;
  tablaHeaders: string[] = ['Título', 'Imagen', 'Precio', 'Categoría', 'Reseñas', 'Estado'];

  nuevoItem: any = {
    titulo: '',
    imagen: '',
    precio: 0
  };


  constructor(
    private router: Router,
    private backendService: BackendService,
    private authService: AuthService
  ) {}

  abrirDialogo() {
    this.mostrarDialogo = true;
  }

  // Cerrar el diálogo
  cerrarDialogo() {
    this.mostrarDialogo = false;
    this.nuevoItem = { titulo: '', imagen: '', precio: 0 }; // Resetear el formulario
  }

  getProductImage(imagePath: string):string {
    return imagePath;
  }

  goToComponentA() {
    this.router.navigate(['/userConfig']);
  }

  mostrarTabla(tabla: string) {
    this.tablaSeleccionada = tabla;

    // Cambia los encabezados según la tabla seleccionada
    switch (tabla) {
      case 'productos':
        this.backendService.getProductos().subscribe((data: any) => {
          this.products = data;
          this.cardTitulo = 'Agregar Producto';
          this.tablaHeaders = ['Título', 'Imagen', 'Precio', 'Categoría', 'Reseñas', 'Estado'];
        });
        break;
      case 'categorias':
        this.backendService.getCategorias().subscribe((data: any) => {
          this.categorias = data;
          this.cardTitulo = 'Agregar Categoría';
          this.tablaHeaders = ['Nombre']; // Ajusta encabezados para categorías
        });
        break;
      case 'colores':
        this.backendService.getColores().subscribe((data: any) => {
          this.colores = data;
          this.cardTitulo = 'Agregar Color';
          this.tablaHeaders = ['Color', 'Código Hexadecimal']; // Ajusta encabezados para colores
        });
        break;
      case 'tamanos':
        this.backendService.getTamanos().subscribe((data: any) => {
          this.tamanos = data;
          this.cardTitulo = 'Agregar Tamaño';
          this.tablaHeaders = ['Tamaño']; // Ajusta encabezados para tamaños
        });
        break;
      case 'tipos':
        this.backendService.getTipos().subscribe((data: any) => {
          this.tipos = data;
          this.cardTitulo = 'Agregar Tipo';
          this.tablaHeaders = ['Tipo']; // Ajusta encabezados para tipos
        });
        break;
      default:
        break;
    }
  }

  agregarItem() {
    // Aquí iría la lógica para guardar el nuevo producto/categoría/etc.
    console.log('Agregado:', this.nuevoItem);
    this.cerrarDialogo();
  }

  subirImagen(event: any) {
    const file = event.target.files[0];
    // Lógica para manejar el archivo y subir la imagen, tal vez usar un servicio de almacenamiento
    // Por ahora solo guardamos el nombre del archivo
    this.nuevoItem.imagen = file.name;
  }

  editarProducto(productId: string) {
    this.router.navigate(['/editProduct', productId]);
  }

  eliminarProducto(productId: string) {
    // Aquí iría la lógica para eliminar el producto
    console.log('Producto eliminado con ID:', productId);
  }

  editarCategoria(productId: string) {
    this.router.navigate(['/editProduct', productId]);
  }

  eliminarCategoria(productId: string) {
    // Aquí iría la lógica para eliminar el producto
    console.log('Producto eliminado con ID:', productId);
  }

  editarColor(productId: string) {
    this.router.navigate(['/editProduct', productId]);
  }

  eliminarColor(productId: string) {
    // Aquí iría la lógica para eliminar el producto
    console.log('Producto eliminado con ID:', productId);
  }

  editarTamano(productId: string) {
    this.router.navigate(['/editProduct', productId]);
  }

  eliminarTamano(productId: string) {
    // Aquí iría la lógica para eliminar el producto
    console.log('Producto eliminado con ID:', productId);
  }

  editarTipo(productId: string) {
    this.router.navigate(['/editProduct', productId]);
  }

  eliminarTipo(productId: string) {
    // Aquí iría la lógica para eliminar el producto
    console.log('Producto eliminado con ID:', productId);
  }

  cerrarSesion() {
    this.authService.logout();  // Llamar al método de cierre de sesión del AuthService
    this.router.navigate(['/main']);  // Redirigir a la página principal (o la página que desees)
  }


}

