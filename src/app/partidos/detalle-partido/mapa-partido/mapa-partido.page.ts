import { Partido } from 'src/app/models/models';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { NavController } from '@ionic/angular';
import { DetallePartidoPage } from '../detalle-partido.page';
import { Plugins } from '@capacitor/core';
const { StartNavigationPlugin } = Plugins;

@Component({
  selector: 'app-mapa-partido',
  templateUrl: './mapa-partido.page.html',
  styleUrls: ['./mapa-partido.page.scss'],
})
export class MapaPartidoPage implements OnInit, AfterViewInit {
  partido: Partido;
  constructor(@Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage, private nav: NavController) {
  }
  @ViewChild(MapComponent) mapComp: MapComponent;
  ngAfterViewInit(): void {
    this.mapComp.mapLoad.subscribe(
      () => {
        this.mapComp.mapInstance.resize(); // Necessary for full height
      }
    );
  }

  ngOnInit() {
    this.parentComponent.partido$.subscribe(
      partido => {
        this.partido = partido
      }
    );
  }

  startNavigation() {
    StartNavigationPlugin.launchMapsApp({
      latitude: this.partido.lt,
      longitude: this.partido.ln,
      name: 'Dirección partido',
    });
  }

}
