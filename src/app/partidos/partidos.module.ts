import { EquiposPageModule } from './../equipos/equipos.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartidosPageRoutingModule } from './partidos-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { PipesModule } from '../pipes/pipes.module';
import { SkeletonModule } from '../skeleton/skeleton.module';
import { PartidosListPage } from './partidos-list/partidos-list.page';
import { PartidoCardPageModule } from './partido-card/partido-card.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkeletonModule,
    PartidosPageRoutingModule,
    PipesModule,
    NgxMapboxGLModule,
    EquiposPageModule,
    NgbDropdownModule,
    PartidoCardPageModule
  ],
  declarations: [PartidosListPage],

})
export class PartidosPageModule { }
