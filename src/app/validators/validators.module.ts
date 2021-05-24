import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchDirective } from './match.directive';
import { TitsupDirective } from './titsup.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MatchDirective,
    TitsupDirective
  ],
  exports: [
    MatchDirective,
    TitsupDirective
  ]
})
export class ValidatorsModule { }
