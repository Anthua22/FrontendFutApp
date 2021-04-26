import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email!:string;
  password!:string
  constructor(private authServie:AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authServie.login(this.email, this.password).subscribe(x=>{
      console.log('hola Mundo')
    });
  }

}
