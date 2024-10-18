import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


import { AppSpinner } from '../../basics/app-spinner/app-spinner.component';
import { AppTable } from '../../basics/app-table/app-table.component';
import { UserForm } from './app-users.component';
import { AddUserDialog } from './app-users.component';
import { AppUsers } from './app-users.component';




@NgModule({
  declarations: [
    AppSpinner,
    AppTable,
    UserForm,
    AddUserDialog,
    AppUsers
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    AppUsers
  ]
})
export class AppUsersModule { }
