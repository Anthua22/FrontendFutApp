import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePageRoutingModule } from './user-profile-routing.module';

import { UserProfilePage } from './user-profile.page';
import { UserCardPageModule } from '../user-card/user-card.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PartidoCardPageModule } from 'src/app/partidos/partido-card/partido-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilePageRoutingModule,
    UserCardPageModule,
    PipesModule,
    PartidoCardPageModule
  ],
  declarations: [UserProfilePage]
})
export class UserProfilePageModule {}
