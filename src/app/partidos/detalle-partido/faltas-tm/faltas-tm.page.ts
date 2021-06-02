import { ActaService } from './../../services/acta.service';
import { PartidosService } from './../../services/partidos.service';
import { Categoria, Partido } from 'src/app/models/models';
import { Component, Inject, OnInit } from '@angular/core';
import { DetallePartidoPage } from '../detalle-partido.page';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-faltas-tm',
  templateUrl: './faltas-tm.page.html',
  styleUrls: ['./faltas-tm.page.scss'],
})
export class FaltasTMPage implements OnInit {
  type = 'locales';
  partido: Partido = {
    arbitro_principal: {
      nombre_completo: '',
      foto: '',
      rol: '',
      categoria: ''
    },
    equipo_local: {
      nombre: '',
      categoria: Categoria.FB,
      escudo: '',
      email: '',
      direccion_campo: ''
    },
    equipo_visitante: {
      nombre: '',
      categoria: Categoria.FB,
      escudo: '',
      email: '',
      direccion_campo: ''
    },
    fecha_encuentro: new Date(),
    categoria: Categoria.FB,
    jornada: 0,
    lugar_encuentro: ''


  };

  actaService: ActaService;
  constructor(@Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage, private partidoService: PartidosService, private toast: ToastController) { }

  ngOnInit() {
    this.actaService = new ActaService(this.partido);
    this.parentComponent.partido$.subscribe(
      partido => {
        this.partido = partido;
        if (!this.partido.faltasTmLocal) {
          this.partido.faltasTmLocal = {
            faltasPrimeraParte: 0,
            faltasSegundaParte: 0,
            tiempoPrimeraParte: false,
            tiempoSegundaParte: false
          }
        }
        if (!this.partido.faltasTmVisitante) {
          this.partido.faltasTmVisitante = {
            faltasPrimeraParte: 0,
            faltasSegundaParte: 0,
            tiempoPrimeraParte: false,
            tiempoSegundaParte: false
          }
        }
        this.actaService = new ActaService(this.partido);
      }
    );
  }

  saveFaltasTiemposMuertos() {
    this.partidoService.saveFaltasTM(this.partido).subscribe(() => { },
      async (error: HttpErrorResponse) => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: error.message,
          color: 'danger'
        })).present();
      });
  }

  async makePdf() {
    const pdf: any = await this.actaService.makePdf();
    pdf.open();
  }

}
