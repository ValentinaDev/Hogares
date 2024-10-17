import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) { }


  onUserIconClick() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
