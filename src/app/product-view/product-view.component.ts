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

  addToCart() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(this.producto);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mostrar el mensaje de confirmación
    this.cartMessage = 'Producto añadido correctamente al carrito';

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      this.cartMessage = null;
    }, 2000);
  }

}
