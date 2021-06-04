import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartidosListPage } from './partidos-list/partidos-list.page';


const routes: Routes = [
  {
    path: '',
    component:PartidosListPage
  },

  {
    path: 'details/:id',
    loadChildren: ()=>import('./detalle-partido/detalle-partido.module').then(m=>m.DetallePartidoPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./partido-form/partido-form.module').then( m => m.PartidoFormPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidosPageRoutingModule {}
