import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiembroEquipoCardPage } from './miembro-equipo-card.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MiembroEquipoCardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiembroEquipoCardPage],
  exports:[MiembroEquipoCardPage]
})
export class MiembroEquipoCardPageModule {}
