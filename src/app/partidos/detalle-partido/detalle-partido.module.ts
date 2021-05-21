import { EquiposPageModule } from './../../equipos/equipos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePartidoPageRoutingModule } from './detalle-partido-routing.module';
import { SkeletonModule } from 'src/app/skeleton/skeleton.module';
import { DetallePartidoPage } from './detalle-partido.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkeletonModule,
    PipesModule,
    DetallePartidoPageRoutingModule
  ],
  declarations: [DetallePartidoPage]
})
export class DetallePartidoPageModule {}
