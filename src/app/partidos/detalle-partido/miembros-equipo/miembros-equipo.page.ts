import { PartidosService } from './../../services/partidos.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Partido, MiembroEquipo, Equipo, Categoria } from 'src/app/models/models';
import { DetallePartidoPage } from '../detalle-partido.page';

@Component({
  selector: 'app-miembros-equipo',
  templateUrl: './miembros-equipo.page.html',
  styleUrls: ['./miembros-equipo.page.scss'],
})
export class MiembrosEquipoPage implements OnInit {
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
  locales: MiembroEquipo[] = [];
  visitantes: MiembroEquipo[] = [];
  type = 'locales';
  vistaJugadores = true;
  numeroPortLocales = 0;
  numeroPortVisitantes = 0;
  numeroCapitanLocales = 0;
  numeroCapitanVisitantes = 0;

  constructor(
    @Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage,
    private router: Router, private partidoService: PartidosService
  ) { }

  ngOnInit() {
    this.partido.suplentesLocales = [];
    this.partido.suplentesVisitantes = [];
    this.partido.titularesLocales = [];
    this.partido.titularesVisitantes = [];
    this.parentComponent.partido$.subscribe((x) => {
      this.partido = x;
      if (this.router.url.includes('jugadores')) {
        this.locales = this.partido.equipo_local.miembros.filter(
          (miembro) => miembro.rol === 'JUGADOR'
        );
        this.visitantes = this.partido.equipo_visitante.miembros.filter(
          (miembro) => miembro.rol === 'JUGADOR'
        );
        this.obtenerCapitantesEncuentro();
        this.obtenerTitularesEncuentro();
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


  obtenerDatosMiembro() {
    this.countDatos();
  }

  obtenerCapitantesEncuentro() {
    this.partido.equipo_local.miembros.forEach(x => {
      if (x.rol === 'JUGADOR' && x._id === this.partido.capitanLocal._id) {
        x.capitan = true;
      }
    });

    this.partido.equipo_visitante.miembros.forEach(x => {
      if (x.rol === 'JUGADOR' && x._id === this.partido.capitanVisitante._id) {
        x.capitan = true;
      }
    });
  }

  obtenerTitularesEncuentro() {
    this.partido.equipo_local.miembros.forEach(x => {
      this.partido.titularesLocales.forEach(titu => {
        if (x._id === titu._id) {
          x.titular = true;
          x.dorsal = titu.dorsal;
        }
      });
    });
    this.partido.equipo_visitante.miembros.forEach(x => {
      this.partido.titularesVisitantes.forEach(titu => {
        if (x._id === titu._id) {
          x.titular = true;
          x.dorsal = titu.dorsal;
        }
      });
    });
  }

  private resetCampos() {
    this.partido.suplentesLocales = [];
    this.partido.suplentesVisitantes = [];
    this.partido.titularesLocales = [];
    this.partido.titularesVisitantes = [];
    this.numeroCapitanVisitantes = 0;
    this.numeroCapitanLocales = 0;
    this.partido.capitanLocal = this.partido.capitanLocal ? this.partido.capitanLocal : {
      nombre_completo: '',
      foto: '',
      sancionado: false
    };
    this.partido.capitanVisitante = this.partido.capitanVisitante ? this.partido.capitanVisitante : {
      nombre_completo: '',
      foto: '',
      sancionado: false
    };
    this.numeroPortLocales = 0;
    this.numeroPortVisitantes = 0;
  }

  private countDatos() {
    this.resetCampos();

    this.partido.equipo_local.miembros.forEach((x) => {
      if (x.titular === true) {
        console.log(x)
        this.partido.titularesLocales.push(x);
      } else if (x.suplente === true) {
        this.partido.suplentesLocales.push(x);
      }
      if (x.capitan === true) {
        this.partido.capitanLocal = x;
        this.numeroCapitanLocales++;
      }
      if (x.portero === true) {
        this.numeroPortLocales++;
      }
      if (x.sancion_partido) {
        x.sancion_partido.forEach(sancion => {
          sancion.jugador = x._id;
          this.partido.sanciones_jugadores.push(sancion);
        });
      }

    });

    this.partido.equipo_visitante.miembros.forEach(x => {
      if (x.titular === true) {
        this.partido.titularesVisitantes.push(x);
      } else if (x.suplente === true) {
        this.partido.suplentesVisitantes.push(x);
      }
      if (x.capitan === true) {
        this.partido.capitanVisitante = x;
        console.log(this.partido.capitanVisitante)
      }
      if (x.portero === true) {
        this.numeroPortVisitantes++;
      }
      if (x.sancion_partido) {
        x.sancion_partido.forEach(sancion => {
          sancion.jugador = x._id;
          this.partido.sanciones_jugadores.push(sancion);
        });
      }
    });


  }

  save() {
    console.log(this.partido);
    this.partidoService.savePartidoJugadores(this.partido).subscribe(x => {
      console.log(x);
    })
  }

}
