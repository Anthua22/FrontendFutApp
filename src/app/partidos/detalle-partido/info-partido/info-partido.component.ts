import { Categoria } from './../../../models/models';
import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Partido } from 'src/app/models/models';
import { DetallePartidoPage } from '../detalle-partido.page';
import * as moment from 'moment';

@Component({
  selector: 'app-info-partido',
  templateUrl: './info-partido.component.html',
  styleUrls: ['./info-partido.component.scss'],
})
export class InfoPartidoComponent implements OnInit {

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
    categoria: '',
    jornada: 0,
    lugar_encuentro: ''

  };

  constructor(@Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage, private nav: NavController) { }

  ngOnInit() {
    this.parentComponent.partido$.subscribe(
      partido => {
        this.partido = partido
        console.log(this.partido);
      }
    );


  }
}
