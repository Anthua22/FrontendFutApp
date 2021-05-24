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
  constructor(public modalCtrl: ModalController, public toast: ToastController) { }

  ngOnInit() {
    this.miembro.dorsal = 0;
  }

  cancel() {
    this.modalCtrl.dismiss(false);
  }

  changeInfo() {

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
