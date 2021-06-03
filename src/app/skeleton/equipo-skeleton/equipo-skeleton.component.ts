import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipo-skeleton',
  templateUrl: './equipo-skeleton.component.html',
  styleUrls: ['./equipo-skeleton.component.scss'],
})
export class EquipoSkeletonComponent implements OnInit {
  equiposPlantilla = [1,3,2,4];
  constructor() { }

  ngOnInit() {}

}
