import { EquiposPageModule } from './../../../equipos/equipos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiembrosEquipoPageRoutingModule } from './miembros-equipo-routing.module';

import { MiembrosEquipoPage } from './miembros-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiembrosEquipoPageRoutingModule,
    EquiposPageModule
  ],
  declarations: [MiembrosEquipoPage]
})
export class MiembrosEquipoPageModule {}
