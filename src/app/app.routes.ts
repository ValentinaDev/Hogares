import { Routes } from '@angular/router';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import { CobijasComponent } from './cobijas/cobijas.component';
import { CojinesComponent } from './cojines/cojines.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { OtrosproductosComponent } from './otrosproductos/otrosproductos.component';
import { TermosComponent } from './termos/termos.component';
import { VivetufeComponent } from './vivetufe/vivetufe.component';
import { EmpezarComponent } from './empezar/empezar.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';


export const routes: Routes = [
    { path: '', component: MainpageComponent }, // Ruta principal
  { path: 'accesorios', component: AccesoriosComponent }, // Ruta para Accesorios
  { path: 'cobijas', component: CobijasComponent }, // Ruta para Cobijas
  { path: 'cojines', component: CojinesComponent }, // Ruta para Cojines
  { path: 'nosotros', component: NosotrosComponent }, // Ruta para Nosotros
  { path: 'otros-productos', component: OtrosproductosComponent }, // Ruta para Otros Productos
  { path: 'termos', component: TermosComponent }, // Ruta para Termos
  { path: 'vive-tu-fe', component: VivetufeComponent }, // Ruta para Vive tu Fe
  {path: 'empezar', component: EmpezarComponent},
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent}
];
