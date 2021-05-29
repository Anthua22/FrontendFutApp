import { User } from './models/models';
import { UsersService } from './users/services/users.service';
import { AuthService } from './auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  menuDisabled = true;
  public appPages = [
    {
      title: 'Product list',
      url: '/products',
      icon: 'home'
    },
    {
      title: 'Add product',
      url: '/products/add',
      icon: 'add-circle'
    },
    {
      title: 'My profile',
      url: '/users/me',
      icon: 'person'
    }
  ];

  usuarioLogueado: User = {
    nombre_completo: '',
    foto: '',
  }
  usuarioLogueado$: Observable<User>;


  constructor(private authService: AuthService, private nav: NavController, private userService: UsersService) {
    this.authService.loginChange$.subscribe(logueado => this.menuDisabled = !logueado);
    this.usuarioLogueado$ = this.userService.getMyProfile().pipe(shareReplay(1));
  }
  ngOnInit(): void {
    this.usuarioLogueado$.subscribe(
      user => this.usuarioLogueado = user
    )
  }

  async logout() {
    await this.authService.logout();
    this.nav.navigateRoot(['/auth/login']);
  }
}
