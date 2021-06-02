
import { PipesModule } from './../pipes/pipes.module';
import { MiembroEquipoCardComponent } from './miembro-equipo-card/miembro-equipo-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquiposPageRoutingModule } from './equipos-routing.module';


import { AccionesMiembroPageModule } from '../partidos/detalle-partido/miembros-equipo/acciones-miembro/acciones-miembro.module';
import { EquiposCardComponent } from './equipos-card/equipos-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    EquiposPageRoutingModule,
    AccionesMiembroPageModule,
  ],
  declarations: [ MiembroEquipoCardComponent, EquiposCardComponent],
  exports:[MiembroEquipoCardComponent]
})
export class EquiposPageModule {}
