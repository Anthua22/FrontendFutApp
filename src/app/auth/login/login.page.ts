import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email!: string;
  password!: string
  constructor(private authServie: AuthService, private toast: ToastController) { }

  ngOnInit() {
  }

  login() {
    this.authServie.login(this.email, this.password).subscribe(
      () => {
        console.log('hola Mundo')
      },
      async (error: HttpErrorResponse) => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: error.error.error,
          color: 'danger'
        })).present();
      }
    );
  }

}
