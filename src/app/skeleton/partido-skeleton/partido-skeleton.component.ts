import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partido-skeleton',
  templateUrl: './partido-skeleton.component.html',
  styleUrls: ['./partido-skeleton.component.scss'],
})
export class PartidoSkeletonComponent implements OnInit {

  partidosPlantilla = [1,3,2,4];

  constructor() { }

  ngOnInit() {}

}
