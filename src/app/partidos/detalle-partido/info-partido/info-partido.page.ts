import { PartidosService } from './../../services/partidos.service';
import { Component, Inject, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Partido, Categoria, MiembroEquipo } from 'src/app/models/models';
import { DetallePartidoPage } from '../detalle-partido.page';
import { HttpErrorResponse } from '@angular/common/http';
import { ActaService } from '../../services/acta.service';

@Component({
  selector: 'app-info-partido',
  templateUrl: './info-partido.page.html',
  styleUrls: ['./info-partido.page.scss'],
})
export class InfoPartidoPage implements OnInit {
  partido: Partido = {
    arbitro_principal: {
      nombre_completo: '',
      foto: '',
      rol: '',
      categoria: Categoria.SC
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
  delegadoLocal: MiembroEquipo = {
    nombre_completo: '',
    sancionado: false,
    foto: ''
  };
  delegadoVisitante: MiembroEquipo = {
    nombre_completo: '',
    sancionado: false,
    foto: ''
  };
  golesLocales = '0';
  golesVisitantes = '0';
  terminado = false;

  constructor(@Inject(DetallePartidoPage) private parentComponent: DetallePartidoPage, private actaService:ActaService, private partidosService: PartidosService, private toast: ToastController) { }

  ngOnInit() {
    this.parentComponent.partido$.subscribe(
      partido => {
        this.partido = partido;
        this.partido.equipo_local.miembros.forEach(x => {
          if (x.rol === 'DELEGADO') {
            this.delegadoLocal = x;
          }
        });
        this.partido.equipo_visitante.miembros.forEach(x => {
          if (x.rol === 'DELEGADO') {
            this.delegadoVisitante = x;
          }
        });
        if (this.partido.resultado) {
          this.terminado = true;
          const golesArray = this.partido.resultado.split('-');
          this.golesLocales = golesArray[0];
          this.golesVisitantes = golesArray[1];
        }
      }
    );
  }
  async makePdf() {
    try{
      const pdf: any = await this.actaService.makePdf(this.partido);
    }catch(err){
      (
        await this.toast.create({
          duration: 3000,
          position: 'bottom',
          message: err,
          color: 'danger',
        })
      ).present();
    }

  }

  saveResultado(): void {
    this.partido.resultado = `${this.golesLocales}-${this.golesVisitantes}`;
    this.partidosService.saveResultado(this.partido).subscribe(async () => {
      (await this.toast.create({
        duration: 3000,
        position: "bottom",
        message: 'Se ha enviado correctamente el resultado',
        color: 'success'
      })).present();
    },
      async (error: HttpErrorResponse) => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: error.message,
          color: 'danger'
        })).present();
      });
  }
}
