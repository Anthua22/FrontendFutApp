import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/models';

@Component({
  selector: 'app-equipos-list',
  templateUrl: './equipos-list.page.html',
  styleUrls: ['./equipos-list.page.scss'],
})
export class EquiposListPage implements OnInit {

  equipos:Equipo[];
  constructor() { }

  ngOnInit() {
  }

}
