import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Categoria, Equipo, Partido } from 'src/app/models/models';
import { PartidosService } from 'src/app/partidos/services/partidos.service';
import { EquipoService } from '../service/equipo.service';

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
      })
    });

  }

}
