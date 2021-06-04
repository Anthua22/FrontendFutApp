import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partido, User } from 'src/app/models/models';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  user:User;
  type='partidos-nuevos';
  partidosNuevos:Partido[];
  partidosViejos:Partido[];
  constructor(private route: ActivatedRoute, private userService:UsersService) { }

  ngOnInit() {
    this.route.data.subscribe(x=>{
      this.user = x.user;
      this.userService.getPartidos(this.user._id).subscribe(partidos=>{
        this.partidosNuevos = partidos.filter(p=>!p.fecha_modificacion);
        this.partidosViejos = partidos.filter(p=>p.fecha_modificacion); 
      })

    });

  }

}
