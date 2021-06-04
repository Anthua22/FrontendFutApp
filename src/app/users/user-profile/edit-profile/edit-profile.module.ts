import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { EditProfilePage } from './edit-profile.page';
import { RouterModule, Routes } from '@angular/router';
import { ValidatorsModule } from 'src/app/validators/validators.module';

const routes: Routes = [
  {
    path: '',
    component: EditProfilePage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidatorsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
