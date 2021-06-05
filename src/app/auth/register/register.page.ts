import { ErrorResponse } from './../../models/responses';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Categoria, User } from 'src/app/models/models';
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { NavController, ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
const { Camera } = Plugins;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = {
    email: '',
    password: '',
    rol: 'USER',
    nombre_completo:'',
    foto:'',
    categoria: Categoria.SC,
  }
  nombre = '';
  apellidos = '';
  password2 = '';

  constructor(private authService: AuthService, private toast: ToastController, private nav: NavController) { }

  ngOnInit() {
  }

  register() {
    this.user.nombre_completo = `${this.apellidos}-${this.nombre}`;
    this.authService.register(this.user).subscribe(
      async () => {
        this.nav.navigateRoot(["/auth/login"]);
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: "Usuario registrado correctamente",
          color: 'success'
        })).present();
      },
      async (err: HttpErrorResponse) => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: err.message,
          color: 'danger'
        })).present();
      }
    );

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
