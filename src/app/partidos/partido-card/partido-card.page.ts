import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Categoria, Partido, User } from 'src/app/models/models';
import { Plugins } from '@capacitor/core';
import { AuthService } from 'src/app/auth/services/auth.service';
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
      categoria: ''
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

  constructor(private nav: NavController, private authService:AuthService,
    private actionSheetCtrl: ActionSheetController, private router: Router) {
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
        handler: () => {
          // this.productService.deleteProduct(prod.id).subscribe(
          //  () => this.products.splice(this.products.indexOf(prod), 1)
          //);
        }
      }, optionDetailPartido,
      {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.router.navigate(['/products/edit']);
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
