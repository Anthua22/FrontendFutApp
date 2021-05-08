import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {
  constructor(){
    moment.locale('es');
  }
  transform(value: Date): string {
    return moment(value).format('hh:mm A');
  }

}
