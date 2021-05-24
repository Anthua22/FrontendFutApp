import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appTitsup]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TitsupDirective, multi: true }]
})
export class TitsupDirective implements Validator {
  @Input('appTitsup') names: string;
  constructor() { }
  validate(control: AbstractControl): { [key: string]: any } {
    if (control instanceof FormGroup) {
      const names = this.names.split(',');
      if (control.value[names[0]] === true && control.value[names[1]] === true) {
        return { 'matchTitSup': true };
      }
    }

    return null;
  }


}
