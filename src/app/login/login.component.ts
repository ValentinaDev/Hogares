import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  passwordFieldType: string = 'password';
  loginSuccess: boolean | null = null;
  buttonText: string = 'Sign In';

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

        // Cambiar el estado del botón
        this.loginSuccess = true;
        this.buttonText = 'Ingreso Exitoso';

        // Restablecer el botón después de 5 segundos
        setTimeout(() => this.resetButton(), 5000);

        // Obtener el URL de retorno de los queryParams o redirigir al /user por defecto
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
        this.router.navigate([returnUrl]);
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        // Cambiar el estado del botón en caso de error
        this.loginSuccess = false;
        this.buttonText = 'Email o Contraseña Incorrectos';

        // Restablecer el botón después de 5 segundos
        setTimeout(() => this.resetButton(), 5000);
      }
    );
  }

  // Método para restablecer el botón
  resetButton() {
    this.loginSuccess = null;
    this.buttonText = 'Sign In';
  }

  // Método que se ejecuta cuando el usuario cambia los valores de email o contraseña
  onInputChange() {
    if (this.loginSuccess !== null) {
      this.resetButton();  // Restablece el botón si hubo un intento previo de login
    }
  }

}
