import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  products: any[] = [];
  userName: string | null = null;

    // Variables para manejar la visibilidad de los diálogos
    displayNotifications: boolean = false;
    displayMessages: boolean = false;

    // Datos ficticios para las notificaciones y mensajes
    notifications = [];
    messages = [];


  constructor(
    private router: Router,
  ) {}

  getProductImage(imagePath: string):string {
    return imagePath;
  }

  goToComponentA() {
    this.router.navigate(['/userConfig']);
  }

  editarProducto(productId: string) {
    this.router.navigate(['/editProduct', productId]);
  }

  toggleNotifications() {
    this.displayNotifications = !this.displayNotifications;
  }

  toggleMessages() {
    this.displayMessages = !this.displayMessages;
  }
}

