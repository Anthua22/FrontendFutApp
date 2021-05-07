import { Observable } from 'rxjs';
import { PartidosService } from './../services/partidos.service';
import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/models/models';
import { ActivatedRoute } from '@angular/router';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-partido',
  templateUrl: './detalle-partido.page.html',
  styleUrls: ['./detalle-partido.page.scss'],
})
export class DetallePartidoPage implements OnInit {
  partido:Partido;
  partido$:Observable<Partido>;
  data= false;

  constructor(private partidoService:PartidosService, private route:ActivatedRoute) {
    this.partido$ = this.partidoService.getPartido(this.route.snapshot.params.id).pipe(shareReplay(1));
  }

  ngOnInit() {

    this.partido$.subscribe(
      partido =>{ this.partido = partido;
         setTimeout(()=>{
           this.data = true;
         }, 1000)
        console.log(this.partido)}
    );
  }

  getPartido():Observable<Partido> {
    return this.partido$;
  }

}
