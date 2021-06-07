import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { FileOpener } from '@ionic-native/file-opener/ngx'
import { Plugins, FilesystemDirectory } from '@capacitor/core'
const { Filesystem, Share } = Plugins

import {
  Categoria,
  Partido,
  MiembroEquipo,
  Equipo,
} from 'src/app/models/models';


@Injectable({
  providedIn: 'root',
})
export class ActaService {
  partido: Partido;
  contentpdf: any;
  objPdf: any;
  logoFederacion =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Royal_Spanish_Football_Federation_logo.svg/1200px-Royal_Spanish_Football_Federation_logo.svg.png';

  constructor(private plt: Platform, private fileOpener: FileOpener) {
    moment.locale('es');
  }

  makePdf(partido: Partido) {
    this.partido = partido;
    return new Promise(async (resolve, reject) => {
      try {
        this.contentpdf = {
          pageSize: 'A4',
          content: [
            {
              image: await this.getBase64ImageFromURL(this.logoFederacion),
              fit: [60, 60],
              margin: [225, 0, 0, 10],
            },
            {
              text:
                this.partido.categoria != Categoria.FB
                  ? `${this.partido.categoria} División`
                  : this.partido.categoria,
              style: 'header',
            },
            {
              text: this.partido.jornada,
              style: 'subheader',
            },
            {
              alignment: 'center',
              columns: [
                {
                  image: await this.getBase64ImageFromURL(
                    this.partido.equipo_local.escudo
                  ),
                  fit: [100, 100],
                },
                {
                  image: await this.getBase64ImageFromURL(
                    this.partido.equipo_visitante.escudo
                  ),
                  fit: [100, 100],
                },
              ],
            },
            {
              alignment: 'center',
              columns: [
                {
                  text: this.partido.equipo_local.nombre,
                  style: 'nombreEquipo',
                },
                {
                  text: this.partido.equipo_visitante.nombre,
                  style: 'nombreEquipo',
                },
              ],
            },
            {
              text: 'Partido suspendido',
              color: '#E70020',
              margin: [0, 0, 0, 5],
            },
            {
              style: 'tableInfo',
              table: {
                headerRows: 1,
                widths: [100, 120, '*'],
                body: [
                  [
                    { text: 'Fecha Encuentro', bold: true },
                    { text: 'Hora Encuentro', bold: true },
                    { text: 'Lugar Encuentro', bold: true },
                  ],
                  [
                    moment(this.partido.fecha_encuentro).format('ll'),
                    moment(this.partido.fecha_encuentro).format('hh:mm A'),
                    this.partido.lugar_encuentro,
                  ],
                ],
              },
              layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                  return rowIndex === 0 ? '#CCCCCC' : null;
                },
              },
            },
            {
              table: this.getTablePrincipal(),
              layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                  return rowIndex === 0 || rowIndex === 2 || rowIndex === 9
                    ? '#CCCCCC'
                    : null;
                },
              },
            },
            {
              text: 'GOLES',
              alignment: 'center',
              bold: true,
              margin: [0, 15, 0, 15],
            },
            {
              style: 'tableInfo',
              table: this.getTableGoles(),
            },
          ],
          styles: {
            header: {
              fontSize: 20,
              bold: true,
              alignment: 'center',
              margin: [0, 0, 0, 5],
            },
            subheader: {
              fontSize: 18,
              bold: true,
              alignment: 'center',
              margin: [0, 0, 0, 15],
            },
            headertable: {
              fontSize: 15,
              bold: true,
            },
            nombreEquipo: {
              fontSize: 16,
              bold: true,
              alignment: 'center',
              margin: [0, 5, 0, 15],
            },
            tableInfo: {
              margin: [0, 0, 0, 15],
            },
            gol: {
              fontSize: 15,
              bold: true,
            },
          },
        };
        const pdf = pdfMake.createPdf(this.contentpdf);
        if (this.plt.is('capacitor')) {
          pdf.getBase64(async (data) => {
            let path = `pdf/${new Date()}.pdf`;
            const result = await Filesystem.writeFile({
              path,
              data,
              directory: FilesystemDirectory.Documents,
              recursive: true
            });
            resolve(this.fileOpener.open(`${result.uri}`,'application/pdf'));
          })
        }else{
          resolve(pdf.open());
        }

      } catch (error) {
        reject(error);
      }
    });
  }

  private getTablePrincipal() {
    let table = {
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
                text: this.partido.equipo_local.nombre,
                bold: true,
              },
              {
                text: this.partido.resultado.split('-')[0],
                style: 'gol',
              },
            ],
          },
          {
            alignment: 'right',
            columns: [
              {
                text: this.partido.equipo_visitante.nombre,
                bold: true,
              },
              {
                text: this.partido.resultado.split('-')[1],
                style: 'gol',
              },
            ],
          },
        ],
        [{ text: 'Jugadores Titulares', colSpan: 2, alignment: 'center' }],
        [
          {
            columns: [
              {
                width: 50,
                text: 'Nº',
                bold: true,
              },
              {
                width: '*',
                text: 'Jugador',
                alignment: 'center',
              },
            ],
          },
          {
            columns: [
              {
                width: 50,
                text: 'Nº',
                bold: true,
              },
              {
                width: '*',
                text: 'Jugador',
                alignment: 'center',
              },
            ],
          },
        ],
      ],
    };
    const contadorTitu =
      this.partido.titularesLocales.length >=
        this.partido.titularesVisitantes.length
        ? this.partido.titularesLocales.length
        : this.partido.titularesVisitantes.length;
    for (let i = 0; i < contadorTitu; i++) {
      table.body.push(
        this.addRowTableJugador(
          this.partido.titularesLocales[i],
          this.partido.titularesVisitantes[i]
        )
      );
    }
    if (
      (this.partido.suplentesLocales || this.partido.suplentesVisitantes) &&
      (this.partido.suplentesLocales.length > 0 ||
        this.partido.suplentesVisitantes.length > 0)
    ) {
      table.body.push([
        { text: 'Jugadores Suplentes', colSpan: 2, alignment: 'center' },
      ]);
      table.body.push([
        {
          columns: [
            {
              width: 50,
              text: 'Nº',
              bold: true,
            },
            {
              width: '*',
              text: 'Jugador',
              alignment: 'center',
            },
          ],
        },
        {
          columns: [
            {
              width: 50,
              text: 'Nº',
              bold: true,
            },
            {
              width: '*',
              text: 'Jugador',
              alignment: 'center',
            },
          ],
        },
      ]);
      const contadorSup =
        this.partido.suplentesLocales.length >=
          this.partido.suplentesVisitantes.length
          ? this.partido.suplentesLocales.length
          : this.partido.suplentesVisitantes.length;

      for (let i = 0; i < contadorSup; i++) {
        table.body.push(
          this.addRowTableJugador(
            this.partido.suplentesLocales[i],
            this.partido.suplentesVisitantes[i]
          )
        );
      }
    }
    table.body.push([
      { text: 'Cuerpo Técnico', colSpan: 2, alignment: 'center' },
    ]);
    const contadorStaff =
      this.partido.staffLocal.length >= this.partido.staffVistante.length
        ? this.partido.staffLocal.length
        : this.partido.staffVistante.length;
    for (let i = 0; i < contadorStaff; i++) {
      table.body.push(
        this.addRowTableStaff(
          this.partido.staffLocal[i],
          this.partido.staffVistante[i]
        )
      );
    }

    return table;
  }

  private addRowTableJugador(
    miembroLocal: MiembroEquipo,
    miembroVisitante: MiembroEquipo
  ) {
    let rowTitu = [];
    rowTitu.push({
      columns: [
        {
          width: 50,
          text: miembroLocal ? miembroLocal.dorsal : '--',
          bold: true,
        },
        {
          width: '*',
          text: miembroLocal
            ? miembroLocal.nombre_completo.split('-').join(' ')
            : '------',
          alignment: 'center',
        },
      ],
    });
    rowTitu.push({
      columns: [
        {
          width: 50,
          text: miembroVisitante ? miembroVisitante.dorsal : '--',
          bold: true,
        },
        {
          width: '*',
          text: miembroVisitante
            ? miembroVisitante.nombre_completo.split('-').join(' ')
            : '------',
          alignment: 'center',
        },
      ],
    });
    return rowTitu;
  }

  private addRowTableStaff(
    miembroLocal: MiembroEquipo,
    miembroVisitante: MiembroEquipo
  ) {
    let rowTitu = [];
    rowTitu.push({
      columns: [
        {
          width: '*',
          text: miembroLocal ? this.getCargoStaff(miembroLocal.rol) : '--',
          bold: true,
        },
        {
          width: '*',
          text: miembroLocal
            ? miembroLocal.nombre_completo.split('-').join(' ')
            : '------',
          alignment: 'center',
        },
      ],
    });
    rowTitu.push({
      columns: [
        {
          width: '*',
          text: miembroVisitante
            ? this.getCargoStaff(miembroVisitante.rol)
            : '----',
          bold: true,
        },
        {
          width: '*',
          text: miembroVisitante
            ? miembroVisitante.nombre_completo.split('-').join(' ')
            : '------',
          alignment: 'center',
        },
      ],
    });
    return rowTitu;
  }

  private getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        let dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

  private getCargoStaff(rol: string): string {
    switch (rol) {
      case 'JUGADOR':
        return 'Jugador';
      case 'ENTRENADOR':
        return 'Entrenador';
      case 'DELEGADO':
        return 'Delegado';
      case 'ENCARGADO_MATERIAL':
        return 'Encargado Material';
      case 'PREPARADOR_FISICO':
        return 'Preparador Físico';
    }
  }

  private getTableGoles() {
    let table = {
      headerRows: 1,
      // dontBreakRows: true,
      // keepWithHeaderRows: 1,
      widths: [35, '*', 40, 35, '*', 40],
      body: [
        [
          { text: 'Dorsal', fillColor: '#CCCCCC', bold: true },
          { text: 'Jugador', fillColor: '#CCCCCC', bold: true },
          { text: 'Nº', fillColor: '#CCCCCC', bold: true, alignment: 'center' },
          { text: 'Dorsal', fillColor: '#CCCCCC', bold: true },
          { text: 'Jugador', fillColor: '#CCCCCC', bold: true },
          { text: 'Nº', fillColor: '#CCCCCC', bold: true, alignment: 'center' },
        ],
      ],
    };
    const miembrosGolesLocales = this.getMiembrosGOles(
      this.partido.equipo_local
    );
    const miembrosGolesVisitantes = this.getMiembrosGOles(
      this.partido.equipo_visitante
    );

    const contadorMax =
      miembrosGolesLocales.length > miembrosGolesVisitantes.length
        ? miembrosGolesLocales.length
        : miembrosGolesVisitantes.length;

    for (let i = 0; i < contadorMax; i++) {
      table.body.push(
        this.addRowTableGoles(
          miembrosGolesLocales[i],
          miembrosGolesVisitantes[i],
          i
        )
      );
    }
    return table;
  }

  private addRowTableGoles(
    miembroLocal: MiembroEquipo,
    miembroVisitante: MiembroEquipo,
    i: number
  ) {
    let rowGoles = [];
    rowGoles.push(
      {
        text: miembroLocal && miembroLocal.goles ? miembroLocal.dorsal : '--',
      },
      {
        text:
          miembroLocal && miembroLocal.goles
            ? miembroLocal.nombre_completo.split('-').join(' ')
            : '-----',
        alignment: 'center',
      },
      {
        text:
          miembroLocal && miembroLocal.goles ? miembroLocal.goles.length : '--',
        alignment: 'center',
      },
      {
        text:
          miembroVisitante && miembroVisitante.goles
            ? miembroVisitante.dorsal
            : '--',
      },
      {
        text:
          miembroVisitante && miembroVisitante.goles
            ? miembroVisitante.nombre_completo.split('-').join(' ')
            : '-----',
        alignment: 'center',
      },
      {
        text:
          miembroVisitante && miembroVisitante.goles
            ? miembroVisitante.goles.length
            : '--',
        alignment: 'center',
      }
    );

    return rowGoles;
  }

  private getMiembrosGOles(equipo: Equipo) {
    let miembros: MiembroEquipo[] = [];
    console.log(equipo);
    equipo.miembros.forEach((x) => {
      if (x.rol === 'JUGADOR' && x.goles) {
        miembros.push(x);
      }
    });
    return miembros;
  }

  private getAmonestaciones() {
    //   this.partido.sa
  }

  private cantidadGoles(miembros: MiembroEquipo[]) {
    let contador = 0;
    miembros.forEach((x) => {
      contador += x.goles.length;
    });
    return contador;
  }



}
