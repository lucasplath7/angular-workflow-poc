import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainContent } from './layout/app-main-content/app-main-content.component';
import { AppHome } from './modules/app-home/app-home.component';
import { AppSpinner } from './basics/app-spinner/app-spinner.component';
import { AppUsers } from './modules/app-users/app-users.component';
import { StepperDemoComponent } from './modules/stepper-demo/stepper-demo.component';
import { IncidentContainerComponent } from './modules/app-incidents/containers/incident-container/incident-container.component';
import { IncidentListContainer } from './modules/app-incidents/containers/incident-list-container/incident-list-container.component';

const routes: Routes = [
  {
    path: '',
    component: AppMainContent,
    children: [
      {
        path: '',
        title: 'Home',
        component: AppHome,
      },
      {
        path: 'spinner',
        title: 'Spinner',
        component: AppSpinner,
      },
      {
        path: 'users',
        title: 'Users',
        component: AppUsers,
        loadChildren: () => import('./modules/app-users/app-users.module').then(m => m.AppUsersModule)
      },
      {
        path: 'stepperDemo',
        title: 'Incidents',
        component: StepperDemoComponent,
        loadChildren: () => import('./modules/stepper-demo/stepper-demo.module').then(m => m.StepperDemoModule)
      },
      {
        path: 'incidents',
        title: 'Incidents',
        component: IncidentListContainer,
        loadChildren: () => import('./modules/app-incidents/app-incidents.module').then(m => m.AppIncidentsModule)
      },
      {
        path: 'incidents/:incidentId',
        title: 'Incidents',
        component: IncidentContainerComponent,
        loadChildren: () => import('./modules/app-incidents/app-incidents.module').then(m => m.AppIncidentsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
