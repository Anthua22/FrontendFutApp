import { Auth } from './../../models/models';
import { AuthService } from './../services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  auth: Auth = {
    email: '',
    password: ''
  };

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  // Seleccionamos el elemento con el nombre que le pusimos con el #
  passwordTypeInput = 'password';

  constructor(private authServie: AuthService, private toast: ToastController, private nav: NavController) { }

  ngOnInit() {
  }

  login() {
    this.authServie.login(this.auth).subscribe(
      () => {
        this.nav.navigateRoot(['/partidos']);
      },
      async (error: HttpErrorResponse) => {
        if (error.status === 401) {
          (await this.toast.create({
            duration: 3000,
            position: "bottom",
            message: 'Email o contraseña erróneos',
            color: 'danger'
          })).present();
        }

      }
    );
  }

  togglePasswordMode() {
    //cambiar tipo input
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    //obtener el input
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    //obtener el indice de la posición del texto actual en el input
    const inputSelection = nativeEl.selectionStart;
    //ejecuto el focus al input
    nativeEl.focus();
    //espero un milisegundo y actualizo la posición del indice del texto
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);

  }
}
