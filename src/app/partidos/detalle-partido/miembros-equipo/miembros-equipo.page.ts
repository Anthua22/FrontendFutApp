import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Partido, MiembroEquipo, Equipo } from 'src/app/models/models';
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
  numeroTitLocales = 0;
  numeroSuplLocales = 0;
  numeroTitVisitantes = 0;
  numeroSuplVisitantes = 0;

  constructor(
    @Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage,
    private router: Router
  ) {}

  ngOnInit() {
    this.parentComponent.partido$.subscribe((x) => {
      this.partido = x;
      if (this.router.url.includes('jugadores')) {
        this.locales = this.partido.equipo_local.miembros.filter(
          (miembro) => miembro.rol === 'JUGADOR'
        );
        this.visitantes = this.partido.equipo_visitante.miembros.filter(
          (miembro) => miembro.rol === 'JUGADOR'
        );
      } else {
        this.vistaJugadores = false;
        this.locales = this.partido.equipo_local.miembros.filter(
          (miembro) =>
            miembro.rol === 'ENTRENADOR' ||
            miembro.rol === 'DELEGADO' ||
            miembro.rol === 'ENCARGADO_MATERIAL' ||
            miembro.rol === 'PREPARADOR_FISICO'
        );
        this.visitantes = this.partido.equipo_visitante.miembros.filter(
          (miembro) =>
            miembro.rol === 'ENTRENADOR' ||
            miembro.rol === 'DELEGADO' ||
            miembro.rol === 'ENCARGADO_MATERIAL' ||
            miembro.rol === 'PREPARADOR_FISICO'
        );
      }
    });
  }

  obtenerDatosMiembro(miembro: MiembroEquipo) {
    console.log(miembro)
    if (miembro.titular === true) {
      if (this.checkJugadorEquipo(miembro, this.partido.equipo_local)) {
        if (this.checkNumTit(this.numeroTitLocales + 1)) {
          this.numeroTitLocales++;
        }
      } else {
        if (this.checkNumTit(this.numeroTitVisitantes + 1)) {
          this.numeroTitVisitantes++;
        }
      }
    } else if (miembro.suplente === true) {
      if (this.checkJugadorEquipo(miembro, this.partido.equipo_local)) {
        this.numeroSuplLocales++;
      } else {
        console.log('hola')
        this.numeroSuplVisitantes++;
      }
    }
  }

  private checkNumTit(numero: number): boolean {
    return numero <= 5;
  }

  private checkJugadorEquipo(
    miembro: MiembroEquipo,
    equipo: Equipo
  ): MiembroEquipo {
    return equipo.miembros.find(
      (x) =>
        x.nombre_completo === miembro.nombre_completo && x._id === miembro._id
    );
  }
}
