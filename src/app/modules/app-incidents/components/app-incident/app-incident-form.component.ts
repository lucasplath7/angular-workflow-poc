import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-incident-form',
  template: `
    <!-- <p>Selected Section: {{selectedSectionId}}</p>
    <p>Selected Step: {{selectedStep.id}}</p> -->
    <form
      class="selected-form"
      [formGroup]="parentForm.controls[selectedStep.id]"
    >
      <ng-container *ngFor="let formControl of selectedStep.formControlOrder">
        <ng-container [ngSwitch]="selectedStep.formControls[formControl].type">
          
        <ng-container *ngSwitchCase="'text'">
            <mat-form-field>
              <mat-label>{{ selectedStep.formControls[formControl].label }}</mat-label>
              <input
                matInput
                type="text"
                [id]="formControl"
                [formControlName]="formControl"
              />
            </mat-form-field>
          </ng-container>
          
          <ng-container *ngSwitchCase="'textArea'">
            <mat-form-field>
              <mat-label>{{ selectedStep.formControls[formControl].label }}</mat-label>
              <textarea
                matInput
                [id]="formControl"
                [formControlName]="formControl"
              ></textarea>
            </mat-form-field>
          </ng-container>
          
          <ng-container *ngSwitchCase="'select'">
            <mat-form-field>
              <mat-label>{{ selectedStep.formControls[formControl].label }}</mat-label>
              <mat-select
                type="option"
                [id]="formControl"
                [formControlName]="formControl"
              >
                <mat-option *ngFor="let option of selectedStep.formControls[formControl].options" [value]="option">{{ option }}</mat-option>
              </mat-select>
            </mat-form-field>
          </ng-container>

          <ng-container *ngSwitchCase="'radio'">
            <mat-label>{{ selectedStep.formControls[formControl].label }}</mat-label>
            <mat-radio-group  [id]="formControl" [formControlName]="formControl">
              <mat-radio-button 
                *ngFor="let option of selectedStep.formControls[formControl].options"
                [value]="option"
              >
                {{ option }}
              </mat-radio-button>
            </mat-radio-group>
          </ng-container>

          <ng-container *ngSwitchCase="'review'">
              <mat-label>{{ selectedStep.formControls[formControl].label }}</mat-label>
              <pre> {{ parentForm.value | review : selectedSection | json }} </pre>
          </ng-container>

        </ng-container>
      </ng-container>
    </form>
  `,
  styleUrl: './app-incident-form.component.css'
})
export class AppIncidentFormComponent implements OnInit {
  @Input() selectedSectionId?: string;
  @Input() selectedSection: any;
  @Input() selectedStep: any;
  @Input() parentForm: any;
  @Input() incident: any;
  reviewValues: any;

  constructor(
    private renderer: Renderer2
  ) {
    
  }

  ngOnInit(): void {
    console.log('selected step in form: ', this.selectedStep)

  }


}
