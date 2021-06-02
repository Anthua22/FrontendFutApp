import { from } from 'rxjs';
import { PartidosService } from './../services/partidos.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Partido, User } from 'src/app/models/models';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-partidos-list',
  templateUrl: './partidos-list.page.html',
  styleUrls: ['./partidos-list.page.scss'],
})
export class PartidosListPage implements OnInit {

  partidos!: Partido[];
  data = false;
  userLoguado: User;
  constructor(private partidosService: PartidosService, private toast: ToastController, @Inject(AppComponent) private parentComponent: AppComponent) { }

  ngOnInit() {
    this.partidosService.getPartidos().subscribe(
      x => this.partidos = x,
      async (error: HttpErrorResponse) => {
        (await this.toast.create({
          duration: 3000,
          position: "bottom",
          message: 'No se han podido obtener los partidos',
          color: 'danger'
        })).present();
      });
    setTimeout(() => {
      this.data = true;
    }, 500);

    this.parentComponent.usuarioLogueado$.subscribe(x => {
      this.userLoguado = x;
    })
  }


  doRefresh(event: any) {
    this.partidosService.getPartidos().subscribe(x => { this.partidos = x; event.target.complete(); });
  }

  filterCategory(categoria: string) {
    this.partidosService.getPartidosCategoria(categoria).subscribe(x => this.partidos = x);
  }

