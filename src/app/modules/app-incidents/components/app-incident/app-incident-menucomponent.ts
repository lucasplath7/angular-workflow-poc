import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INCIDENT_STEPPER } from '../../constants';

const STATUS_MAP = {
  incident: {
    dependsOn: [],
  },
  discovery: {
    dependsOn: ['incident', 'discovery'],
  },
  discoveryQaReview: {
    dependsOn: ['incident', 'discovery'],
  },
  actionPlan: {
    dependsOn: ['incident', 'discovery', 'actionPlan'],
  },
  actionPlanQaReview: {
    dependsOn: ['incident', 'discovery', 'actionPlan'],
  },
  implementation: {
    dependsOn: ['incident', 'discovery', 'actionPlan', 'implementation'],
  },
  implementationQaReview: {
    dependsOn: ['incident', 'discovery', 'actionPlan', 'implementation'],
  },
  closed: {
    dependsOn: ['incident', 'discovery', 'actionPlan', 'implementation'],
  }
}

@Component({
  selector: 'app-incident-menu',
  template: `
    <ng-container *ngTemplateOutlet="stepAccordion; context: {$implicit: stepper}"></ng-container>
    
    <ng-template #stepAccordion let-step>
      <ng-container *ngFor="let nextStep of step.stepOrder">
        <button
          mat-raised-button
          extended
          *ngIf="!step.steps[nextStep].stepOrder"
          style="display:block; width: 100%; text-align: left"
          (click)="selectStep(step.steps[nextStep], $event)"
        >
          {{ step.steps[nextStep].stepLabel }}
        </button>

        <mat-accordion *ngIf="step.steps[nextStep].stepOrder">
          <mat-expansion-panel
            [disabled]="menuSectionDisabled(nextStep)"
            [expanded]="step.steps[nextStep].id === selectedSectionId || childIsExpanded(step.steps[nextStep])"
            (click)="!menuSectionDisabled(nextStep) && selectSection(step.steps[nextStep], $event)"
          >   
            <mat-expansion-panel-header >
              <mat-panel-title> {{ step.steps[nextStep].stepLabel }} </mat-panel-title>
            </mat-expansion-panel-header>
            <ng-container *ngTemplateOutlet="stepAccordion; context: {$implicit: step.steps[nextStep]}"></ng-container>
          </mat-expansion-panel>
        </mat-accordion>

      </ng-container>
    </ng-template>
  `,
  styleUrl: './app-incident-menu.component.css'
})
export class AppIncidentMenuComponent implements OnInit {
  @Output() sectionSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() stepSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input() incident: any;
  stepper: any = INCIDENT_STEPPER;
  sectionMap: any = STATUS_MAP;
  substepIndex: number = -1;
  selectedSectionId: string = '';
  selectedSection: any;
  selectedStepId: string = '';
  selectedStep: any;

  ngOnInit() {
    this.selectSection(this.stepper.steps[this.stepper.stepOrder[0]]);
  }

  selectSection(section: any, event: any = undefined) {
    event && event.stopPropagation();
    this.selectedSectionId = section.id;
    this.selectedSection = section;
    this.selectedStepId = section.stepOrder[0];
    this.selectedStep = section.steps[this.selectedStepId];

    this.sectionSelected.emit({
      selectedSectionId: this.selectedSectionId,
      selectedSection: this.selectedSection,
      selectedStep: this.selectedStep
    });
  }

  selectStep(step: any, event: Event) {
    event.stopPropagation();
    this.selectedStepId = step.id;
    this.stepSelected.emit({selectedStep: step});
  }

  childIsExpanded(section: any): boolean {
    if (section.steps && Object.keys(section.steps).includes(this.selectedSectionId)) {
      return true;
    }

    return false;
  }

  menuSectionDisabled(step: string) {
    return !this.sectionMap[this.incident?.status]?.dependsOn.includes(step);
  }
}
