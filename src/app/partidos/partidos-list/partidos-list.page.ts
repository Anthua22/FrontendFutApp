import { from } from 'rxjs';
import { PartidosService } from './../services/partidos.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Partido, User } from 'src/app/models/models';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AuthService } from 'src/app/auth/services/auth.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-partidos-list',
  templateUrl: './partidos-list.page.html',
  styleUrls: ['./partidos-list.page.scss'],
})
export class PartidosListPage implements OnInit {

  partidos!: Partido[];
  partidosCopia: Partido[];
  data = false;
  userLoguado: User = {
    'rol': '',
    'nombre_completo': '',
    'foto': ''
  }
  constructor(private partidosService: PartidosService, private authService: AuthService, private toast: ToastController) { }

  ngOnInit() {
    this.partidosService.getPartidos().subscribe(
      x => {this.partidos = x; this.partidosCopia = x; },
      async (error: HttpErrorResponse) => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: 'No se han podido obtener los partidos',
          color: 'danger'
        })).present();
      });
    setTimeout(() => {
      this.data = true;
    }, 500);

    this.authService.userLogueado$.subscribe(x => {
      this.userLoguado = x;
    })
  }

  deletePartido($event:string) {
    this.partidos = this.partidos.filter(x=>x._id!== $event);
  }
  doRefresh(event: any) {
    this.partidosService.getPartidos().subscribe(x => { this.partidos = x; event.target.complete(); });
  }

  filterCategory(categoria: string) {
    this.partidosService.getPartidosCategoria(categoria).subscribe(x => this.partidos = x);
  }



  filterItems(event) {
    let search: string = event.target.value;
    if (search && search.trim() !== '') {
      search = search.trim().toLowerCase();
      this.partidos = this.partidos.filter(x=>x.equipo_local.nombre.toLocaleLowerCase().includes(search) || x.equipo_visitante.nombre.toLocaleLowerCase().includes(search) )

    } else {
      this.partidos = this.partidosCopia;
    }

  }

}
