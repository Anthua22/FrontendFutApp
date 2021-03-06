import { LogoutGuard } from './guards/logout.guard';
import { TokenGuard } from './guards/token.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'partidos',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule),
    canActivate:[LogoutGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
    canActivate:[TokenGuard]
  },
  {
    path: 'partidos',
    loadChildren: () => import('./partidos/partidos.module').then( m => m.PartidosPageModule),
    canActivate:[TokenGuard]
  },
  {
    path: 'equipos',
    loadChildren: () => import('./equipos/equipos.module').then( m => m.EquiposPageModule),
    canActivate:[TokenGuard]
  },
  { path: '**', redirectTo: 'partidos' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
