import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Partido, MiembroEquipo } from 'src/app/models/models';
import { DetallePartidoPage } from '../detalle-partido.page';

@Component({
  selector: 'app-miembros-equipo',
  templateUrl: './miembros-equipo.page.html',
  styleUrls: ['./miembros-equipo.page.scss'],
})
export class MiembrosEquipoPage implements OnInit {
  partido: Partido;
  locales: MiembroEquipo[] = [];
  visitantes: MiembroEquipo[] = [];
  type = 'locales';
  vistaJugadores = true;

  constructor(@Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage, private router: Router) { }

  ngOnInit() {
    this.parentComponent.partido$.subscribe(x => {
      this.partido = x;
      if (this.router.url.includes('jugadores')) {
        this.locales = this.partido.equipo_local.miembros.filter(miembro => miembro.rol === 'JUGADOR');
        this.visitantes = this.partido.equipo_visitante.miembros.filter(miembro => miembro.rol === 'JUGADOR');
      } else {
        this.vistaJugadores = false;
        this.locales = this.partido.equipo_local.miembros.filter(miembro => miembro.rol === 'ENTRENADOR' || miembro.rol === 'DELEGADO' || miembro.rol === 'ENCARGADO_MATERIAL' || miembro.rol === 'PREPARADOR_FISICO');
        this.visitantes = this.partido.equipo_visitante.miembros.filter(miembro => miembro.rol === 'ENTRENADOR' || miembro.rol === 'DELEGADO' || miembro.rol === 'ENCARGADO_MATERIAL' || miembro.rol === 'PREPARADOR_FISICO');
      }

    });

  }


}
