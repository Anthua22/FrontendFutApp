import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Categoria, Partido, User } from 'src/app/models/models';
import { Plugins } from '@capacitor/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PartidosService } from '../services/partidos.service';
import { HttpErrorResponse } from '@angular/common/http';
const { Share } = Plugins;

@Component({
  selector: 'app-partido-card',
  templateUrl: './partido-card.page.html',
  styleUrls: ['./partido-card.page.scss'],
})
export class PartidoCardPage implements OnInit {

  @Input() partido: Partido = {
    arbitro_principal: {
      nombre_completo: '',
      foto: '',
      rol: '',
      categoria: Categoria.SC
    },
    equipo_local: {
      _id:'',
      nombre: '',
      categoria: Categoria.FB,
      escudo: '',
      email: '',
      direccion_campo: ''
    },
    equipo_visitante: {
      _id:'',
      nombre: '',
      categoria: Categoria.FB,
      escudo: '',
      email: '',
      direccion_campo: ''
    },
    fecha_encuentro: new Date(),
    categoria: Categoria.FB,
    jornada: 0,
    lugar_encuentro: ''

  };

  userLogueado: User= {
    'foto':'',
    'rol':'',
    'nombre_completo':'',
    '_id':''
  }

  @Output() delete = new EventEmitter<string>();


  constructor(private nav: NavController, private authService:AuthService, private alert:AlertController, private toast:ToastController,
    private actionSheetCtrl: ActionSheetController, private router: Router, private partidoService:PartidosService) {
  }

  ngOnInit() {
    this.authService.userLogueado$.subscribe(x => {
      this.userLogueado = x;
    })
  }

  goDetail() {
    this.nav.navigateRoot(['/partidos/details', this.partido._id])
  }

  async showOptions() {
    let optionDetailPartido: any;
    if (this.userLogueado.rol === 'ADMIN' || this.partido.arbitro_principal._id === this.userLogueado._id || (this.partido.arbitro_secundario && this.partido.arbitro_secundario._id === this.userLogueado._id )|| (this.partido.cronometrador &&  this.partido.cronometrador._id === this.userLogueado._id)) {
      optionDetailPartido = {
        text: 'Ver Detalle',
        icon: 'eye',
        handler: () => {
          this.nav.navigateRoot(['/partidos/details', this.partido._id]);
        }
      }
    } else {
      optionDetailPartido = {
        text: 'Ver Acta',
        icon: 'eye',
        handler: () => {
          console.log('ff');
        }
      }
    }

    const actSheet = await this.actionSheetCtrl.create({
      header: `${this.partido.equipo_local.nombre} VS ${this.partido.equipo_visitante.nombre}`,
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: async () => {
          const alert = await this.alert.create({
            header: 'Confirmación Borrado',
            message: 'Estas seguro de querer borrar este partido?',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel'
              },
              {
                text: 'Aceptar',
                handler: () => {
                  this.partidoService.deletePartido(this.partido._id).subscribe(async x => {
                    this.delete.emit(x._id);
                    (await this.toast.create({
                      duration: 3000,
                      position: "bottom",
                      message: `Se ha borrado el partido con éxito`,
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
                    })
                }
              }
            ]
          });
      
          await alert.present();
        }
      }, optionDetailPartido,
      {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.router.navigate(['/partidos/edit',this.partido._id]);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
      }]
    });

    actSheet.present();
    

  }

  compartir() {
    Share.share({
      dialogTitle: 'Camparir el partido',
      text: 'Se comparte'

    });
  }
}
