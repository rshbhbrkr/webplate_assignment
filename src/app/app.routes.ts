import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    {
        path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '', loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
                canActivate: [authGuard]
            },
            {
                path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
                canActivate: [authGuard]
            },
            {
                path: 'products', loadComponent: () => import('./product/product.component').then(m => m.ProductComponent),
                canActivate: [authGuard]
            }


        ],
        canActivate: [authGuard],
    }
];
