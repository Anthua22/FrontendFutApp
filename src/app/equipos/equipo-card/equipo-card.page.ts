import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Equipo, User } from 'src/app/models/models';
import { AddMiembroPage } from '../add-miembro/add-miembro.page';
import { EquipoService } from '../service/equipo.service';

@Component({
  selector: 'app-equipo-card',
  templateUrl: './equipo-card.page.html',
  styleUrls: ['./equipo-card.page.scss'],
})
export class EquipoCardPage implements OnInit {

  @Input() equipo: Equipo;
  userLogueado: User = {
    'foto': '',
    'rol': '',
    'nombre_completo': ''
  };

  @Output() delete = new EventEmitter<string>();

  constructor(public modalCtrl: ModalController, private toast: ToastController, private equipoService: EquipoService,
    private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
    this.authService.userLogueado$.subscribe(x => this.userLogueado = x)
  }

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

  async deleteEquipo() {
    const alert = await this.alertController.create({
      header: 'Confimación Borrado',
      message: 'Estas seguro de querer borrar a este Equipo? Los partidos en los que ha participado o vaya a participar también se borraran...',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.equipoService.deleteEquipo(this.equipo._id).subscribe(async x => {
              this.delete.emit(x._id);
              (await this.toast.create({
                duration: 3000,
                position: "bottom",
                message: `Se ha borrado al equipo ${x.nombre} con éxito`,
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
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }
}