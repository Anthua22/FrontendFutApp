import { AuthService } from './../services/auth.service';
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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.user.nombre_completo = `${this.apellidos}-${this.nombre}`;
    this.authService.register(this.user).subscribe(()=>{
      console.log('registrado');
    })

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
