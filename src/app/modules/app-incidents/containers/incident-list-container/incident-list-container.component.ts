import { Component, OnInit } from '@angular/core';

import { IncidentService } from '../../services/incident.service';
import { Store } from '../../store/store';
import { Incident } from '../../models/models';

@Component({
  selector: 'app-incident-list-container',
  template: `
    <app-incident-list
      class="incident-list"
      [incidents]="incidents"
    >

    </app-incident-list>
  `,
  styleUrl: './incident-list-container.component.css'
})
export class IncidentListContainer implements OnInit {
  incidents?: Incident[];

  constructor(
    private store: Store,
    private incidentService: IncidentService,
  ) {};

  ngOnInit(): void {
    this.incidentService.fetchIncidents();
    this.store.select('incidents').subscribe((incidents: Incident[]) => {
      this.incidents = incidents;
    });
  }
}
