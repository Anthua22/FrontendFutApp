import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePartidoPage } from './detalle-partido.page';


const routes: Routes = [
  {
    path: '',
    component: DetallePartidoPage,
    children: [
      {
        path: 'info',
        loadChildren: () => import('./info-partido/info-partido.module').then(m => m.InfoPartidoPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./mapa-partido/mapa-partido.module').then(m => m.MapaPartidoPageModule)
      },
      {
        path: 'jugadores',
        loadChildren: () => import('./miembros-equipo/miembros-equipo.module').then(m => m.MiembrosEquipoPageModule)
      },
      {
        path: 'staff',
        loadChildren: () => import('./miembros-equipo/miembros-equipo.module').then(m => m.MiembrosEquipoPageModule)
      },
      {
        path: 'faltas-tm',
        loadChildren: () => import('./faltas-tm/faltas-tm.module').then(m => m.FaltasTMPageModule)
      },
      { path: '', pathMatch: 'full', redirectTo: 'info' }
    ],
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallePartidoPageRoutingModule { }
