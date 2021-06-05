import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/equipos/service/equipo.service';
import { Categoria, Equipo, Partido, User } from 'src/app/models/models';
import { UsersService } from 'src/app/users/services/users.service';
import { PartidosService } from '../services/partidos.service';
import { Plugins } from '@capacitor/core';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import * as moment from 'moment';
import { MapComponent } from 'ngx-mapbox-gl';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-partido-form',
  templateUrl: './partido-form.page.html',
  styleUrls: ['./partido-form.page.scss'],
})
export class PartidoFormPage implements OnInit, AfterViewInit {

  categorias: Categoria[] =
    [Categoria.PRIMERA, Categoria.SEGUNDA, Categoria.SEGUNDAB, Categoria.TERCERA,
    Categoria.REGIONAL, Categoria.FB];
  tittle = 'Crear un Partido';
  partido: Partido = {
    arbitro_principal: {
      nombre_completo: '',
      foto: '',
      rol: '',
      categoria: Categoria.SC
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
    categoria: Categoria.SC,
    jornada: 0,
    lugar_encuentro: ''


  };



  fechaActual = moment();

  categoriaDisabled = true;
  equipoVisitanteDisabled = true;
  arbitroSecundarioDisabled = true;
  equiposLocales: Equipo[];
  equiposVisitantes: Equipo[];
  arbitrosPrincipal: User[];
  arbitrosSecundario: User[];
  arbitrosCronometrador: User[];

  lng = 90;
  lat = 50;

  @ViewChild(MapComponent) mapComp: MapComponent;

  constructor(private router: Router, private partidoService: PartidosService,
    private equipoService: EquipoService, private userService: UsersService) { }

  async ngOnInit() {
    this.userService.getUsers().subscribe(x => console.log(x));
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.lng = coordinates.coords.longitude;
  }

  ngAfterViewInit(): void {
    this.mapComp.mapLoad.subscribe(
      () => {
        this.mapComp.mapInstance.resize(); // Necessary for full height
      }
    );
  }

  obtnerCategoria() {
    this.equipoService.getEquiposCategoria(this.partido.categoria).subscribe(x => {
      this.equiposLocales = x;
      this.equiposVisitantes = x;
      this.categoriaDisabled = false;
    });

    switch (this.partido.categoria) {
      case Categoria.PRIMERA:
        this.userService.getArbitrosCategoria(this.partido.categoria).subscribe(x => {
          this.arbitrosPrincipal = x;
          this.arbitrosSecundario = x;
        });
        this.userService.getArbitrosCategoria(Categoria.SEGUNDA).subscribe(x => {
          this.arbitrosCronometrador = x;
        })
        break;
      case Categoria.SEGUNDA:
        this.userService.getArbitrosCategoria(this.partido.categoria).subscribe(x => {
          this.arbitrosPrincipal = x;
          this.arbitrosSecundario = x;
        });
        this.userService.getArbitrosCategoria(Categoria.SEGUNDAB).subscribe(x => {
          this.arbitrosCronometrador = x;
        })
        break;
      case Categoria.SEGUNDAB:
        this.userService.getArbitrosCategoria(this.partido.categoria).subscribe(x => {
          this.arbitrosPrincipal = x;
          this.arbitrosSecundario = x;
        });
        this.userService.getArbitrosCategoria(Categoria.TERCERA).subscribe(x => {
          this.arbitrosCronometrador = x;
        });
        break;
      case Categoria.TERCERA:
        this.userService.getArbitrosCategoria(this.partido.categoria).subscribe(x => {
          this.arbitrosPrincipal = x;
          this.arbitrosSecundario = x;
        });
        this.userService.getArbitrosCategoria(Categoria.REGIONAL).subscribe(x => {
          this.arbitrosCronometrador = x;
        });
      case Categoria.REGIONAL:
        this.partido.arbitro_secundario = null;
        this.userService.getArbitrosCategoria(this.partido.categoria).subscribe(x => {
          this.arbitrosPrincipal = x;
        });
        this.userService.getArbitrosCategoria(Categoria.TERCERA).subscribe(x => {
          this.arbitrosCronometrador = x;
        });
      default:
        this.userService.getArbitrosCategoria(this.partido.categoria).subscribe(x => {
          this.arbitrosPrincipal = x;
        });

    }
  }

  arbitroElegido() {
    this.arbitrosSecundario = this.arbitrosSecundario.filter(x => x._id !== this.partido.arbitro_principal._id);
    this.arbitroSecundarioDisabled = false;
  }

  habilitarVisitantes() {
    this.equiposVisitantes = this.equiposVisitantes.filter(x => x._id !== this.partido.equipo_local._id);
    this.equipoVisitanteDisabled = false;
    this.partido.lugar_encuentro = this.partido.equipo_local.direccion_campo;
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
  save() {

  }
}
