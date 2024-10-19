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
  tablaHeaders: string[] = ['Título', 'Imagen', 'Precio', 'Descripcion', 'Categoria', 'Color', 'Tamaño', 'Tipo'];
  dialogTitle: string = '';
  entityName: string = '';

  nuevoItem: any = {
    titulo: '',
    imagen: '',
    precio: 0
  };

  imagenPrevisualizacion: string | null = null;
  nombreImagen: string | null = null;

  // Propiedades para la fecha y la hora
  horaActual: string = '';
  fechaActual: string = '';
  private intervalId: any;


  constructor(
    private router: Router,
    private backendService: BackendService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Inicializar la hora y la fecha actual
    this.actualizarFechaHora();
    // Actualizar cada segundo
    this.intervalId = setInterval(() => this.actualizarFechaHora(), 1000);

    // Cargar las listas para los selectores desplegables
    this.cargarListas();
  }

  ngOnDestroy() {
    // Limpiar el intervalo cuando se destruye el componente
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  actualizarFechaHora() {
    const fecha = new Date();

    // Formatear la hora en formato HH:mm sin los segundos
    this.horaActual = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Formatear la fecha en formato dd/MM/yyyy o similar
    this.fechaActual = fecha.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }


  abrirDialogo() {
    this.mostrarDialogo = true;
    this.dialogTitle = 'Agregar ' + this.entityName;

    // Reiniciar el formulario según la tabla seleccionada
    switch (this.tablaSeleccionada) {
      case 'productos':
        this.nuevoItem = { titulo: '', imagen: '', precio: 0 };
        break;
      case 'categorias':
      case 'tipos':
      case 'tamanos':
        this.nuevoItem = { nombre: '' };
        break;
      case 'colores':
        this.nuevoItem = { nombre: '', codigoHex: '' };
        break;
      default:
        this.nuevoItem = {};
    }
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

    // Cambia los encabezados y el entityName según la tabla seleccionada
    switch (tabla) {
      case 'productos':
        this.backendService.getProductos().subscribe((data: any) => {
          this.products = data;
          this.cardTitulo = 'Agregar Producto';
          this.entityName = 'Producto';
          this.tablaHeaders = ['Título', 'Imagen', 'Precio', 'Descripcion', 'Categoria', 'Color', 'Tamaño', 'Tipo'];
        });
        break;
      case 'categorias':
        this.backendService.getCategorias().subscribe((data: any) => {
          this.categorias = data;
          this.cardTitulo = 'Agregar Categoría';
          this.entityName = 'Categoría';
          this.tablaHeaders = ['Nombre'];
        });
        break;
      case 'colores':
        this.backendService.getColores().subscribe((data: any) => {
          this.colores = data;
          this.cardTitulo = 'Agregar Color';
          this.entityName = 'Color';
          this.tablaHeaders = ['Color', 'Código Hexadecimal'];
        });
        break;
      case 'tamanos':
        this.backendService.getTamanos().subscribe((data: any) => {
          this.tamanos = data;
          this.cardTitulo = 'Agregar Tamaño';
          this.entityName = 'Tamaño';
          this.tablaHeaders = ['Tamaño'];
        });
        break;
      case 'tipos':
        this.backendService.getTipos().subscribe((data: any) => {
          this.tipos = data;
          this.cardTitulo = 'Agregar Tipo';
          this.entityName = 'Tipo';
          this.tablaHeaders = ['Tipo'];
        });
        break;
      default:
        break;
    }
  }

  cargarListas() {
    // Cargar categorías
    this.backendService.getCategorias().subscribe((data: any) => {
      this.categorias = data;
    });
    // Cargar colores
    this.backendService.getColores().subscribe((data: any) => {
      this.colores = data;
    });
    // Cargar tamaños
    this.backendService.getTamanos().subscribe((data: any) => {
      this.tamanos = data;
    });
    // Cargar tipos
    this.backendService.getTipos().subscribe((data: any) => {
      this.tipos = data;
    });
  }



  agregarItem() {
    let createRequest;
    switch (this.tablaSeleccionada) {
      case 'productos':
        // Preparar el FormData para enviar el archivo de imagen
        const formData = new FormData();
        formData.append('titulo', this.nuevoItem.titulo);
        formData.append('precio', this.nuevoItem.precio);
        formData.append('descripcion', this.nuevoItem.descripcion);
        formData.append('categoriaId', this.nuevoItem.categoriaId);
        formData.append('colorId', this.nuevoItem.colorId);
        formData.append('tamanoId', this.nuevoItem.tamanoId);
        formData.append('tipoId', this.nuevoItem.tipoId);
        if (this.nuevoItem.imagen) {
          formData.append('imagen', this.nuevoItem.imagen);
        }
        createRequest = this.backendService.createProducto(formData);
        break;
      case 'categorias':
        createRequest = this.backendService.createCategoria(this.nuevoItem);
        break;
      case 'colores':
        createRequest = this.backendService.createColor(this.nuevoItem);
        break;
      case 'tamanos':
        createRequest = this.backendService.createTamano(this.nuevoItem);
        break;
      case 'tipos':
        createRequest = this.backendService.createTipo(this.nuevoItem);
        break;
      default:
        console.error('Tabla no válida');
        return;
    }
    createRequest.subscribe(() => {
      this.cerrarDialogo();
      this.mostrarTabla(this.tablaSeleccionada); // Actualizar la tabla después de agregar
    });
  }


  subirImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nombreImagen = file.name;

      // Crear una previsualización de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPrevisualizacion = e.target.result;
      };
      reader.readAsDataURL(file);

      this.nuevoItem.imagen = file; // Guardar el archivo en el item
    }
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
    this.router.navigate(['/']);  // Redirigir a la página principal (o la página que desees)
  }


}

