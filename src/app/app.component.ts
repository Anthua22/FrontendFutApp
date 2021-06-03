import { User } from './models/models';
import { UsersService } from './users/services/users.service';
import { AuthService } from './auth/services/auth.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuDisabled = true;
  public appPages = [
    {
      title: 'Partidos',
      url: '/partidos',
      icon: 'home'
    },
    {
      title: 'Equipos',
      url: '/equipos',
      icon: 'people'
    }, {
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

  

  constructor(private authService: AuthService, private nav: NavController, private userService: UsersService) {
    this.authService.loginChange$.subscribe(logueado => {
      this.menuDisabled = !logueado;
    });
    this.authService.userLogueado$.subscribe(x=>{
      this.usuarioLogueado = x
    });


  }
  

  async logout() {
    await this.authService.logout();
    this.nav.navigateRoot(['/auth/login']);
  }
}
