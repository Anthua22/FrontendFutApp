import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apellidoNombre'
})
export class ApellidoNombrePipe implements PipeTransform {

  transform(value: string): string {
    let nombreArray = [];
    if (value.includes(' ')) {
      nombreArray = value.split(' ');
    } else {
      nombreArray = value.split('-');
    }
    return `${nombreArray[1]} ${nombreArray[0]}`;
  }

}
