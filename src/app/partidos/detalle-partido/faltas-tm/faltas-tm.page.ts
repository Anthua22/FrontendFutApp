import { Categoria, Partido } from 'src/app/models/models';
import { Component, Inject, OnInit } from '@angular/core';
import { DetallePartidoPage } from '../detalle-partido.page';

@Component({
  selector: 'app-faltas-tm',
  templateUrl: './faltas-tm.page.html',
  styleUrls: ['./faltas-tm.page.scss'],
})
export class FaltasTMPage implements OnInit {
  type = 'locales';
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
  constructor(@Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage) { }

  ngOnInit() {
    this.parentComponent.partido$.subscribe(
      partido => {
        this.partido = partido;
        this.partido.equipo_local.numeroFaltasPrimeraParte = this.partido.equipo_local.numeroFaltasPrimeraParte ? this.partido.equipo_local.numeroFaltasPrimeraParte : 0;
        this.partido.equipo_local.numeroFaltasSegundaParte = this.partido.equipo_local.numeroFaltasSegundaParte ? this.partido.equipo_local.numeroFaltasSegundaParte : 0;
        this.partido.equipo_visitante.numeroFaltasPrimeraParte = this.partido.equipo_visitante.numeroFaltasPrimeraParte ? this.partido.equipo_visitante.numeroFaltasPrimeraParte : 0;
        this.partido.equipo_visitante.numeroFaltasSegundaParte = this.partido.equipo_visitante.numeroFaltasSegundaParte ? this.partido.equipo_visitante.numeroFaltasSegundaParte : 0;
      }
    );
  }

}
