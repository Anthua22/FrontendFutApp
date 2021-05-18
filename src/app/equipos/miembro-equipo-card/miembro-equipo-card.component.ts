import { MiembroEquipo } from 'src/app/models/models';
import { Partido } from './../../models/models';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-miembro-equipo-card',
  templateUrl: './miembro-equipo-card.component.html',
  styleUrls: ['./miembro-equipo-card.component.scss'],
})
export class MiembroEquipoCardComponent implements OnInit {
  @Input() miembro!: MiembroEquipo;
  @ViewChild('item') card;

  constructor() { }

  ngOnInit() { }

  habilitar() {
    console.log(this.card)
  }
}
