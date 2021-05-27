import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerNombrecargo'
})
export class ObtenerNombrecargoPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'ENCARGADO_MATERIAL':
        return 'ENCARGADO MATERIAL';
      case 'PREPARADOR_FISICO':
        return 'PREPARADOR FÍSICO';
      default:
        return value;
    }
  }

}
