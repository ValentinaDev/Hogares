import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HogaresInmaculada';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para manejar el clic en el icono de usuario
  onUserIconClick() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
