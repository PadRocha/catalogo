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
import { AddLineComponent } from './components/add-line/add-line.component';
import { EditKeyComponent } from './components/edit-key/edit-key.component';
import { EditLineComponent } from './components/edit-line/edit-line.component';
import { CreatePDFComponent } from './components/create-pdf/create-pdf.component';

/*------------------------------------------------------------------*/
// Array de Rutas
/*------------------------------------------------------------------*/

const app: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home/:line', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'key', component: AddKeyComponent, canActivate: [AuthGuard] },
    { path: 'line', component: AddLineComponent, canActivate: [AuthGuard] },
    {
        path: 'edit', children: [
            { path: 'line/:line', component: EditLineComponent, canActivate: [AuthGuard] },
            { path: 'key/:key', component: EditKeyComponent, canActivate: [AuthGuard] },
            { path: 'key/:key/image/:image', component: EditImageComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'pdf', component: CreatePDFComponent, canActivate: [AuthGuard] },
    { path: '**', component: ErrorComponent }
];

/*------------------------------------------------------------------*/
// Exportar el Modulo
/*------------------------------------------------------------------*/

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(app);