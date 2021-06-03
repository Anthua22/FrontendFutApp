import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquiposListPage } from './equipos-list/equipos-list.page';

const routes: Routes = [
  {
    path: '',
    component: EquiposListPage
  },
  {
    path: ':id',
    loadChildren: () => import('./detalle-equipo/detalle-equipo.module').then( m => m.DetalleEquipoPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./equipo-form/equipo-form.module').then( m => m.EquipoFormPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposPageRoutingModule {}
