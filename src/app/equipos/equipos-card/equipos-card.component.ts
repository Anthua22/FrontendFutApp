import { Component, Input, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/models';

@Component({
  selector: 'app-equipos-card',
  templateUrl: './equipos-card.component.html',
  styleUrls: ['./equipos-card.component.scss'],
})
export class EquiposCardComponent implements OnInit {
  @Input() equipo:Equipo;

  constructor() { }

  ngOnInit() {}

}
