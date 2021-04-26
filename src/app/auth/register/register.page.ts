import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
const { Camera } = Plugins;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = {
    email: '',
    password:''
  }
  nombre = '';
  apellidos = '';
  password2 = '';

  constructor() { }

  ngOnInit() {
  }

  register() {

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

    this.user.avatar = photo.dataUrl;
  }

  async elegirFotoGaleria(){
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.user.avatar = photo.dataUrl;
  }

}
