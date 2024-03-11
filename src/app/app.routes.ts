import { Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component"
import { SignInComponent } from "./components/sign-in/sign-in.component"
import { HomeComponent } from "./components/home/home.component"
import { ProductComponent } from "./components/product/product.component"
import { AuthGuard } from './services/authGuard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'signin', component: SignInComponent},
    { path: 'home', component: HomeComponent},
    { path: 'producto', component: ProductComponent,}
];
