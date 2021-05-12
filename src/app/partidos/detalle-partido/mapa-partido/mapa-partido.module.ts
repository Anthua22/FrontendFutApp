import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';



import { MapaPartidoPage } from './mapa-partido.page';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MapaPartidoPage
  },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMapboxGLModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapaPartidoPage]
})
export class MapaPartidoPageModule {}
