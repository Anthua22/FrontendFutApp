
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquiposPageRoutingModule } from './equipos-routing.module';


import { AccionesMiembroPageModule } from '../partidos/detalle-partido/miembros-equipo/acciones-miembro/acciones-miembro.module';
import { EquiposListPage } from './equipos-list/equipos-list.page';
import { SkeletonModule } from '../skeleton/skeleton.module';
import { PartidosPageModule } from '../partidos/partidos.module';
import { EquipoCardPageModule } from './equipo-card/equipo-card.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkeletonModule,
    EquiposPageRoutingModule,
    AccionesMiembroPageModule,
    EquipoCardPageModule
  ],
  declarations: [ EquiposListPage]

})
export class EquiposPageModule { }
