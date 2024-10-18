import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { StepperDemoComponent } from './stepper-demo.component';



@NgModule({
  declarations: [
    StepperDemoComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatStepperModule,
    MatExpansionModule,
    MatButtonModule
  ],
  exports: [
    StepperDemoComponent
  ]
})
export class StepperDemoModule { }
