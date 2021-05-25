import { MiembroEquipo } from '../../../../models/models';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-acciones-miembro',
  templateUrl: './acciones-miembro.page.html',
  styleUrls: ['./acciones-miembro.page.scss'],
})
export class AccionesMiembroPage implements OnInit {
  @Input() miembro: MiembroEquipo;
  titular = false;
  suplente = false;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.miembro.dorsal = 0;
  }

  cancel() {
    this.modalCtrl.dismiss(false);
  }

  changeInfo() {
    this.miembro.suplente = this.suplente;
    this.miembro.titular = this.titular;
    this.modalCtrl.dismiss(true);
  }

  changeTitular() {
    this.miembro.titular = !this.miembro.suplente;
    this.miembro.suplente = !this.miembro.titular;
  }

  changeSup() {
    this.miembro.titular = false;
    this.miembro.suplente = true;
  }


}
