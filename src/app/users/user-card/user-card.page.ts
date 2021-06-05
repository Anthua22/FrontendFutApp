import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/models';
import { UsersService } from '../services/users.service';
import { EditAvatarPage } from '../user-profile/edit-avatar/edit-avatar.page';
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
  @Output() delete = new EventEmitter<string>();
  constructor(private authService: AuthService, private alertController: AlertController,
    private modalController: ModalController, private userService: UsersService, private toast: ToastController) { }

  ngOnInit() {
    this.authService.userLogueado$.subscribe(x => this.userLogueado = x);
  }

  async editar() {
    const modal = await this.modalController.create({
      component: EditProfilePage,
      componentProps: { user: this.user },
    });

    await modal.present();

  }

  async changeAvatar() {
    const modal = await this.modalController.create({
      component: EditAvatarPage,
      componentProps: { user: this.user },
    });

    await modal.present();

  }

  async deleteUser() {
    const alert = await this.alertController.create({
      header: 'Confimación Borrado',
      message: 'Estas seguro de querer borrar a este Equipo? Los partidos en los que ha participado o vaya a participar también se borraran...',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.userService.deleteUser(this.user._id).subscribe(async x => {
              this.delete.emit(this.user._id);
              (await this.toast.create({
                duration: 3000,
                position: "bottom",
                message: `Se ha borrado al equipo usuario con éxito`,
                color: 'success'
              })).present();
            },
              async (error: HttpErrorResponse) => {
                (await this.toast.create({
                  duration: 3000,
                  position: "bottom",
                  message: error.message,
                  color: 'danger'
                })).present();
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }


}
