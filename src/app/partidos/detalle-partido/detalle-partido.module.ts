import { SkeletonModule } from './../../skeleton/skeleton.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePartidoPageRoutingModule } from './detalle-partido-routing.module';

import { DetallePartidoPage } from './detalle-partido.page';
import { InfoPartidoComponent } from './info-partido/info-partido.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkeletonModule,
    DetallePartidoPageRoutingModule
  ],
  declarations: [DetallePartidoPage, InfoPartidoComponent]
})
export class DetallePartidoPageModule {}
