import { TokenGuard } from './../guards/token.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartidosListPage } from './partidos-list/partidos-list.page';


const routes: Routes = [
  {
    path: '',
    component:PartidosListPage
  },

  {
    path: ':id',
    loadChildren: ()=>import('./detalle-partido/detalle-partido.module').then(m=>m.DetallePartidoPageModule)
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidosPageRoutingModule {}
