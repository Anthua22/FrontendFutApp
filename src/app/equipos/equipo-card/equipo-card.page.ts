import { Component, Input, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/models';

@Component({
  selector: 'app-equipo-card',
  templateUrl: './equipo-card.page.html',
  styleUrls: ['./equipo-card.page.scss'],
})
export class EquipoCardPage implements OnInit {

  @Input() equipo:Equipo;

  constructor() { }

  ngOnInit() {}

}
