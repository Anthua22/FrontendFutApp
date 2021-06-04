import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfilePage } from './user-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'edit-avatar',
    loadChildren: () => import('./edit-avatar/edit-avatar.module').then( m => m.EditAvatarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfilePageRoutingModule {}
