import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Partido, Categoria } from 'src/app/models/models';
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
