import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/equipos/service/equipo.service';
import { Categoria, Equipo, Partido, User } from 'src/app/models/models';
import { UsersService } from 'src/app/users/services/users.service';
import { PartidosService } from '../services/partidos.service';

@Component({
  selector: 'app-partido-form',
  templateUrl: './partido-form.page.html',
  styleUrls: ['./partido-form.page.scss'],
})
export class PartidoFormPage implements OnInit {

  categorias: Categoria[] =
    [Categoria.PRIMERA, Categoria.SEGUNDA, Categoria.SEGUNDAB, Categoria.TERCERA,
    Categoria.REGIONAL, Categoria.FB];
  tittle = 'Crear un Partido';
  partido: Partido = {
    arbitro_principal: {
      nombre_completo: '',
      foto: '',
      rol: '',
      categoria: ''
    },
    equipo_local: {
      nombre: '',
      categoria: Categoria.FB,
      escudo: '',
      email: '',
      direccion_campo: ''
    },
    equipo_visitante: {
      nombre: '',
      categoria: Categoria.FB,
      escudo: '',
      email: '',
      direccion_campo: ''
    },
    fecha_encuentro: new Date(),
    categoria: Categoria.SC,
    jornada: 0,
    lugar_encuentro: ''


  };

  equipoLocalDisabled = true;
  equipoVisitanteDisabled = true;
  equiposLocales: Equipo[];
  equiposVisitantes: Equipo[];
  arbitrosPrincipal:User[];
  arbitrosSecundario:User[];
  arbitrosCronometrador:User[];

  constructor(private router: Router, private partidoService: PartidosService,
     private equipoService: EquipoService, private userService:UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(x=>console.log(x));
  }

  obtnerCategoria() {
    this.equipoService.getEquiposCategoria(this.partido.categoria).subscribe(x => {
      this.equiposLocales = x;
      this.equiposVisitantes = x;
      this.equipoLocalDisabled = false;
    });
    
  }

  habilitarVisitantes() {
    this.equiposVisitantes = this.equiposVisitantes.filter(x=>x._id !== this.partido.equipo_local._id);
    this.equipoVisitanteDisabled = false;
  }

}
