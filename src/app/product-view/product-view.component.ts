import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../Services/backend.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit {

  producto: any;
  cartMessage: string | null = null;
  tamanos: string[] = [];
  tipos: string[] = [];
  colores: string[] = [];
  selectedOptions = { tamano: '', tipo: '', color: '' }

  buttonText: string = 'AGREGAR AL CARRITO';



  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}


  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.backendService.getProductoById(productId).subscribe(
        (data: any) => {
          this.producto = data; // Asignar los datos del producto a la variable `producto`
        },
        (error) => {
          console.error('Error al cargar el producto:', error);
        }
      );
    }
  }



  loadProductOptions() {
    this.backendService.getTamanos().subscribe((sizes: string[]) => {
      this.tamanos = sizes;
    });

    this.backendService.getTipos().subscribe((types: string[]) => {
      this.tipos = types;
    });

    this.backendService.getColores().subscribe((colors: string[]) => {
      this.colores = colors;
    });
  }

  addToCart() {
    const cartItem = {
      ...this.producto,  // Incluye los detalles del producto
      quantity: 1  // Establecer la cantidad a 1 por defecto
    };

    // Obtener el carrito del localStorage (si no existe, iniciar un carrito vacío)
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Agregar el producto al carrito
    cart.push(cartItem);

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Cambiar el texto del botón a "Producto añadido"
    this.buttonText = 'PRODUCTO AÑADIDO CORRECTAMENTE';

    // Después de 2 segundos, volver al texto original
    setTimeout(() => {
      this.buttonText = 'AGREGAR AL CARRITO';
    }, 2000);
  }



}
