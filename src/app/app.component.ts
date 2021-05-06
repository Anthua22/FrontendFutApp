import { AuthService } from './auth/services/auth.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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

  constructor(private authService:AuthService,private nav: NavController) {
    this.authService.loginChange$.subscribe(logueado=>this.menuDisabled = !logueado);
  }

  async logout() {
    await this.authService.logout();
    this.nav.navigateRoot(['/auth/login']);
  }
}
