import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  passwordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  // Método para iniciar sesión
  signIn() {
    const user = { email: this.email, password: this.password };

    this.authService.login(user).subscribe(
      (response: any) => {
        // Guardar el token JWT
        this.authService.setToken(response.token);

        // Obtener el URL de retorno de los queryParams o redirigir al /user por defecto
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
        this.router.navigate([returnUrl]);
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }

}
