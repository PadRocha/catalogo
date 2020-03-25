/*------------------------------------------------------------------*/
// Importar modulos del router de angular
/*------------------------------------------------------------------*/

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*------------------------------------------------------------------*/
// Importar guards
/*------------------------------------------------------------------*/

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

/*------------------------------------------------------------------*/
// Importar componentes
/*------------------------------------------------------------------*/

import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddKeyComponent } from './components/add-key/add-key.component';
import { EditImageComponent } from './components/edit-image/edit-image.component';

/*------------------------------------------------------------------*/
// Array de Rutas
/*------------------------------------------------------------------*/

const app: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home/:line', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'key', component: AddKeyComponent, canActivate: [AuthGuard] },
    { path: 'edit', component: EditImageComponent, canActivate: [AuthGuard] },
    { path: '**', component: ErrorComponent }
];

/*------------------------------------------------------------------*/
// Exportar el Modulo
/*------------------------------------------------------------------*/

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(app);