import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { INCIDENT_STEPPER, VALIDATOR_MAP } from '../../constants';
import { IncidentService } from '../../services/incident.service';
import { Store } from '../../store/store';
import { forkJoin, ObservableInput, take } from 'rxjs';
import { Incident } from '../../models/models';

@Component({
  selector: 'app-incident-container',
  template: `
    <div class="app-incident-container">
      <app-incident-menu
        (sectionSelected)="handleSectionSelected($event)"
        (stepSelected)="handleStepSelected($event)"
        [incident]="incident"
      ></app-incident-menu>
      <div>
        <app-incident-form
          [attr.inert]="(incident?.status?.includes('Review') || incident?.status === 'closed') ? true : undefined"
          [selectedSectionId]="selectedSectionId"
          [selectedSection]="selectedSection"
          [selectedStep]="selectedStep"
          [parentForm]="form"
          [incident]="incident"
          *ngIf="!loading"
        ></app-incident-form>
        <button
          mat-raised-button
          extended
          style="float: right; margin-right: 20px;"
          [disabled]="saveDisabled()"
          (click)="handleSave()"
          *ngIf="!selectedStep.id.includes('Review')"
        >
          Save
        </button>
        <button
          mat-raised-button
          extended
          style="float: right; margin-right: 20px;"
          [disabled]="promoteDisabled()"
          (click)="handlePromote()"
          *ngIf="selectedStep.id.includes('Review')"
        >
          Promote
        </button>
      </div>
      <div>
        <p>Selected Section: {{selectedSectionId}}</p>
        <p>Selected Step: {{selectedStep.id}}</p>
      </div>
    </div>
  `,
  styleUrl: './incident-container.component.css'
})
export class IncidentContainerComponent {
  loading: boolean = true;
  incidentId?: number;
  selectedSectionId?: string;
  selectedSection: any;
  selectedStep: any;
  form: FormGroup = this.fb.group({});
  subscriptions: Record<string, ObservableInput<any>> = {};
  incident?: Incident;
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.incidentId = params.incidentId;
      
      this.fetchResources(INCIDENT_STEPPER, this.incidentId);

      forkJoin(this.subscriptions).subscribe((res: any) => {
        this.incident = res.incident;
        this.generateFormGroups(INCIDENT_STEPPER, this.form, res);
        this.loading = false;
      });
    });
  }

  fetchResources(stepper: any, incidentId: number | undefined) {
    stepper.stepOrder?.forEach((step: any) => {
      if (stepper.steps[step].resource) {
        const resource: string = stepper.steps[step].resource;
        const upperCase: string = resource.charAt(0).toUpperCase() + resource.slice(1);
        // this is a little hacky but to illustrate the purpose of finding a universal approach
        (this.incidentService as any)[`fetch${upperCase}`](incidentId);
        this.subscriptions[resource] = this.store.select(resource).pipe(take(5));
      }
    });
  }

  generateFormGroups(stepper: any, formGroup: FormGroup, resources: any) {
    stepper.stepOrder?.forEach((step: any) => {
      if (stepper.steps[step].formControlOrder) {
        const controls: any = {};
        const resource = stepper.steps[step].resource;

        stepper.steps[step].formControlOrder.forEach((formControl: any) => {
          const { variable } = stepper.steps[step].formControls[formControl];
          const value = resources[resource] && resources[resource][variable];
          const validators = stepper.steps[step].formControls[formControl].validators?.map((v: string) => VALIDATOR_MAP[v]);
          controls[formControl] = [value || '', validators];
        });
        formGroup.addControl(step, this.fb.group(controls));
      }

      if (stepper.steps[step].stepOrder) {
        this.generateFormGroups(stepper.steps[step], formGroup, resources);
      }
    });
  }

  handleSectionSelected(event: any) {
    console.log('handleSectionSelected: ', event);
    this.selectedSectionId = event.selectedSectionId;
    this.selectedSection = event.selectedSection;
    this.selectedStep = event.selectedStep;
  }

  handleStepSelected(event: any) {
    console.log('handleStepSelected: ', event);
    this.selectedStep = event.selectedStep;
  }

  saveDisabled() {
    const selectedForm = this.form.get(this.selectedStep.id)
    const saveDisabled = selectedForm?.status === 'INVALID'
    || selectedForm?.pristine;

    return saveDisabled;
  }

  promoteDisabled() {
    let promoteDisabled = false;
    this.selectedSection.stepOrder.forEach((stepName:string) => {
      if (this.form.get(stepName)?.status === 'INVALID') {
        promoteDisabled = true;
      }
    });

    if (
      this.incident?.status.includes('Review')
      || this.incident?.status === 'closed'
    ) {
      promoteDisabled = true;
    }

    // meh
    return promoteDisabled;
  }

  handleSave() {
    const { resource } = this.selectedSection;
    const upperCase: string = resource.charAt(0).toUpperCase() + resource.slice(1);
    const selectedStepValues = this.form.get(this.selectedStep.id)?.value;

    (this.incidentService as any)[`update${upperCase}`]({id: this.incidentId, ...selectedStepValues});
  }

  handlePromote() {
    this.incidentService.promoteIncident({
      incidentId: this.incident?.id,
      reviewType: this.incident?.status + 'QaReview',
    });

    this.router.navigate(['/incidents'])
  }

}
