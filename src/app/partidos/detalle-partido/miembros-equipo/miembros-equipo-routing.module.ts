import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiembrosEquipoPage } from './miembros-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: MiembrosEquipoPage
  },
  {
    path: 'add-accion-miembro',
    loadChildren: () => import('./add-accion-miembro/add-accion-miembro.module').then( m => m.AddAccionMiembroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiembrosEquipoPageRoutingModule {}
