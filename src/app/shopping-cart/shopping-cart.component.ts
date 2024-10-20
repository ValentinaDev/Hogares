import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  cart: any[] = [];
  shippingCost: number = 0.00;

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
  }


  // Remover un producto del carrito
  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.updateCart();
  }

  // Incrementar la cantidad del producto
  increaseQuantity(index: number) {
    this.cart[index].quantity++;
    this.updateCart();
  }

  // Disminuir la cantidad del producto
  decreaseQuantity(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
      this.updateCart();
    }
  }

  // Actualizar el carrito en localStorage
  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // Calcular el costo total de la compra
  getTotalCost() {
    const totalItemsCost = this.cart.reduce((total, item) => total + item.precio * item.quantity, 0);
    return totalItemsCost + this.shippingCost;
  }

}
