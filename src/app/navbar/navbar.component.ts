import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showSubmenu = false;

  constructor(private authService: AuthService, private router: Router) {}

  auth() {
    console.log('onUserIconClick disparado');
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleProductosSubmenu() {
    this.showSubmenu = !this.showSubmenu;  // Cambia el estado de visible/no visible
  }

  selectProducto(producto: string) {
    console.log(`Seleccionaste el producto: ${producto}`);
    // Puedes hacer la navegación aquí, como this.router.navigate(['/productos', producto]);
  }

  goToCart() {
    // Navegar al componente de carrito de compras
    this.router.navigate(['/shopping-cart']);
  }

}
