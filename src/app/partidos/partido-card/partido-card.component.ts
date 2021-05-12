import { Categoria, Partido } from 'src/app/models/models';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partido-card',
  templateUrl: './partido-card.component.html',
  styleUrls: ['./partido-card.component.scss'],
})
export class PartidoCardComponent implements OnInit {

  @Input() partido: Partido = {
    arbitro_principal: {
      nombre_completo: '',
      foto: '',
      rol: '',
      categoria: ''
    },
    equipo_local: {
      nombre: '',
      categoria: Categoria.FB,
      escudo: '',
      email: '',
      direccion_campo: ''
    },
    equipo_visitante: {
      nombre: '',
      categoria: Categoria.FB,
      escudo: '',
      email: '',
      direccion_campo: ''
    },
    fecha_encuentro: new Date(),
    categoria: '',
    jornada: 0,
    lugar_encuentro: ''

  };

  constructor(private nav: NavController, private actionSheetCtrl: ActionSheetController, private router: Router) {
    moment.locale('es');
  }

  ngOnInit() {
  }

  goDetail() {
    this.nav.navigateRoot(['/partidos', this.partido._id])
  }

  async showOptions() {
    //  if(prod.mine){
    const actSheet = await this.actionSheetCtrl.create({
      header: this.partido.lugar_encuentro,
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          // this.productService.deleteProduct(prod.id).subscribe(
          //  () => this.products.splice(this.products.indexOf(prod), 1)
          //);
        }
      }, {
        text: 'See details',
        icon: 'eye',
        handler: () => {
          this.nav.navigateRoot(['/partidos', this.partido._id])
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          this.router.navigate(['/products/edit']);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });

    actSheet.present();
    /* }else{
       const actSheet = await this.actionSheetCtrl.create({
         header: prod.description,
         buttons: [ {
           text: 'See details',
           icon: 'eye',
           handler: () => {
             this.router.navigate(['/products/details', prod.id]);
           }
         }, {
           text: 'Cancel',
           icon: 'close',
           role: 'cancel',
         }]
       });*/

    actSheet.present();
    // }

  }
}
