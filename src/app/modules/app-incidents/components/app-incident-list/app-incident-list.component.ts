import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewIncidentDialogComponent } from '../new-incident-dialog/new-incident-dialog.component';
import { Incident } from '../../models/models';

@Component({
  selector: 'app-incident-list',
  template: `
    <div class="list-banner">
      <button
        mat-button
        style="float: right; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);"
        (click)="handleOpenAddIncidentDialog()"
      >
        <mat-icon style="color: #9DC384; transform: scale(3)">add_box</mat-icon>
      </button>
    </div>

    <incident-table
      *ngIf="incidents"
      style="width: 80% !important;"
      [incidentsTableData]="incidents | tableData"
    ></incident-table>

  `,
  styleUrl: './app-incident-list.component.css'
})
export class AppIncidentListComponent {
  @Input() incidents?: Incident[];
  dialog = inject(MatDialog);
  
  handleOpenAddIncidentDialog() {
    this.dialog.open(NewIncidentDialogComponent);
  }
}

@Component({
  selector: 'incident-table',
  template: `
  <table mat-table [dataSource]="incidentsTableData" class="mat-elevation-z8">
    <ng-container *ngFor="let column of columns" [matColumnDef]="column">
      <th mat-header-cell *matHeaderCellDef> {{ column }} </th>
      <ng-container [ngSwitch]="column">
        
        <ng-container *ngSwitchCase="'delete'">
          <td mat-cell *matCellDef="let incident">
            <ng-template *ngComponentOutlet="incident[column], inputs: {incidentId: incident.id}" />
          </td>
        </ng-container>

        <ng-container *ngSwitchCase="'review'">
          <td mat-cell *matCellDef="let incident">
            <ng-template *ngComponentOutlet="incident[column], inputs: {incident: incident}" />
          </td>
        </ng-container>
        
        <ng-container *ngSwitchCase="'id'">
          <td mat-cell  *matCellDef="let incident">
            <a
              [routerLink]="[incident[column]]"
              routerLinkActive="active"
            >
              {{incident[column]}}
            </a>
          </td>
        </ng-container>
        
        <ng-container *ngSwitchDefault>
          <td mat-cell  *matCellDef="let incident"> {{incident[column]}} </td>
        </ng-container>
      
      </ng-container>      
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="columns"></tr>
    <tr mat-row *matRowDef="let row; columns: columns;"></tr>
  </table>
  `,
  styleUrl: './app-incident-list.component.css'
})
export class IncidentTable {
  @Input() incidentsTableData: any;
  columns = ['id', 'name', 'status', 'delete', 'review']
}
