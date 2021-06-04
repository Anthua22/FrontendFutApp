import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/models';
import { EquipoService } from '../service/equipo.service';

@Component({
  selector: 'app-equipos-list',
  templateUrl: './equipos-list.page.html',
  styleUrls: ['./equipos-list.page.scss'],
})
export class EquiposListPage implements OnInit {
  data = false;
  equipos: Equipo[];
  equiposCopia: Equipo[];
  constructor(private equipoService: EquipoService) { }

  ngOnInit() {
    this.equipoService.getEquipos().subscribe(x => {
      this.equipos = x;
      this.equiposCopia = this.equipos;
      this.data = true
    });

  }

  filterItems(event) {
    let search: string = event.target.value;
    if (search && search.trim() !== '') {
      search = search.trim().toLowerCase();
      this.equipos = this.equipos
        .filter(i => i.nombre.toLowerCase().includes(search));
    } else {
      this.equipos = this.equiposCopia;
    }

  }

  deleteEquipo(id: string) {
    this.equipos = this.equipos.filter(x => x._id !== id);
    this.equiposCopia = this.equiposCopia.filter(x => x._id !== id);
  }
}
