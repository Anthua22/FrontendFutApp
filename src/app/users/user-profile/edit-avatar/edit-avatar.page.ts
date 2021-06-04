import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/models';
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { UsersService } from '../../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
const { Camera } = Plugins;
@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.page.html',
  styleUrls: ['./edit-avatar.page.scss'],
})
export class EditAvatarPage implements OnInit {
  @Input() user: User;
  fotoAntigua: string = '';
  constructor(private modalController: ModalController, private toast: ToastController, private userService: UsersService) { }

  ngOnInit() {
    this.fotoAntigua = this.user.foto;
  }

  changeAvatar() {
    if (this.fotoAntigua !== this.user.foto) {
      this.userService.updateAvatar(this.user.foto).subscribe(async () => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: `Se ha actualizado la foto del usuario correctamente`,
          color: 'success'
        })).present()
        this.modalController.dismiss(true);
      }, async (error: HttpErrorResponse) => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: error.message,
          color: 'danger'
        })).present()
      })
    }
  }

  cancel() {
    this.modalController.dismiss(false);
  }

  async tomarFoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.user.foto = photo.dataUrl;
  }

  async elegirFotoGaleria() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.user.foto = photo.dataUrl;
  }

}
