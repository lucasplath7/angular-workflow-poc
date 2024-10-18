import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-new-incident-dialog',
  template: `
    <mat-dialog-content>
      <form [formGroup]="incidentForm" style="display: flex; flex-direction: column;">
        <mat-form-field>
          <mat-label>Incident Name:</mat-label>
          <input
            matInput
            type="text"
            id="name"
            formControlName="name"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Description:</mat-label>
          <textarea
            matInput
            id="description"
            formControlName="description"
          ></textarea>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Type:</mat-label>
          <mat-select
            type="option"
            id="type"
            formControlName="type"
          >
            <mat-option value="data quality">Data Quality</mat-option>
            <mat-option value="other">Other</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
      <button (click)="handleSubmit($event)">Submit</button>
    </mat-dialog-content>
  `,
  styleUrl: './new-incident-dialog.component.css'
})
export class NewIncidentDialogComponent {
  incidentForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    type: ['', Validators.required]
  });;


  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  handleSubmit(event: Event) {
    this.incidentService.createIncident(this.incidentForm.value);
  }
}
