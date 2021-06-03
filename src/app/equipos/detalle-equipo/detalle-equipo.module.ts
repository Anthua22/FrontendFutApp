import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleEquipoPageRoutingModule } from './detalle-equipo-routing.module';

import { DetalleEquipoPage } from './detalle-equipo.page';
import { MiembroEquipoCardPageModule } from '../miembro-equipo-card/miembro-equipo-card.module';
import { PartidoCardPageModule } from 'src/app/partidos/partido-card/partido-card.module';
import { SkeletonModule } from 'src/app/skeleton/skeleton.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { EquipoCardPageModule } from '../equipo-card/equipo-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleEquipoPageRoutingModule,
    MiembroEquipoCardPageModule,
    PartidoCardPageModule,
    SkeletonModule,
    NgxMapboxGLModule,
    EquipoCardPageModule
  ],
  declarations: [DetalleEquipoPage]
})
export class DetalleEquipoPageModule {}
