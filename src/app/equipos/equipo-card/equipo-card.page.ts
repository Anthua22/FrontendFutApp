import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Equipo } from 'src/app/models/models';
import { AddMiembroPage } from '../add-miembro/add-miembro.page';

@Component({
  selector: 'app-equipo-card',
  templateUrl: './equipo-card.page.html',
  styleUrls: ['./equipo-card.page.scss'],
})
export class EquipoCardPage implements OnInit {

  @Input() equipo: Equipo;


  constructor(public modalCtrl: ModalController, private toast:ToastController) { }

  ngOnInit() { }

  async addMiembro() {
    const modal = await this.modalCtrl.create({
      component: AddMiembroPage,
      componentProps: { equipo: this.equipo },
    });
    await modal.present();
    const result = await modal.onDidDismiss();

    if (result.data._id) {
      (await this.toast.create({
        duration: 3000,
        position: "bottom",
        message: `La persona se ha añadido correctamente al equipo ${this.equipo.nombre}`,
        color: 'success'
      })).present();
    }
  }

}
