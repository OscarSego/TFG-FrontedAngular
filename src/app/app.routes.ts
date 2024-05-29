import { Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component"
import { SignInComponent } from "./components/sign-in/sign-in.component"
import { HomeComponent } from "./components/home/home.component"
import { ProductComponent } from "./components/product/product.component"
import { AuthGuard } from './services/authGuard';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { CarroComponent } from './components/carro/carro.component'
import { ContactoComponent } from './components/contacto/contacto.component';
import { PublicHomeComponent } from './public-home/public-home.component'
import { PublicContactoComponent } from './public-contacto/public-contacto.component';
import { PublicProductComponent } from './public-product/public-product.component';

export const routes: Routes = [
    { path: '', redirectTo: 'homePublic', pathMatch: 'full'},
    { path: 'homePublic', component: PublicHomeComponent},
    { path: 'ProductPublic', component: PublicProductComponent},
    { path: 'contactoPublic', component: PublicContactoComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signin', component: SignInComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'producto', component: ProductComponent, canActivate: [AuthGuard]},
    { path: 'product-search', component: SearchProductComponent, canActivate: [AuthGuard]},
    { path: 'carro-compra', component: CarroComponent, canActivate: [AuthGuard]},
    { path: 'contacto', component: ContactoComponent, canActivate: [AuthGuard]} 
];
