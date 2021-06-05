import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Categoria, User } from 'src/app/models/models';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  @Input() user: User;

  name = '';
  apellidos = '';
  userLogueado: User;
  passantigua = '';
  passnueva = '';
  passrepeat = '';
  roles = ['ADMIN', 'USER'];
  categorias: Categoria[] =
    [Categoria.PRIMERA, Categoria.SEGUNDA, Categoria.SEGUNDAB, Categoria.TERCERA,
    Categoria.REGIONAL, Categoria.FB]

  constructor(private modalController: ModalController, private userService: UsersService, private authService: AuthService,
    private toast: ToastController) { }

  ngOnInit() {
    this.authService.userLogueado$.subscribe(x => this.userLogueado = x);
    this.name = this.user.nombre_completo.split('-').length > 1 ? this.user.nombre_completo.split('-')[0] : this.user.nombre_completo.split(' ')[0];
    this.apellidos = this.user.nombre_completo.split('-').length > 1 ? this.user.nombre_completo.split('-')[1] : this.user.nombre_completo.split(' ')[1];
  }
  changeInfo() {
    this.user.nombre_completo = `${this.name}-${this.apellidos}`;
    if (this.userLogueado._id === this.user._id) {
      this.userService.updateInfo(this.user).subscribe(async x => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: `Se ha actualizado correctamente al usuario`,
          color: 'success'
        })).present()
        this.modalController.dismiss(true);
      },
        async (error: HttpErrorResponse) => {
          (await this.toast.create({
            duration: 3000,
            position: "bottom",
            message: error.message,
            color: 'danger'
          })).present()
        })
    } else {
      this.userService.updateInfo(this.user, this.user._id).subscribe(x => {
        this.modalController.dismiss(true);
      })
    }
  }

  cancel() {
    this.modalController.dismiss(false);
  }

  updatePass() {
    if (this.userLogueado._id === this.user._id) {
      this.authService.validatePassword(this.passantigua, this.user.password).subscribe(async x => {
        if (x) {

          this.userService.updatePassword(this.passnueva).subscribe(async resp => {
            (await this.toast.create({
              duration: 3000,
              position: "bottom",
              message: `Se ha cambiado exitósamente la contraseña`,
              color: 'success'
            })).present();
            this.modalController.dismiss(true);
          },
            async (error: HttpErrorResponse) => {
              (await this.toast.create({
                duration: 3000,
                position: "bottom",
                message: error.message,
                color: 'danger'
              })).present()
            }
          )
        } else {
          (await this.toast.create({
            duration: 3000,
            position: "bottom",
            message: `La contraseña no coincide con la actual`,
            color: 'danger'
          })).present()
        }
      })
    } else {
      this.userService.updatePassword(this.passnueva, this.user._id).subscribe(async resp => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: `Se ha cambiado exitósamente la contraseña`,
          color: 'success'
        })).present();
        this.modalController.dismiss(true);
      },
        async (error: HttpErrorResponse) => {
          (await this.toast.create({
            duration: 3000,
            position: "bottom",
            message: error.message,
            color: 'danger'
          })).present()
        }
      )

    }
  }
}
