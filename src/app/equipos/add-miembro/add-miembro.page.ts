import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Equipo, MiembroEquipo } from 'src/app/models/models';
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { EquipoService } from '../service/equipo.service';
import { HttpErrorResponse } from '@angular/common/http';
const { Camera } = Plugins;

@Component({
  selector: 'app-add-miembro',
  templateUrl: './add-miembro.page.html',
  styleUrls: ['./add-miembro.page.scss'],
})
export class AddMiembroPage implements OnInit {
  @Input() equipo: Equipo;
  miembroNuevo: MiembroEquipo = {
    'foto': '',
    'nombre_completo': '',
    'rol': '',
    'sancionado': false
  }
  name = '';
  apellidos = '';
  funciones = ['JUGADOR', 'ENTRENADOR', 'ENCARGADO_MATERIAL', 'PREPARADOR_FISICO']
  constructor(public modalCtrl: ModalController, private equipoService: EquipoService, private toast:ToastController) { }

  ngOnInit() {
  }

  cancel() {
    this.modalCtrl.dismiss(false);
  }

  async save() {
    this.miembroNuevo.nombre_completo = `${this.apellidos}-${this.name}`;

    this.equipoService.addMiembro(this.equipo._id, this.miembroNuevo).subscribe(x => {
      this.modalCtrl.dismiss(x);
    },
    async (error: HttpErrorResponse) => {
      (await this.toast.create({
        duration: 3000,
        position: "bottom",
        message: error.message,
        color: 'danger'
      })).present();
    })
  }

  async tomarFoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.miembroNuevo.foto = photo.dataUrl;
  }

  async elegirFotoGaleria() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.miembroNuevo.foto = photo.dataUrl;
  }

}
