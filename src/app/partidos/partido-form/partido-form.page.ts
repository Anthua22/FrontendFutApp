import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoService } from 'src/app/equipos/service/equipo.service';
import {
  Categoria,
  Equipo,
  Partido,
  PartidoAdd,
  User,
} from 'src/app/models/models';
import { UsersService } from 'src/app/users/services/users.service';
import { PartidosService } from '../services/partidos.service';
import { Plugins } from '@capacitor/core';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import * as moment from 'moment';
import { MapComponent } from 'ngx-mapbox-gl';
import { NavController, ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-partido-form',
  templateUrl: './partido-form.page.html',
  styleUrls: ['./partido-form.page.scss'],
})
export class PartidoFormPage implements OnInit, AfterViewInit {
  categorias: Categoria[] = [
    Categoria.PRIMERA,
    Categoria.SEGUNDA,
    Categoria.SEGUNDAB,
    Categoria.TERCERA,
    Categoria.REGIONAL,
    Categoria.FB,
  ];
  tittle = 'Crear un Partido';
  partido: Partido = {
    arbitro_principal: {
      nombre_completo: '',
      foto: '',
      rol: '',
      categoria: Categoria.SC,
    },
    arbitro_secundario: {
      nombre_completo: '',
      foto: '',
      rol: '',
      categoria: Categoria.SC,
    },
    cronometrador: {
      nombre_completo: '',
      foto: '',
      rol: '',
      categoria: Categoria.SC,
    },
    equipo_local: {
      nombre: '',
      categoria: Categoria.FB,
      escudo: '',
      email: '',
      direccion_campo: '',
    },
    equipo_visitante: {
      nombre: '',
      categoria: Categoria.FB,
      escudo: '',
      email: '',
      direccion_campo: '',
    },
    fecha_encuentro: new Date(),
    categoria: Categoria.SC,
    jornada: 0,
    lugar_encuentro: '',
  };

  partidoRest: PartidoAdd = {
    arbitro_principal: '',
    arbitro_secundario: '',
    equipo_local: '',
    equipo_visitante: '',
    categoria: Categoria.SC,
    fecha_encuentro: new Date(),
    jornada: 0,
    cronometrador: '',
    lugar_encuentro: '',
    ln: 0,
    lt: 0,
  };

  fechaActual = new Date().toISOString();

  categoriaDisabled = true;
  equipoVisitanteDisabled = true;
  arbitroSecundarioDisabled = true;
  equiposLocales: Equipo[];
  equiposVisitantes: Equipo[];
  arbitrosPrincipal: User[];
  arbitrosSecundario: User[];
  arbitrosCronometrador: User[];

  idLocal = '';

  lng = 90;
  lat = 50;

  @ViewChild(MapComponent) mapComp: MapComponent;

  constructor(
    private router: Router,
    private partidoService: PartidosService,
    private nav: NavController,
    private route: ActivatedRoute,
    private equipoService: EquipoService,
    private userService: UsersService,
    private toast: ToastController
  ) {}

