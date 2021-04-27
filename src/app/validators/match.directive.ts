import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchDirective, multi: true}]
})
export class MatchDirective implements Validator{

  @Input('appMatch') names: string;

  constructor() { }

  validate(group: AbstractControl): { [key: string]: any } {
    if (group instanceof FormGroup) {

      const names = this.names.split(',');
      const val = group.value[names[0]];
      if (!names.every(name => group.value[name] === val)) {
        return { 'match': true };
      }
    }

    return null;
  }

}
