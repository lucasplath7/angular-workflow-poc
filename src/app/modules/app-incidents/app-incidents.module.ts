import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio';
import { MatLabel } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatOption } from '@angular/material/select';
import { MatSelect } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table'
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppIncidentListComponent, IncidentTable } from './components/app-incident-list/app-incident-list.component';
import { AppIncidentsComponent } from './app-incidents.component';
import { DeleteButton, PromoteButton, TableDataPipe } from './components/app-incident-list/tableData.pipe';
import { IncidentListContainer } from './containers/incident-list-container/incident-list-container.component';
import { IncidentService } from './services/incident.service';
import { NewIncidentDialogComponent } from './components/new-incident-dialog/new-incident-dialog.component';
import { Store } from './store/store';
import { AppIncidentFormComponent } from './components/app-incident/app-incident-form.component';
import { AppIncidentMenuComponent } from './components/app-incident/app-incident-menucomponent';
import { IncidentContainerComponent } from './containers/incident-container/incident-container.component';
import { ReviewPipe } from './components/app-incident/review.pipe';


@NgModule({
  declarations: [
    AppIncidentListComponent,
    AppIncidentsComponent,
    AppIncidentFormComponent,
    AppIncidentMenuComponent,
    IncidentContainerComponent,
    DeleteButton,
    PromoteButton,
    IncidentListContainer,
    IncidentTable,
    NewIncidentDialogComponent,
    TableDataPipe,
    ReviewPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatLabel,
    MatMenuModule,
    MatOption,
    MatRadioModule,
    MatSelect,
    MatStepperModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    AppIncidentsComponent,
  ],
  providers: [
    IncidentService,
    Store,
  ]
})
export class AppIncidentsModule { }