  async ngOnInit() {
    this.equipoService.getEquipos().subscribe((x) => {
      this.equiposLocales = x;
      this.equiposVisitantes = x;
    });

    this.userService.getUsers().subscribe((x) => console.log(x));
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.lng = coordinates.coords.longitude;
    if (this.router.url.includes('edit')) {
      this.route.data.subscribe((x) => {
        this.partido = x.partido;
        this.idLocal = this.partido.equipo_local._id;
        this.obtnerCategoria();
        this.tittle = 'Editar Partido';
        this.fechaActual = new Date(this.partido.fecha_encuentro).toISOString();
        this.lat = this.partido.lt;
        this.lng = this.partido.ln;
        switch (this.partido.categoria) {
          case Categoria.PRIMERA:
            this.categoriaDisabled = false;
            this.equipoVisitanteDisabled = false;
            this.arbitroSecundarioDisabled = false;
            break;
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.mapComp.mapLoad.subscribe(() => {
      this.mapComp.mapInstance.resize(); // Necessary for full height
    });
  }

  obtnerCategoria() {
    this.equiposLocales = this.equiposLocales
      ? this.equiposLocales.filter(
          (x) => x.categoria === this.partido.categoria
        )
      : [];
    this.equiposVisitantes = this.equiposVisitantes
      ? this.equiposVisitantes.filter(
          (x) => x.categoria === this.partido.categoria
        )
      : [];
    this.categoriaDisabled = false;
    switch (this.partido.categoria) {
      case Categoria.PRIMERA:
        this.userService
          .getArbitrosCategoria(this.partido.categoria)
          .subscribe((x) => {
            this.arbitrosPrincipal = x;
            this.arbitrosSecundario = x;
          });
        this.userService
          .getArbitrosCategoria(Categoria.SEGUNDA)
          .subscribe((x) => {
            this.arbitrosCronometrador = x;
          });
        break;
      case Categoria.SEGUNDA:
        this.userService
          .getArbitrosCategoria(this.partido.categoria)
          .subscribe((x) => {
            this.arbitrosPrincipal = x;
            this.arbitrosSecundario = x;
          });
        this.userService
          .getArbitrosCategoria(Categoria.SEGUNDAB)
          .subscribe((x) => {
            this.arbitrosCronometrador = x;
          });
        break;
      case Categoria.SEGUNDAB:
        this.userService
          .getArbitrosCategoria(this.partido.categoria)
          .subscribe((x) => {
            this.arbitrosPrincipal = x;
            this.arbitrosSecundario = x;
          });
        this.userService
          .getArbitrosCategoria(Categoria.TERCERA)
          .subscribe((x) => {
            this.arbitrosCronometrador = x;
          });
        break;
      case Categoria.TERCERA:
        this.userService
          .getArbitrosCategoria(this.partido.categoria)
          .subscribe((x) => {
            this.arbitrosPrincipal = x;
            this.arbitrosSecundario = x;
          });
        this.userService
          .getArbitrosCategoria(Categoria.REGIONAL)
          .subscribe((x) => {
            this.arbitrosCronometrador = x;
          });
      case Categoria.REGIONAL:
        this.partido.arbitro_secundario = null;
        this.userService
          .getArbitrosCategoria(this.partido.categoria)
          .subscribe((x) => {
            this.arbitrosPrincipal = x;
          });
        this.userService
          .getArbitrosCategoria(Categoria.TERCERA)
          .subscribe((x) => {
            this.arbitrosCronometrador = x;
          });
      default:
        this.partido.arbitro_secundario = null;
        this.partido.cronometrador = null;
        this.userService
          .getArbitrosCategoria(this.partido.categoria)
          .subscribe((x) => {
            this.arbitrosPrincipal = x;
          });
    }
  }

  arbitroElegido() {
    this.arbitrosSecundario = this.arbitrosSecundario
      ? this.arbitrosSecundario.filter(
          (x) => x._id !== this.partido.arbitro_principal._id
        )
      : [];
    this.arbitroSecundarioDisabled = false;
  }

  habilitarVisitantes() {
    this.partido.equipo_local = this.equiposLocales.find(
      (x) => x._id === this.idLocal
    );
    this.equiposVisitantes = this.equiposVisitantes
      ? this.equiposVisitantes.filter(
          (x) => x._id !== this.partido.equipo_local._id
        )
      : [];
    this.equipoVisitanteDisabled = false;
    this.partido.equipo_local = this.equiposLocales.find(
      (x) => x._id === this.partido.equipo_local._id
    );
    if (this.router.url.includes('add')) {
      this.partido.lugar_encuentro = this.partido.equipo_local.direccion_campo;
    }

    this.lat = this.partido.equipo_local.lt;
    this.lng = this.partido.equipo_local.ln;
  }

  getLugarCampo(result: Result) {
    this.lat = result.geometry.coordinates[1];
    this.lng = result.geometry.coordinates[0];
    this.partido.lugar_encuentro = result.place_name;
  }
  obtenerFecha(event) {
    this.partido.fecha_encuentro = new Date(event.detail.value);
  }

  private asignarData() {
    this.partido.equipo_local = this.equiposLocales.find(
      (x) => x._id === this.idLocal
    );
    this.partido.arbitro_principal = this.arbitrosPrincipal.find(
      (x) => x._id === this.partido.arbitro_principal._id
    );
    this.partidoRest.arbitro_principal = this.partido.arbitro_principal._id;
    this.partido.arbitro_secundario = this.arbitrosSecundario.find(
      (x) => x._id === this.partido.arbitro_secundario._id
    );
    this.partidoRest.arbitro_secundario = this.partido.arbitro_secundario._id;
    this.partido.cronometrador = this.arbitrosCronometrador.find(
      (x) => x._id === this.partido.cronometrador._id
    );
    this.partidoRest.cronometrador = this.partido.cronometrador._id;
    this.partido.equipo_local = this.equiposLocales.find(
      (x) => x._id === this.partido.equipo_local._id
    );
    this.partidoRest.equipo_local = this.partido.equipo_local._id;
    this.partido.equipo_visitante = this.equiposVisitantes.find(
      (x) => x._id === this.partido.equipo_visitante._id
    );
    this.partidoRest.equipo_visitante = this.partido.equipo_visitante._id;
    this.partidoRest.lt = this.lat;
    this.partidoRest.ln = this.lng;
    this.partidoRest.categoria = this.partido.categoria;
    this.partidoRest.fecha_encuentro = this.partido.fecha_encuentro;
    this.partidoRest.lugar_encuentro = this.partido.lugar_encuentro;
    this.partidoRest.jornada = this.partido.jornada;
  }
  save() {
    this.asignarData();
    if (this.router.url.includes('edit')) {
      this.partidoRest._id = this.partido._id;
      this.partidoService.updatePartido(this.partidoRest).subscribe(
        async (x) => {
          this.nav.navigateRoot(['/auth/login']);
          this.partidoService.sendEmail(this.partido).subscribe(
            async () => {
              (
                await this.toast.create({
                  duration: 3000,
                  position: 'bottom',
                  message: 'Partido creado correctamente',
                  color: 'success',
                })
              ).present();
            },
            async (error: HttpErrorResponse) => {
              (
                await this.toast.create({
                  duration: 3000,
                  position: 'bottom',
                  message:
                    'No se ha podido mandar el correo de asingación del partido',
                  color: 'danger',
                })
              ).present();
            }
          );
        },
        async (error: HttpErrorResponse) => {
          (
            await this.toast.create({
              duration: 3000,
              position: 'bottom',
              message: error.message,
              color: 'danger',
            })
          ).present();
        }
      );
    } else {
      this.partidoService.addPartido(this.partidoRest).subscribe(
        (x) => {
          this.nav.navigateRoot(['/auth/login']);
          this.partidoService.sendEmail(this.partido).subscribe(
            async () => {
              (
                await this.toast.create({
                  duration: 3000,
                  position: 'bottom',
                  message: 'Partido creado correctamente',
                  color: 'success',
                })
              ).present();
            },
            async (error: HttpErrorResponse) => {
              (
                await this.toast.create({
                  duration: 3000,
                  position: 'bottom',
                  message:
                    'No se ha podido mandar el correo de asingación del partido',
                  color: 'danger',
                })
              ).present();
            }
          );
        },
        async (error: HttpErrorResponse) => {
          (
            await this.toast.create({
              duration: 3000,
              position: 'bottom',
              message: error.message,
              color: 'danger',
            })
          ).present();
        }
      );
    }
  }
}
