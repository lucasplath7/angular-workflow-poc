import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/models';


@Pipe({
  name: 'tableData'
})
export class TableDataPipe implements PipeTransform {
  
  transform(rawData: Incident[]) {
    return rawData.map((incident) => {
      return {
        ...incident,
        delete: DeleteButton,
        review: PromoteButton
      }
    });
  }
}

@Component({
  selector: 'delete-button',
  template: `
  <button
    mat-button
    (click)="handleClick()"
  >
    <mat-icon style="color: #D16D6A;">remove_circle</mat-icon>
  </button>
  `,
  styleUrl: './app-incident-list.component.css'
})
export class DeleteButton {
  @Input() incidentId?: number;

  constructor(private incidentService: IncidentService) {
  }

  handleClick() {
    console.log('delete inc #: ', this.incidentId)
    this.incidentService.deleteIncident(this.incidentId);
  }
}

@Component({
  selector: 'promote-button',
  template: `
  <div *ngIf="incident?.status?.includes('Review')"> 
    <button
      mat-button
      [disabled]="!incident?.status?.includes('Review')"
      (click)="handleApprove()"
    >
      <mat-icon style="color: #78A75A;">arrow_upward</mat-icon>
    </button>
    <button
      mat-button
      [disabled]="!incident?.status?.includes('Review')"
      (click)="handleReject()"
    >
      <mat-icon style="color: #992B15;">arrow_downward</mat-icon>
    </button>
  </div>
  `,
  styleUrl: './app-incident-list.component.css'
})
export class PromoteButton {
  @Input() incident: any;

  constructor(private incidentService: IncidentService) {
  }

  handleApprove() {
    this.incidentService.updateQaReview({
      incidentId: this.incident.id,
      reviewType: this.incident.status,
      decision: 'approve'
    });
  }

  handleReject() {
    this.incidentService.updateQaReview({
      incidentId: this.incident.id,
      reviewType: this.incident.status,
      decision: 'reject'
    });
  }
}