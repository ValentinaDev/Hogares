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

  nuevoItem: any = {};
  isEditing: boolean = false;

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
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.actualizarFechaHora();
      this.intervalId = setInterval(() => this.actualizarFechaHora(), 1000);
      this.cargarListas();  // Aquí se cargan todas las listas necesarias
      this.mostrarTabla(this.tablaSeleccionada); // Muestra la tabla seleccionada
    }
  }




  ngOnDestroy() {
    // Limpiar el intervalo cuando se destruye el componente
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cargarProductos() {
    this.backendService.getProductos().subscribe((data: any) => {
      this.products = data;
    });
  }


  actualizarFechaHora() {
    const fecha = new Date();

    // Formatear la hora en formato HH:mm sin los segundos
    this.horaActual = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Formatear la fecha en formato dd/MM/yyyy o similar
    this.fechaActual = fecha.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  abrirDialogo(item?: any) {
    // Asegurarnos de que las listas estén cargadas antes de abrir el diálogo
    this.cargarListas().then(() => {
      this.mostrarDialogo = true;
      this.isEditing = !!item;
      this.dialogTitle = item ? 'Editar ' + this.entityName : 'Agregar ' + this.entityName;

      if (item) {
        this.nuevoItem = {
          ...item,
          categoriaId: item.idcategoria || item.categoriaId,
          colorId: item.idcolor || item.colorId,
          tamanoId: item.idtamano || item.tamanoId,
          tipoId: item.idtipo || item.tipoId
        };

        if (this.tablaSeleccionada === 'productos' && item.imagen) {
          this.imagenPrevisualizacion = this.getProductImage(item.imagen);
        }
      }
    });
  }



  // Cerrar el diálogo
  cerrarDialogo() {
    this.mostrarDialogo = false;
    this.nuevoItem = {}; // Resetear el formulario
    this.isEditing = false;
    this.imagenPrevisualizacion = null;
  }

  getProductImage(imagePath: string): string {
    return imagePath;
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
          this.tablaHeaders = ['Título', 'Imagen', 'Precio', 'Categoría', 'Tipo', 'Color'];
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
    return Promise.all([
      this.backendService.getCategorias().toPromise().then((data: any) => this.categorias = data),
      this.backendService.getColores().toPromise().then((data: any) => this.colores = data),
      this.backendService.getTamanos().toPromise().then((data: any) => this.tamanos = data),
      this.backendService.getTipos().toPromise().then((data: any) => this.tipos = data),
    ]);
  }


  agregarItem() {
    let request;
    if (this.isEditing) {
      // Lógica para editar producto
      const formData = new FormData();
      formData.append('titulo', this.nuevoItem.titulo);
      formData.append('precio', this.nuevoItem.precio.toString());
      formData.append('descripcion', this.nuevoItem.descripcion);
      formData.append('categoriaId', this.nuevoItem.categoriaId.toString());
      formData.append('colorId', this.nuevoItem.colorId.toString());
      formData.append('tamanoId', this.nuevoItem.tamanoId.toString());
      formData.append('tipoId', this.nuevoItem.tipoId.toString());

      if (this.nuevoItem.imagen instanceof File) {
        formData.append('imagen', this.nuevoItem.imagen);
      }
      request = this.backendService.editProducto(this.nuevoItem.idproducto, formData);
    } else {
      // Lógica para crear nuevo producto
      const formData = new FormData();
      formData.append('titulo', this.nuevoItem.titulo);
      formData.append('precio', this.nuevoItem.precio.toString());
      formData.append('descripcion', this.nuevoItem.descripcion);
      formData.append('categoriaId', this.nuevoItem.categoriaId.toString());
      formData.append('colorId', this.nuevoItem.colorId.toString());
      formData.append('tamanoId', this.nuevoItem.tamanoId.toString());
      formData.append('tipoId', this.nuevoItem.tipoId.toString());

      if (this.nuevoItem.imagen) {
        formData.append('imagen', this.nuevoItem.imagen);
      }
      request = this.backendService.createProducto(formData);
    }

    request.subscribe(() => {
      this.cerrarDialogo();
      this.mostrarTabla(this.tablaSeleccionada); // Refresca la tabla después de la operación
    }, (error) => {
      console.error('Error al guardar el item:', error);
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


  editarProducto(producto: any) {
    this.tablaSeleccionada = 'productos';
    this.entityName = 'Producto';
    this.abrirDialogo(producto);
  }

  editarCategoria(categoria: any) {
    this.tablaSeleccionada = 'categorias';
    this.entityName = 'Categoría';
    this.abrirDialogo(categoria);
  }

  editarColor(color: any) {
    this.tablaSeleccionada = 'colores';
    this.entityName = 'Color';
    this.abrirDialogo(color);
  }

  editarTamano(tamano: any) {
    this.tablaSeleccionada = 'tamanos';
    this.entityName = 'Tamaño';
    this.abrirDialogo(tamano);
  }

  editarTipo(tipo: any) {
    this.tablaSeleccionada = 'tipos';
    this.entityName = 'Tipo';
    this.abrirDialogo(tipo);
  }

  eliminarProducto(productId: number) {
    console.log('Eliminando producto con ID:', productId);
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.backendService.deleteProducto(productId).subscribe(() => {
        this.mostrarTabla('productos'); // Actualiza la tabla después de eliminar
      });
    }
  }

  eliminarCategoria(categoriaId: number) {
    console.log('Eliminando categoría con ID:', categoriaId);
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.backendService.deleteCategoria(categoriaId).subscribe(() => {
        this.mostrarTabla('categorias');
      });
    }
  }

  eliminarColor(colorId: number) {
    console.log('Eliminando color con ID:', colorId);
    if (confirm('¿Estás seguro de que deseas eliminar este color?')) {
      this.backendService.deleteColor(colorId).subscribe(() => {
        this.mostrarTabla('colores'); // Actualiza la tabla después de eliminar
      });
    }
  }

  eliminarTamano(tamanoId: number) {
    console.log('Eliminando tamaño con ID:', tamanoId);
    if (confirm('¿Estás seguro de que deseas eliminar este tamaño?')) {
      this.backendService.deleteTamano(tamanoId).subscribe(() => {
        this.mostrarTabla('tamanos');
      });
    }
  }

  eliminarTipo(tipoId: number) {
    console.log('Eliminando tipo con ID:', tipoId);
    if (confirm('¿Estás seguro de que deseas eliminar este tipo?')) {
      this.backendService.deleteTipo(tipoId).subscribe(() => {
        this.mostrarTabla('tipos');
      });
    }
  }

  cerrarSesion() {
    this.authService.logout();  // Llamar al método de cierre de sesión del AuthService
    this.router.navigate(['/']);  // Redirigir a la página principal (o la página que desees)
  }

  getNombreCategoria(idcategoria: number): string {
    const categoria = this.categorias.find(c => c.idcategoria === idcategoria);
    return categoria ? categoria.nombre : 'Categoría no encontrada';
  }

  getNombreTipo(idtipo: number): string {
    const tipo = this.tipos.find(t => t.idtipo === idtipo);
    return tipo ? tipo.nombre : 'Tipo no encontrado';
  }

  getNombreColor(idcolor: number): string {
    const color = this.colores.find(co => co.idcolor === idcolor);
    return color ? color.nombre : 'Color no encontrado';
  }




}
