import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckmarkPipe } from './checkmark/checkmark.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    CheckmarkPipe
  ],
  declarations: [
    CheckmarkPipe
  ]
})
export class SharedModule { }
