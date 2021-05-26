import { Sancion, Tarjeta } from './../../../../models/models';
import { Gol, MiembroEquipo } from 'src/app/models/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-accion-miembro',
  templateUrl: './add-accion-miembro.page.html',
  styleUrls: ['./add-accion-miembro.page.scss'],
})
export class AddAccionMiembroPage implements OnInit {

  @Input() miembro: MiembroEquipo;
  goles: number;
  golesArray: Gol[] = [];
  hayGoles = false;
  sancionAmarilla: Sancion = {
    minuto: 0,
    motivo: '',
    tarjeta: Tarjeta.AMARILLA
  };
  sancionSegunAmarilla: Sancion = {
    minuto: 0,
    motivo: '',
    tarjeta: Tarjeta.SGAMARILLA
  };
  sancionroja: Sancion = {
    minuto: 0,
    motivo: '',
    tarjeta: Tarjeta.ROJA
  };


  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.miembro.sancion_partido)
    if (this.miembro.sancion_partido) {
      this.miembro.sancion_partido.forEach(x => {
        if (x.tarjeta === Tarjeta.AMARILLA) {
          this.sancionAmarilla = x;
        } else if (x.tarjeta === Tarjeta.SGAMARILLA) {
          this.sancionSegunAmarilla = x;
        } else {
          this.sancionroja = x;
        }

      })
    }
    if (this.miembro.goles) {
      this.goles = this.miembro.goles.length;
    }
  }


  cancel() {
    this.modalCtrl.dismiss(false);
  }

  addRowGoles() {
    this.golesArray = [];
    let contador = 0;
    this.hayGoles = this.goles > 0;
    if (this.miembro.goles) {
      this.miembro.goles.forEach(x => {
        this.golesArray.push(x);
      })
    } else {
      while (contador < this.goles) {
        this.golesArray.push({ minuto: 0 });
        contador++;
      }
    }

  }


  save() {
    this.miembro.sancion_partido = [];
    this.miembro.goles = this.golesArray;

    if (this.sancionAmarilla.motivo !== '') {
      this.miembro.sancion_partido.push(this.sancionAmarilla);
    }
    if (this.sancionSegunAmarilla.motivo !== '') {
      this.miembro.sancion_partido.push(this.sancionSegunAmarilla);
    }
    if (this.sancionroja.motivo !== '') {
      this.miembro.sancion_partido.push(this.sancionroja);
    }
    this.modalCtrl.dismiss(true);


  }
}
