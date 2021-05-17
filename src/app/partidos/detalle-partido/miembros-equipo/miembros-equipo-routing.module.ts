import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiembrosEquipoPage } from './miembros-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: MiembrosEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiembrosEquipoPageRoutingModule {}
