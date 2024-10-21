import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  cart: any[] = [];
  shippingCost: number = 0.00;
  customMessage: string = '';

  constructor(private router: Router ) {}


  ngOnInit(): void {
    this.loadCart();
  }

  continueShopping() {
    this.router.navigate(['/cobijas']); // Redirige a la ruta de "Cobijas"
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];

    // Asegurarse de que cada producto en el carrito tenga las propiedades tamaño y color
    this.cart = this.cart.map(item => ({
      ...item,
      quantity: item.quantity || 1,  // Si no tiene cantidad, inicializarla en 1
      tamano: item.tamano || 'No especificado',  // Asegurar que el tamaño esté presente
      color: item.color || 'No especificado'  // Asegurar que el color esté presente
    }));
  }

  removeFromCart(index: number, event: Event) {
    event.preventDefault(); // Evitar que el enlace redirija
    this.cart.splice(index, 1); // Remover el elemento del carrito
    this.updateCart(); // Actualizar el carrito en localStorage
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

  sendWhatsApp() {
    const phoneNumber = '573222731108'; // Reemplazar con el número de WhatsApp al que quieres enviar el mensaje
    let message = `Hola, quiero este producto con los siguientes detalles:%0A%0A`;

    this.cart.forEach((item) => {
      message += `🛒 *Producto:* ${item.titulo}%0A`;
      message += `📏 *Tamaño:* ${item.tamano}%0A`;
      message += `🛠️ *Tipo:* ${item.tipo}%0A`;
      message += `🎨 *Color:* ${item.color}%0A`;
      message += `📝 *Descripción:* ${item.descripcion}%0A`;
      message += `📦 *Cantidad:* ${item.quantity}%0A`;
      message += `💲 *Precio: * $${item.precio} %0A%0A`;
    });

    message += `💰 *Total:* $${this.getTotalCost()} %0A`;
    if (this.customMessage) {
      message += `%0A📝 *Detalles adicionales:* ${this.customMessage}%0A`;
    }

    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }


}
