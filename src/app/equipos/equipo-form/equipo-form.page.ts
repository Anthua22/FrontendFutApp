import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { Categoria, Equipo } from 'src/app/models/models';
import { Plugins } from '@capacitor/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { EquipoService } from '../service/equipo.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
const { Geolocation } = Plugins;


@Component({
  selector: 'app-equipo-form',
  templateUrl: './equipo-form.page.html',
  styleUrls: ['./equipo-form.page.scss'],
})
export class EquipoFormPage implements OnInit {
  disabled = false;
  equipo: Equipo = {
    categoria: Categoria.SC,
    email: '',
    escudo: '',
    nombre: '',
    direccion_campo: '',
    lt: 0,
    ln: 0
  }
  title = 'Añadir Equipo';
  lat = 90;
  lng = 20;
  imagenAnitgua = '';
  categorias: Categoria[] =
    [Categoria.PRIMERA, Categoria.SEGUNDA, Categoria.SEGUNDAB, Categoria.TERCERA,
    Categoria.REGIONAL, Categoria.FB]

  @ViewChild(MapComponent) mapComp: MapComponent;
  
  constructor(private equipoService: EquipoService, private nav: NavController, private route: ActivatedRoute,
    private router: Router, private toast: ToastController) { }


  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.lng = coordinates.coords.longitude;
    if (this.router.url.includes('edit')) {
      this.route.data.subscribe(x => {
        this.equipo = x.equipo;
        this.title = 'Editar Equipo';
        this.lat = this.equipo.lt;
        this.lng = this.equipo.ln;
        this.imagenAnitgua = this.equipo.escudo;
      });
    }

  }

  ngAfterViewInit(): void {
    this.mapComp.mapLoad.subscribe(
      () => {
        this.mapComp.mapInstance.resize(); // Necessary for full height
      }
    );
  }


  save() {
    if (this.router.url.includes('edit')) {
      if (this.equipo.escudo === this.imagenAnitgua) {
        this.equipo.escudo = null;
      }
      this.equipoService.editEquipo(this.equipo).subscribe(async x => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: `Se ha editado correctamente al equipo ${x.nombre}`,
          color: 'success'
        })).present();

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
      this.equipoService.addEquipo(this.equipo).subscribe(async x => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: `Se ha creado correctamente al equipo ${x.nombre}`,
          color: 'success'
        })).present();
      }, async (error: HttpErrorResponse) => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: error.message,
          color: 'danger'
        })).present();
      });
    }

    this.nav.navigateRoot(['/equipos']);

  }

  getLugarCampo(result: Result) {
    this.lat = result.geometry.coordinates[1];
    this.lng = result.geometry.coordinates[0];
    this.equipo.lt = this.lat;
    this.equipo.ln = this.lng;
    this.equipo.direccion_campo = result.place_name;
  }


  async tomarFoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.equipo.escudo = photo.dataUrl;
  }

  async elegirFotoGaleria() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.equipo.escudo = photo.dataUrl;
  }



}
