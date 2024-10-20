import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { BackendService } from "../Services/backend.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-termos',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './termos.component.html',
  styleUrl: './termos.component.css'
})
export class TermosComponent {

  productos: any[] = [];

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.cargarProductosDeCobijas();
  }

  cargarProductosDeCobijas() {
    this.backendService.getProductosPorCategoria('Termos') // Llamamos al servicio para obtener los productos de la categoría "Cobijas"
      .subscribe(
        (data: any) => {
          this.productos = data;  // Guardamos los productos obtenidos en la variable `productos`
        },
        (error) => {
          console.error('Error al cargar productos de la categoría Cobijas:', error);
        }
      );
  }

}
