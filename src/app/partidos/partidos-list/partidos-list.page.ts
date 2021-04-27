import { PartidosService } from './../services/partidos.service';
import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/models/models';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-partidos-list',
  templateUrl: './partidos-list.page.html',
  styleUrls: ['./partidos-list.page.scss'],
})
export class PartidosListPage implements OnInit {

  partidos!: Partido[];
  pathFotosEquipos = "E:/Estudios/DAW/FutApp/Backend/uploadsimages/equipos/"
  constructor(private partidosService: PartidosService, private toast: ToastController) { }

  ngOnInit() {
    this.partidosService.getPartidos().subscribe(
      x => this.partidos = x,
      async (error: HttpErrorResponse) => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: error.error.error,
          color: 'danger'
        })).present();
      });
  }

  doRefresh(event: any) {

  }

}
