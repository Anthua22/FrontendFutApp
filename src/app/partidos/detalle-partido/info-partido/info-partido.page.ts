import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Partido, Categoria, MiembroEquipo } from 'src/app/models/models';
import { DetallePartidoPage } from '../detalle-partido.page';

@Component({
  selector: 'app-info-partido',
  templateUrl: './info-partido.page.html',
  styleUrls: ['./info-partido.page.scss'],
})
export class InfoPartidoPage implements OnInit {
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
  delegadoLocal: MiembroEquipo = {
    nombre_completo: '',
    sancionado: false,
    foto: ''
  };
  delegadoVisitante: MiembroEquipo = {
    nombre_completo: '',
    sancionado: false,
    foto: ''
  };
  golesLocales = '0';
  golesVisitantes = '0';
  terminado = false;

  constructor(@Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage, private nav: NavController) { }

  ngOnInit() {
    this.parentComponent.partido$.subscribe(
      partido => {
        this.partido = partido;
        this.partido.equipo_local.miembros.forEach(x => {
          if (x.rol === 'DELEGADO') {
            this.delegadoLocal = x;
          }
        });
        this.partido.equipo_visitante.miembros.forEach(x => {
          if (x.rol === 'DELEGADO') {
            this.delegadoVisitante = x;
          }
        });
        this.terminado = partido.fecha_modificacion ? true : false;

      }
    );


  }

}
