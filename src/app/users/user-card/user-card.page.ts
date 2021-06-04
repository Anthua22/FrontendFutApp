import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/models';
import { EditProfilePage } from '../user-profile/edit-profile/edit-profile.page';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.page.html',
  styleUrls: ['./user-card.page.scss'],
})
export class UserCardPage implements OnInit {
  @Input() user: User = {
    'foto': '',
    '_id': '',
    'nombre_completo': ''
  }
  userLogueado: User;
  constructor(private authService: AuthService, private modalController: ModalController) { }

  ngOnInit() {
    this.authService.userLogueado$.subscribe(x => this.userLogueado = x);
  }

  async editar() {
    const modal = await this.modalController.create({
      component: EditProfilePage,
      componentProps: { user: this.user },
    });

    await modal.present();
    const result = await modal.onDidDismiss();
    

  }



}
