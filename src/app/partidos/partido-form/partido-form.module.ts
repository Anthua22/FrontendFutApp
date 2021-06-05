import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { PartidoFormPage } from './partido-form.page';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

const routes: Routes = [
  {
    path: '',
    component: PartidoFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    NgxMapboxGLModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PartidoFormPage]
})
export class PartidoFormPageModule {}
