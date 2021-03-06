import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonList,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MiembroEquipo, Tarjeta, User } from 'src/app/models/models';
import { AccionesMiembroPage } from 'src/app/partidos/detalle-partido/miembros-equipo/acciones-miembro/acciones-miembro.page';
import { AddAccionMiembroPage } from 'src/app/partidos/detalle-partido/miembros-equipo/add-accion-miembro/add-accion-miembro.page';
import { EquipoService } from '../service/equipo.service';

@Component({
  selector: 'app-miembro-equipo-card',
  templateUrl: './miembro-equipo-card.page.html',
  styleUrls: ['./miembro-equipo-card.page.scss'],
})
export class MiembroEquipoCardPage implements OnInit {
  @Input() miembro: MiembroEquipo = {
    nombre_completo: '',
    foto: '',
    sancionado: false,
  };

  @Input() idEquipo: string;

  deshabilitado = true;

  verTarjetaAma = false;
  verTarjeta2Ama = false;
  verTarjetaRoja = false;

  @Input() golesMaximos: number;
  @Input() totalTit: number;
  @Input() totalCap: number;
  @Input() resultado: string;

  @ViewChild('lista') lista : IonList;

  vistaPartidos = false;
  @Output() miembroChange = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();
  userLogueado: User = {
    foto: '',
    rol: '',
    nombre_completo: '',
  };
  constructor(
    public modalCtrl: ModalController,
    public toast: ToastController,
    private router: Router,
    private equipoService: EquipoService,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.habilitarCard();
    this.checkTarjetas();
    this.vistaPartidos = this.router.url.includes('partidos');
    this.authService.userLogueado$.subscribe((x) => (this.userLogueado = x));
  }

  async openChangeInfo() {
    if (this.resultado && this.resultado !== '') {
      const modal = await this.modalCtrl.create({
        component: AccionesMiembroPage,
        componentProps: {
          miembro: this.miembro,
          totalTitu: this.totalTit,
          totalCap: this.totalCap,
        },
      });

      await modal.present();
      const result = await modal.onDidDismiss();
      if (result.data == true) {
        this.habilitarCard();
        this.miembroChange.emit();
      }
      this.lista.closeSlidingItems();
    } else {
      (
        await this.toast.create({
          duration: 3000,
          position: 'bottom',
          message: `Se tiene que finalizar el partido y enviar el resultado para acceder a esta opci??n`,
          color: 'warning',
        })
      ).present();
    }
  }

  private habilitarCard() {
    if (this.miembro.rol === 'JUGADOR') {
      if (
        (this.miembro.titular === true || this.miembro.suplente === true) &&
        this.totalTit <= 5
      ) {
        this.deshabilitado = false;
      } else {
        this.deshabilitado = true;
      }
    } else {
      if (this.miembro.asiste === true) {
        this.deshabilitado = false;
      }
    }
  }

  async openAddDataMiembro() {
    const modal = await this.modalCtrl.create({
      component: AddAccionMiembroPage,
      componentProps: {
        miembro: this.miembro,
        golesMaximos: this.golesMaximos,
      },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data == true) {
      this.checkTarjetas();
      this.miembroChange.emit();
    }
    this.lista.closeSlidingItems();
  }

  private checkTarjetas() {
    this.verTarjetaRoja = false;
    this.verTarjeta2Ama = false;
    this.verTarjetaAma = false;
    if (this.miembro.sancion_partido) {
      this.miembro.sancion_partido = this.miembro.sancion_partido.filter(
        (x) => x.motivo !== ''
      );
      this.miembro.sancion_partido.forEach((x) => {
        switch (x.tarjeta) {
          case Tarjeta.AMARILLA:
            this.verTarjetaAma = true;
            break;
          case Tarjeta.SGAMARILLA:
            this.verTarjeta2Ama = true;
            break;
          case Tarjeta.ROJA:
            this.verTarjetaRoja = true;
            break;
        }
      });
    }
  }

  async deleteMiembro() {
    const alert = await this.alertController.create({
      header: 'Confirmaci??n Borrado',
      message: 'Estas seguro de querer borrar a este miembro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.equipoService
              .deleteMiembro(this.idEquipo, this.miembro._id)
              .subscribe(
                async (x) => {
                  this.delete.emit(this.miembro._id);
                  (
                    await this.toast.create({
                      duration: 3000,
                      position: 'bottom',
                      message: `Se ha borrado al miembro del equipo con ??xito`,
                      color: 'success',
                    })
                  ).present();
                },
                async (error: HttpErrorResponse) => {
                  (
                    await this.toast.create({
                      duration: 3000,
                      position: 'bottom',
                      message: error.message,
                      color: 'danger',
                    })
                  ).present();
                }
              );
          },
        },
      ],
    });

    await alert.present();
    this.lista.closeSlidingItems();
  }
}
