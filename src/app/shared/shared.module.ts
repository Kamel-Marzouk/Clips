import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideEnvironmentNgxMask, NgxMaskDirective } from 'ngx-mask';

import { ModalComponent } from './modal/modal.component';
import { TapsContainerComponent } from './taps-container/taps-container.component';
import { TapComponent } from './tap/tap.component';
import { InputComponent } from './input/input.component';
import { AlertComponent } from './alert/alert.component';
import { EventBlockerDirective } from './directives/event-blocker.directive';



@NgModule({
  declarations: [
    ModalComponent,
    TapsContainerComponent,
    TapComponent,
    InputComponent,
    AlertComponent,
    EventBlockerDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  exports: [
    ModalComponent,
    TapsContainerComponent,
    TapComponent,
    InputComponent,
    AlertComponent,
    EventBlockerDirective
  ],
  providers: [provideEnvironmentNgxMask()]
})
export class SharedModule { }
