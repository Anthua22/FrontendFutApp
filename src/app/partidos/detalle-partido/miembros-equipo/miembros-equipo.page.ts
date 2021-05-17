import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EquipoService } from 'src/app/equipos/service/equipo.service';
import { Partido, MiembroEquipo } from 'src/app/models/models';
import { PartidosService } from '../../services/partidos.service';
import { DetallePartidoPage } from '../detalle-partido.page';

@Component({
  selector: 'app-miembros-equipo',
  templateUrl: './miembros-equipo.page.html',
  styleUrls: ['./miembros-equipo.page.scss'],
})
export class MiembrosEquipoPage implements OnInit {
  partido: Partido;
  locales: MiembroEquipo[] = [];
  visitantes: MiembroEquipo[]=[];
  mostrandoLocales = true;

  constructor(@Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage, private nav: NavController, private partidoService: PartidosService, private equipoService: EquipoService) { }

  ngOnInit() {
    this.parentComponent.partido$.subscribe(x => {
      this.partido = x;
      console.log(this.partido)
      this.equipoService.getJugadores(this.partido.equipo_local._id).subscribe(locales => {this.locales = locales; console.log(this.locales)});
      this.equipoService.getJugadores(this.partido.equipo_visitante._id).subscribe(visitantes => this.visitantes = visitantes);
    });

  }
  segmentChanged($event) {
    console.log($event)
    this.mostrandoLocales = $event.detail.value === 'locales'
  }

}
