import { MapaPartidoPage } from './mapa-partido/mapa-partido.page';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePartidoPage } from './detalle-partido.page';
import { InfoPartidoComponent } from './info-partido/info-partido.component';

const routes: Routes = [
  {
    path: '',
    component: DetallePartidoPage,
    children:[
      {
        path:'info',
        component: InfoPartidoComponent
      },
      {
        path:'map',
        loadChildren: () => import('./mapa-partido/mapa-partido.module').then( m => m.MapaPartidoPageModule)
      },
      { path: '', pathMatch: 'full', redirectTo: 'info' }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallePartidoPageRoutingModule {}
