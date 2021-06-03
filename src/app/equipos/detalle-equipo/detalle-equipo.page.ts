import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria, Equipo, MiembroEquipo, Partido } from 'src/app/models/models';
import { EquipoService } from '../service/equipo.service';
import { Plugins } from '@capacitor/core';
const { StartNavigationPlugin } = Plugins;


@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.page.html',
  styleUrls: ['./detalle-equipo.page.scss'],
})
export class DetalleEquipoPage implements OnInit {
  equipo: Equipo = {
    'email': '',
    'escudo': '',
    'direccion_campo': '',
    'categoria': Categoria.SC,
    'nombre': ''
  }

  staffs: MiembroEquipo[];
  jugadores: MiembroEquipo[];

  data = false;
  partidosParticipa: Partido[] = [];
  type = 'partidos'

  constructor(private equipoService: EquipoService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.equipoService.getEquipo(this.route.snapshot.params.id).subscribe(x => {
      this.equipo = x;
      this.data = true;
      this.equipoService.getPartidos(this.equipo._id).subscribe(partidos => {
        this.partidosParticipa = partidos;
      });
      this.jugadores = this.equipo.miembros.filter(x => x.rol === 'JUGADOR');
      this.staffs = this.equipo.miembros.filter(x => x.rol !== 'JUGADOR');
    });

  }


}
