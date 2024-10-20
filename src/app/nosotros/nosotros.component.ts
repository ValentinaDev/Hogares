import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

  constructor(private router: Router) { }

  irProductos(){
    this.router.navigate(['/cobijas']);
  }

}
