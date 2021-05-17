import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {
  constructor(){

  }
  transform(value: Date): string {
    return moment(value).format('ll');

  }

}
