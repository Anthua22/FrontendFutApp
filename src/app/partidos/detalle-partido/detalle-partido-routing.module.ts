
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
      { path: '', pathMatch: 'full', redirectTo: 'info' }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallePartidoPageRoutingModule {}
