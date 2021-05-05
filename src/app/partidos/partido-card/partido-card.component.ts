import { Partido } from 'src/app/models/models';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-partido-card',
  templateUrl: './partido-card.component.html',
  styleUrls: ['./partido-card.component.scss'],
})
export class PartidoCardComponent implements OnInit {

  @Input() partido!:Partido;
  fecha='';

  constructor() {
    moment.locale('es');
  }

  ngOnInit() {
    this.fecha = moment(this.partido.fecha_encuentro).format('LLL');

  }

}
