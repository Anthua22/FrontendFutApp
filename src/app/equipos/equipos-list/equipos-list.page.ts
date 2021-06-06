import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Equipo, User } from 'src/app/models/models';
import { EquipoService } from '../service/equipo.service';

@Component({
  selector: 'app-equipos-list',
  templateUrl: './equipos-list.page.html',
  styleUrls: ['./equipos-list.page.scss'],
})
export class EquiposListPage implements OnInit {
  data = false;
  equipos: Equipo[];
  equiposCopia: Equipo[];
  userLogueado:User = {
    'foto':'',
    'nombre_completo':'',
    'rol':''
  }
  constructor(private equipoService: EquipoService, private authService:AuthService) { }

  ngOnInit() {
    this.equipoService.getEquipos().subscribe(x => {
      this.equipos = x;
      this.equiposCopia = this.equipos;
      this.data = true
    });
    this.authService.userLogueado$.subscribe(x=>{
      this.userLogueado = x;
    })

  }

  filterItems(event) {
    let search: string = event.target.value;
    if (search && search.trim() !== '') {
      search = search.trim().toLowerCase();
      this.equipos = this.equipos
        .filter(i => i.nombre.toLowerCase().includes(search));
    } else {
      this.equipos = this.equiposCopia;
    }

  }

  deleteEquipo(id: string) {
    this.equipos = this.equipos.filter(x => x._id !== id);
    this.equiposCopia = this.equiposCopia.filter(x => x._id !== id);
  }
}