  async pdf() {
    let objPdf = null;
    const dd = {
      pageSize: 'A4',
      content: [
        {
          image: await this.getBase64ImageFromURL("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Royal_Spanish_Football_Federation_logo.svg/1200px-Royal_Spanish_Football_Federation_logo.svg.png"),
          fit: [60, 60],
          margin: [225, 0, 0, 10]
        },
        {
          text: 'Primera División',
          style: 'header'
        },
        {
          text: 'Jornada 7',
          style: 'subheader'
        },
        {
          alignment: 'center',
          columns: [
            {
              image: await this.getBase64ImageFromURL("http://vps-68fdff29.vps.ovh.net:8080/miembros_equipos/1621631777299.jpeg"),
              fit: [100, 100]
            },
            {
              image: await this.getBase64ImageFromURL("http://vps-68fdff29.vps.ovh.net:8080/miembros_equipos/1621631777299.jpeg"),
              fit: [100, 100]
            }
          ]
        },
        {
          alignment: 'center',
          columns: [
            {
              text: 'Barcelona FS', style: 'nombreEquipo'
            },
            {
              text: 'Real Madrid FC', style: 'nombreEquipo'
            }
          ]
        },
        {
          text: 'Partido suspendido', color:'#E70020', margin:[0,0,0,5]
        },
        {
          style: 'tableInfo',
          table: {
            headerRows: 1,
            widths: [100, 120, '*'],
            body: [
              [
                { text: 'Fecha Encuentro', bold: true }, { text: 'Hora Encuentro', bold: true }, { text: 'Lugar Encuentro', bold: true }
              ],
              [
                '10/02/2010',
                '10:00 AM',
                'Lorem ipsum dolor sit adddddddddddd',
              ],

            ]
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex === 0) ? '#CCCCCC' : null;
            }
          }
        },
        {
          table: {
            headerRows: 1,
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            widths: [250, 250],
            body: [
              [
                {
                  alignment: 'right',
                  columns: [
                    {
                      text: 'Barcelona FS', bold: true
                    },
                    {
                      text: '1', style: 'gol'
                    }
                  ]
                },
                {
                  alignment: 'right',
                  columns: [
                    {
                      text: 'Real Madrid FS', bold: true
                    },
                    {
                      text: '3', style: 'gol'
                    }
                  ]
                }
              ],
              [{ text: 'Jugadores Titulares', colSpan: 2, alignment: 'center' }],
              [
                {
                  columns: [
                    {
                      width: 50,
                      text: 'Nº', bold: true
                    },
                    {
                      width: '*',
                      text: 'Jugador', alignment: 'center'
                    }
                  ]
                },
                {
                  columns: [
                    {
                      width: 50,
                      text: 'Nº', bold: true
                    },
                    {
                      width: '*',
                      text: 'Jugador', alignment: 'center'
                    }
                  ]
                },

              ],
              [
                {
                  columns: [
                    {
                      width: 50,
                      text: '14', bold: true
                    },
                    {
                      width: '*',
                      text: 'Maldonado Lopez', alignment: 'center'
                    }
                  ]
                },
                {
                  columns: [
                    {
                      width: 50,
                      text: '14', bold: true
                    },
                    {
                      width: '*',
                      text: 'Maldonado Perez', alignment: 'center'
                    }
                  ]
                },
              ],
              [
                {
                  columns: [
                    {
                      width: 50,
                      text: '14', bold: true
                    },
                    {
                      width: '*',
                      text: 'Maldonado Nunez', alignment: 'center'
                    }
                  ]
                }, {
                  columns: [
                    {
                      width: 50,
                      text: '14', bold: true
                    },
                    {
                      width: '*',
                      text: 'Maldonado Ojo', alignment: 'center'
                    }
                  ]
                },
              ],
              [{ text: 'Jugadores Suplentes', colSpan: 2, alignment: 'center' }],
              [
                {
                  columns: [
                    {
                      width: 50,
                      text: 'Nº', bold: true
                    },
                    {
                      width: '*',
                      text: 'Jugador', alignment: 'center'
                    }
                  ]
                },
                {
                  columns: [
                    {
                      width: 50,
                      text: 'Nº', bold: true
                    },
                    {
                      width: '*',
                      text: 'Jugador', alignment: 'center'
                    }
                  ]
                },

              ],
              [
                {
                  columns: [
                    {
                      width: 50,
                      text: '14', bold: true
                    },
                    {
                      width: '*',
                      text: 'Maldonado Lopez', alignment: 'center'
                    }
                  ]
                },
                {
                  columns: [
                    {
                      width: 50,
                      text: '14', bold: true
                    },
                    {
                      width: '*',
                      text: 'Maldonado Lopez', alignment: 'center'
                    }
                  ]
                },
              ],
              [
                {
                  columns: [
                    {
                      width: 50,
                      text: '14', bold: true
                    },
                    {
                      width: '*',
                      text: 'Maldonado Lopez', alignment: 'center'
                    }
                  ]
                }, {
                  columns: [
                    {
                      width: 50,
                      text: '14', bold: true
                    },
                    {
                      width: '*',
                      text: 'Maldonado Lopez', alignment: 'center'
                    }
                  ]
                },
              ],
              [{ text: 'Cuerpo Técnico', colSpan: 2, alignment: 'center' }],
              [
                {
                  columns: [
                    {
                      width: '*',
                      text: 'Delegado', bold: true
                    },
                    {
                      width: '*',
                      text: 'Maldonado Lopez', alignment: 'center'
                    }
                  ]
                }, {
                  columns: [
                    {
                      width: '*',
                      text: 'Entrenador', bold: true
                    },
                    {
                      width: '*',
                      text: 'Maldonado Lopez', alignment: 'center'
                    }
                  ]
                },
              ]
            ]
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex === 0 || rowIndex === 2) ? '#CCCCCC' : null;
            }
          }
        },
        {
          text: 'GOLES',
          alignment: 'center',
          bold: true,
          margin: [0, 15, 0, 15]
        },
        {
          style: 'tableInfo',
          table: {
            headerRows: 1,
            widths: [35, '*', 40, 35, '*', 40],
            body: [
              [
                { text: 'Dorsal', fillColor: '#CCCCCC', bold: true },
                { text: 'Jugador', fillColor: '#CCCCCC', bold: true },
                { text: 'Minuto', fillColor: '#CCCCCC', bold: true },
                { text: 'Dorsal', fillColor: '#CCCCCC', bold: true },
                { text: 'Jugador', fillColor: '#CCCCCC', bold: true },
                { text: 'Minuto', fillColor: '#CCCCCC', bold: true },
              ],
              [
                { text: '10' },
                { text: 'Antonio Perez', alignment: 'center' },
                { text: '7', alignment: 'center' },
                { text: '12' },
                { text: 'x', alignment: 'center' },
                { text: '7', alignment: 'center' }
              ],
              [
                { text: 'Segunda Parte' },
                { text: 'x', alignment: 'center' },
                { text: '7', alignment: 'center' },
                { text: 'Segunda Parte' },
                { text: 'x', alignment: 'center' },
                { text: '7', alignment: 'center' }
              ],
            ]
          },

        },
        {
          text: 'TIEMPOS MUERTOS Y FALTAS ACUMULATIVAS',
          alignment: 'center',
          bold: true,
          margin: [0, 5, 0, 15]
        },
        {
          style: 'tableInfo',
          table: {
            headerRows: 1,
            widths: [50, 50, '*', 50, 50, '*'],
            body: [
              [
                { text: '' },
                { text: 'Tiempo Muerto' },
                { text: 'Faltas Acumulativas' },
                { text: '' },
                { text: 'Tiempo Muerto' },
                { text: 'Faltas Acumulativas' }
              ],
              [
                { text: '1º Parte', fillColor: '#CCCCCC' },
                { text: 'x', alignment: 'center' },
                { text: '7', alignment: 'center' },
                { text: '2º Parte', fillColor: '#CCCCCC' },
                { text: 'x', alignment: 'center' },
                { text: '7', alignment: 'center' }
              ],
              [
                { text: '2º Parte', fillColor: '#CCCCCC' },
                { text: 'x', alignment: 'center' },
                { text: '7', alignment: 'center' },
                { text: '2º Parte', fillColor: '#CCCCCC' },
                { text: 'x', alignment: 'center' },
                { text: '7', alignment: 'center' }
              ],
            ]
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex === 0) ? '#CCCCCC' : null;
            }
          }
        },
        {
          text: 'AMONESTACIONES',
          alignment: 'center',
          bold: true,
          margin: [0, 15, 0, 15]
        },
        {

          columns: [
            {
              text: 'fff'


            },
            {
              text: 'fff'
            }
          ]
        },
        {
          text: 'EXPULSIONES',
          alignment: 'center',
          bold: true,
          margin: [0, 15, 0, 15]
        },
        {
          columns: [
            {
              text: 'fff\n dffdfdfdf\nsss'

            },
            {
              text: 'fff'
            }
          ]
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 5]
        },
        subheader: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 15]
        },
        headertable: {
          fontSize: 15,
          bold: true,

        },
        nombreEquipo: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 5, 0, 15]
        },
        tableInfo: {
          margin: [0, 0, 0, 15]
        },
        gol: {
          fontSize: 15,
          bold: true
        }
      }
    }

    objPdf = pdfMake.createPdf(dd).open();


  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        let dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
}
