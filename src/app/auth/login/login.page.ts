import { Auth } from './../../models/models';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  auth:Auth = {
    email:'',
    password:''
  };
  constructor(private authServie: AuthService, private toast:ToastController,  private nav: NavController) { }

  ngOnInit() {
  }

  login() {
    this.authServie.login(this.auth).subscribe(
      () => {
        this.nav.navigateRoot(['/partidos']);
      },
      async (error:HttpErrorResponse)=>{
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
