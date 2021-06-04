import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolverService } from './services/user-resolver.service';
import { UsersListPage } from './users-list/users-list.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./users-list/users-list.module').then(m => m.UsersListPageModule)
  },
  
  {
    path: 'me',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfilePageModule),
    resolve: {
      user: UserResolverService
    }
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule),
    resolve: {
      user: UserResolverService
    }
  }



];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule { }
