import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      // Redirigir al login si el usuario no está autenticado, pasando el URL de retorno
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    return true; // Permite el acceso si el usuario está autenticado
  }
}
