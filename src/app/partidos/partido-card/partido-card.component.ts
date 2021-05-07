import { Partido } from 'src/app/models/models';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-partido-card',
  templateUrl: './partido-card.component.html',
  styleUrls: ['./partido-card.component.scss'],
})
export class PartidoCardComponent implements OnInit {

  @Input() partido!: Partido;
  fecha = '';
  hora = '';
  constructor(private nav: NavController) {
    moment.locale('es');
  }

  ngOnInit() {
    this.fecha = moment(this.partido.fecha_encuentro).format('ll');
    this.hora = moment(this.partido.fecha_encuentro).format('hh:mm A');
  }

  goDetail() {
    this.nav.navigateRoot(['/partidos',this.partido._id])
  }

}
