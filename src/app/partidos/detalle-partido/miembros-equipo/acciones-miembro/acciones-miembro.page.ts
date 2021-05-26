import { MiembroEquipo } from '../../../../models/models';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-acciones-miembro',
  templateUrl: './acciones-miembro.page.html',
  styleUrls: ['./acciones-miembro.page.scss'],
})
export class AccionesMiembroPage implements OnInit {
  @Input() miembro: MiembroEquipo;
  @Input() totalTitu: number;
  @Input() totalCap: number;
  titular = false;
  suplente = false;
  capitan = false;

  constructor(public modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    if (this.miembro.titular === true) {
      this.titular = this.miembro.titular;
    } else if (this.miembro.suplente === true) {
      this.suplente = this.miembro.suplente;
    }
    if (this.miembro.capitan === true) {
      this.capitan = this.miembro.capitan;
    }
  }

  cancel() {
    this.modalCtrl.dismiss(false);
  }

  async changeInfo() {
    if (this.totalTitu + 1 <= 5) {
      this.miembro.suplente = this.suplente;
      this.miembro.titular = this.titular;
      if (this.totalCap + 1 <= 1 && this.capitan === true) {
        this.miembro.capitan = this.capitan;
      } else if (this.totalCap + 1 >= 1 && this.capitan === true) {
        (await this.toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: 'Ya existen un capitán',
          color: 'danger'
        })).present();
      }
      this.modalCtrl.dismiss(true);
    } else {
      this.titular = false;
      this.suplente = false;
      this.modalCtrl.dismiss(false);
      (await this.toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Ya existen 5 titulares',
        color: 'danger'
      })).present();
    }

  }


}
