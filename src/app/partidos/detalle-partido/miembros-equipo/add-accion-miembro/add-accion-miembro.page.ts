import { Sancion, Tarjeta } from './../../../../models/models';
import { Gol, MiembroEquipo } from 'src/app/models/models';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
      this.removeGolesExtras();
      this.miembro.goles.forEach(x => {
        this.golesArray.push(x);
      });
      contador = this.miembro.goles.length;
      while (contador < this.goles) {
        this.golesArray.push({ minuto: 0 });
        contador++;
      }
    } else {
      while (contador < this.goles) {
        this.golesArray.push({ minuto: 0 });
        contador++;
      }
    }

  }

  removeGolesExtras() {
    let contador = 0;
    if (this.goles < this.miembro.goles.length) {
      contador = this.miembro.goles.length - this.goles;
      for (let i = 0; i < contador; i++) {
        this.miembro.goles.pop();
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
