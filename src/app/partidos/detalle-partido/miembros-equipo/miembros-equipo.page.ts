import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  numeroPortLocales = 0;
  numeroPortVisitantes = 0;
  numeroCapitanLocales = 0;
  numeroCapitanVisitantes = 0;

  constructor(
    @Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage,
    private router: Router
  ) { }

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

  obtenerDatosMiembro(confirmacion: any) {
    this.countDatos();

  }

  private countDatos() {
    this.numeroSuplLocales = 0;
    this.numeroTitLocales = 0;
    this.numeroSuplVisitantes = 0;
    this.numeroTitVisitantes = 0;
    this.numeroCapitanLocales = 0;
    this.numeroCapitanVisitantes = 0;
    this.numeroPortLocales = 0;
    this.numeroPortVisitantes = 0;
    this.partido.equipo_local.miembros.forEach((x) => {
      if (x.titular === true) {
        this.numeroTitLocales++;
      } else if (x.suplente === true) {
        this.numeroSuplLocales++;
      }
      if (x.capitan === true) {
        this.numeroCapitanLocales++;
      }
      if (x.portero === true) {
        this.numeroPortLocales++;
      }
    });

    this.partido.equipo_visitante.miembros.forEach(x => {
      if (x.titular === true) {
        this.numeroTitVisitantes++;
      } else if (x.suplente === true) {
        this.numeroSuplVisitantes++;
      }
      if (x.capitan === true) {
        this.numeroCapitanVisitantes++;
      }
      if (x.portero === true) {
        this.numeroPortVisitantes++;
      }
    });
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
