import { Tarjeta } from './../../models/models';
import { AddAccionMiembroPage } from './../../partidos/detalle-partido/miembros-equipo/add-accion-miembro/add-accion-miembro.page';
import { MiembroEquipo } from 'src/app/models/models';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AccionesMiembroPage } from 'src/app/partidos/detalle-partido/miembros-equipo/acciones-miembro/acciones-miembro.page';

@Component({
  selector: 'app-miembro-equipo-card',
  templateUrl: './miembro-equipo-card.component.html',
  styleUrls: ['./miembro-equipo-card.component.scss'],
})
export class MiembroEquipoCardComponent implements OnInit {
  @Input() miembro: MiembroEquipo = {
    nombre_completo: '',
    foto: '',
    sancionado: false,
  };

  deshabilitado = true;

  verTarjetaAma = false;
  verTarjeta2Ama = false;
  verTarjetaRoja = false;

  @Input() totalTit: number;
  @Input() totalCap: number;

  @Output() miembroChange = new EventEmitter<void>();
  @Output() miembroSanciones = new EventEmitter<void>();

  constructor(
    public modalCtrl: ModalController,
    public toast: ToastController
  ) { }

  ngOnInit() {
    this.habilitarCard();
    this.checkTarjetas();
  }

  async openChangeInfo() {
    const modal = await this.modalCtrl.create({
      component: AccionesMiembroPage,
      componentProps: { miembro: this.miembro, totalTitu: this.totalTit, totalCap: this.totalCap },
    });

    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data == true) {
      this.habilitarCard();

      this.miembroChange.emit();
    }
  }

  private habilitarCard() {
    if (this.miembro.rol === 'JUGADOR') {
      if ((this.miembro.titular === true || this.miembro.suplente === true) && this.totalTit + 1 <= 5) {
        this.deshabilitado = false;
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
      componentProps: { miembro: this.miembro }
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data == true) {
      this.checkTarjetas();
      this.miembroSanciones.emit();
    }
  }

  private checkTarjetas() {
    this.verTarjetaRoja = false;
    this.verTarjeta2Ama = false;
    this.verTarjetaAma = false;
    if (this.miembro.sancion_partido) {
      this.miembro.sancion_partido = this.miembro.sancion_partido.filter(x => x.motivo !== '');
      this.miembro.sancion_partido.forEach(x => {
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
      })
    }

  }

}
