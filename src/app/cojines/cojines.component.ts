import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { BackendService } from "../Services/backend.service";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cojines',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './cojines.component.html',
  styleUrl: './cojines.component.css'
})
export class CojinesComponent {

  productos: any[] = [];

  constructor(private backendService: BackendService,
              private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductosDeCobijas();
  }

  cargarProductosDeCobijas() {
    this.backendService.getProductosPorCategoria('Cojines') // Llamamos al servicio para obtener los productos de la categoría "Cobijas"
      .subscribe(
        (data: any) => {
          this.productos = data;  // Guardamos los productos obtenidos en la variable `productos`
        },
        (error) => {
          console.error('Error al cargar productos de la categoría Cobijas:', error);
        }
      );
  }

  navegarAlProducto(idproducto: string) {
    if (idproducto) {
      this.router.navigate(['/product', idproducto]);
    } else {
      console.error('El ID del producto es indefinido');
    }
  }

}
