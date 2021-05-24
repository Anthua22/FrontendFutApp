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
  @ViewChild('item') card;

  @Output() miembroChange = new EventEmitter<MiembroEquipo>();

  constructor(
    public modalCtrl: ModalController,
    public toast: ToastController
  ) {}

  ngOnInit() {}

  habilitar() {
    console.log(this.card);
  }

  async openChangeInfo() {
    const modal = await this.modalCtrl.create({
      component: AccionesMiembroPage,
      componentProps: { miembro: this.miembro },
    });

    await modal.present();
    const result = await modal.onDidDismiss();

    if (result.data == true) {
      if (this.miembro.titular === true || this.miembro.suplente === true) {
        this.card.disabled = false;
      }
      this.miembroChange.emit(this.miembro);
    }
  }
}
