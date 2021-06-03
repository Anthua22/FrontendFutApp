import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { Categoria, Equipo } from 'src/app/models/models';
import { Plugins } from '@capacitor/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { EquipoService } from '../service/equipo.service';
import { NavController } from '@ionic/angular';
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
    lt:0,
    ln:0
  }

  lat = 90;
  lng = 20;
  @ViewChild(MapComponent) mapComp: MapComponent;
  constructor(private equipoService:EquipoService, private nav:NavController) { }
  categorias: Categoria[] =
    [Categoria.PRIMERA, Categoria.SEGUNDA, Categoria.SEGUNDAB, Categoria.TERCERA,
    Categoria.REGIONAL, Categoria.FB]

  async ngOnInit() {
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

  add() {
    this.equipoService.addEquipo(this.equipo).subscribe(x=>{
      this.nav.navigateRoot(['/equipos']);
    })
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
