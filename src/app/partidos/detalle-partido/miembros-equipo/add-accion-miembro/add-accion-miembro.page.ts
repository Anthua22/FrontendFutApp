import { Sancion, Tarjeta } from './../../../../models/models';
import { Gol, MiembroEquipo } from 'src/app/models/models';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-accion-miembro',
  templateUrl: './add-accion-miembro.page.html',
  styleUrls: ['./add-accion-miembro.page.scss'],
})
export class AddAccionMiembroPage implements OnInit {

  @Input() miembro: MiembroEquipo;
  @Input() golesMaximos: number;
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


  constructor(public modalCtrl: ModalController, private toast: ToastController) { }

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
      console.log(this.miembro.goles.length);
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

  async save() {
    this.miembro.sancion_partido = [];
    this.miembro.goles = this.miembro.goles ? this.miembro.goles : [];
    let golesJugadorAsignado = this.miembro.goles ? this.miembro.goles.length : 0;
    golesJugadorAsignado = golesJugadorAsignado + this.golesMaximos;
    for (let i = 0; i < this.golesArray.length; i++) {
      if (i < this.golesMaximos) {
        this.miembro.goles.push(this.golesArray[i]);
      }
    }
    if (this.golesArray.length < this.miembro.goles.length) {
      this.miembro.goles = this.golesArray;
    }

    if (this.golesArray.length > golesJugadorAsignado) {
      (await this.toast.create({
        duration: 3000,
        position: "bottom",
        message: this.golesMaximos !== 0 ? `Los goles máximos que se pueden asignar son ${this.golesMaximos} goles` : 'No se pueden asignar más goles a este jugador ya que los goles asignados son mayor que los goles ha marcado el equipo en total',
        color: 'danger'
      })).present();
    }

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
