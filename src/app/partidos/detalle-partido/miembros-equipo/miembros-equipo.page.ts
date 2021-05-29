import { PartidosService } from './../../services/partidos.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Partido, MiembroEquipo, Categoria } from 'src/app/models/models';
import { DetallePartidoPage } from '../detalle-partido.page';
import { HttpErrorResponse } from '@angular/common/http';

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
  numeroCapitanLocales = 0;
  numeroCapitanVisitantes = 0;

  constructor(
    @Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage,
    private router: Router, private partidoService: PartidosService, private toast: ToastController
  ) { }

  ngOnInit() {
    this.resetCampos();
    this.parentComponent.partido$.subscribe((x) => {
      this.partido = x;
      console.log(this.partido)
      if (this.router.url.includes('jugadores')) {
        this.locales = this.partido.equipo_local.miembros.filter(
          (miembro) => miembro.rol === 'JUGADOR'
        );
        this.visitantes = this.partido.equipo_visitante.miembros.filter(
          (miembro) => miembro.rol === 'JUGADOR'
        );
        this.obtenerCapitantesEncuentro();
        this.obtenerTitularesEncuentro();
        this.obtenerSuplentesEncuentro();
        this.obtenerPorterosEncuentro();
        this.obtenerSancionesJugadores();
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
        this.partido.staffLocal = this.partido.staffLocal ? this.partido.staffLocal : [];
        this.partido.staffVistante = this.partido.staffVistante ? this.partido.staffVistante : [];
        this.obtenerStaffsEncuentro();
        this.obtenerSancionesStaffs();
      }
    });
  }


  obtenerDatosMiembro() {
    this.countDatos();
  }

  private obtenerCapitantesEncuentro() {
    this.partido.equipo_local.miembros.forEach(x => {
      if (x.rol === 'JUGADOR' && x._id === this.partido.capitanLocal._id) {
        x.capitan = true;
        this.numeroCapitanLocales++;
      }
    });

    this.partido.equipo_visitante.miembros.forEach(x => {
      if (x.rol === 'JUGADOR' && x._id === this.partido.capitanVisitante._id) {
        x.capitan = true;
        this.numeroCapitanVisitantes++;
      }
    });
  }

  private obtenerTitularesEncuentro() {
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

  private obtenerSuplentesEncuentro() {
    this.partido.equipo_local.miembros.forEach(x => {
      this.partido.suplentesLocales.forEach(titu => {
        if (x._id === titu._id) {
          x.suplente = true;
          x.dorsal = titu.dorsal;
        }
      });
    });
    this.partido.equipo_visitante.miembros.forEach(x => {
      this.partido.suplentesVisitantes.forEach(titu => {
        if (x._id === titu._id) {
          x.dorsal = titu.dorsal;
          x.suplente = true;
        }
      });
    });
  }

  private obtenerPorterosEncuentro() {
    this.partido.equipo_local.miembros.forEach(x => {
      this.partido.porterosLocales.forEach(por => {
        if (x._id === por._id) {
          x.portero = true;
        }
      });
    });
    this.partido.equipo_visitante.miembros.forEach(x => {
      this.partido.porterosVisitantes.forEach(por => {
        if (x._id === por._id) {
          x.portero = true;
        }
      });
    });
  }

  private obtenerSancionesJugadores() {
    this.partido.equipo_local.miembros.forEach(x => {
      x.sancion_partido = [];
      this.partido.sanciones_jugadores.forEach(sancion => {
        if (sancion.jugador === x._id) {
          x.sancion_partido.push(sancion);
        }
      })
    });

    this.partido.equipo_visitante.miembros.forEach(x => {
      x.sancion_partido = [];
      this.partido.sanciones_jugadores.forEach(sancion => {
        if (sancion.jugador === x._id) {
          x.sancion_partido.push(sancion);
        }
      })
    });
  }

  private obtenerSancionesStaffs() {
    this.partido.equipo_local.miembros.forEach(x => {
      if (x.rol !== 'JUGADOR') {
        x.sancion_partido = [];
        this.partido.sanciones_staff.forEach(sancion => {
          if (sancion.jugador === x._id) {
            x.sancion_partido.push(sancion);
          }
        });
      }
    });

    this.partido.equipo_visitante.miembros.forEach(x => {
      if (x.rol !== 'JUGADOR') {
        x.sancion_partido = [];
        this.partido.sanciones_staff.forEach(sancion => {
          if (sancion.jugador === x._id) {
            x.sancion_partido.push(sancion);
          }
        });
      }
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
    this.partido.porterosVisitantes = [];
    this.partido.porterosLocales = [];
  }

  private countDatos() {
    this.resetCampos();
    this.partido.equipo_local.miembros.forEach((x) => {
      if (x.titular === true) {
        this.partido.titularesLocales.push(x);
      } else if (x.suplente === true) {
        this.partido.suplentesLocales.push(x);
      }
      if (x.capitan === true) {
        this.partido.capitanLocal = x;
        this.numeroCapitanLocales++;
      }
      if (x.portero === true) {
        this.partido.porterosLocales.push(x);
      }
      if (x.sancion_partido && x.rol === 'JUGADOR') {
        x.sancion_partido.forEach(sancion => {
          sancion.jugador = x._id;
          this.partido.sanciones_jugadores.push(sancion);
        });
      }

      if (x.sancion_partido && x.rol !== 'JUGADOR') {
        x.sancion_partido.forEach(sancion => {
          sancion.jugador = x._id;
          this.partido.sanciones_staff.push(sancion);
        });
      }

      if (x.rol !== 'JUGADOR' && x.asiste === true) {
        this.partido.staffLocal.push(x);
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
      }
      if (x.portero === true) {
        this.partido.porterosVisitantes.push(x);
      }
      if (x.sancion_partido) {
        x.sancion_partido.forEach(sancion => {
          sancion.jugador = x._id;
          this.partido.sanciones_jugadores.push(sancion);
        });
      }
      if (x.rol !== 'JUGADOR' && x.asiste === true) {
        this.partido.staffVistante.push(x);
      }
    });


  }

  private obtenerStaffsEncuentro() {
    this.partido.equipo_local.miembros.forEach(x => {
      this.partido.staffLocal.forEach(staff => {
        if (staff._id === x._id) {
          x.asiste = true;
        }
      });
    });
    this.partido.equipo_visitante.miembros.forEach(x => {
      this.partido.staffVistante.forEach(staff => {
        if (staff._id === x._id) {
          x.asiste = true;
        }
      });
    });
  }

  save() {
    if (this.router.url.includes('/jugadores')) {
      this.partidoService.savePartidoJugadores(this.partido).subscribe(x => {
      },
        async (error: HttpErrorResponse) => {
          (await this.toast.create({
            duration: 3000,
            position: "bottom",
            message: error.message,
            color: 'danger'
          })).present();
        })
    } else {
      this.partidoService.savePartidoStaff(this.partido).subscribe(() => { },
        async (error: HttpErrorResponse) => {
          (await this.toast.create({
            duration: 3000,
            position: "bottom",
            message: error.message,
            color: 'danger'
          })).present();
        });
    }

  }


}
