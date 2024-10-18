import { Component, inject, Input } from '@angular/core';
import {
  MatDialog,
  // MAT_DIALOG_DATA,
  // MatDialogTitle,
  // MatDialogContent,
} from '@angular/material/dialog';

import { UsersService } from '../../services/users-service.service';
// import { AppSpinner } from '../../basics/app-spinner/app-spinner.component';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-test-button',
  template: `<button (click)="handlers.handleDeleteUser($event)">X</button>`,
  styleUrl: './app-users.component.css'
})
export class TestButton {
  constructor(public usersService: UsersService) {
  }
  @Input() handlers: any;
}

@Component({
  selector: 'user-form',
  template: `
    <form
    id="app-form"
    [formGroup]="userForm"
    (ngSubmit)="$event.preventDefault(); handleAddUser($event)"
    class="app-form"
    >
      <label>First Name:</label>
      <input
        type="text"
        id="firstName"
        formControlName="firstName"
      />
      <label>Last Name:</label>
      <input
        type="text"
        id="lastName"
        formControlName="lastName"
      />
      <label>Email:</label>
      <input
        type="text"
        id="email"
        formControlName="email"
      />
      <input
        type="submit"
        value="Submit"
        wrap="hard"
      />
    </form>
  `,
  styleUrl: './app-users.component.css'
})
export class UserForm {
  dialog = inject(MatDialog);

  constructor(public usersService: UsersService) {

  }

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

  handleAddUser(event: any) {
    this.usersService.createUser(this.userForm.value);
  }
}

@Component({
  selector: 'add-user-dialog',
  template: `
    <mat-dialog-content>
      <div>TEST</div>
      <app-spinner *ngIf="creatingUser"></app-spinner>
      <user-form *ngIf="!creatingUser"></user-form>
    </mat-dialog-content>    
    `,
  styleUrl: './app-users.component.css'
})
export class AddUserDialog {
  @Input() addUserDialogOpen: any = false;
  @Input() creatingUser: any = false;

  constructor(public usersService: UsersService) {

  }
}

@Component({
  selector: 'app-users',
  templateUrl: './app-users.component.html',
  styleUrl: './app-users.component.css'
})
export class AppUsers {
  usersTableData = null;
  fetchingUsersData = false;
  addUserDialogOpen = false;
  creatingUser = false;
  deletingUser = false;
  userError = false;
  dialog = inject(MatDialog);

  constructor(public usersService: UsersService) {
    this.usersService.creatingUser$.subscribe(res => this.creatingUser = res);
  }

  handleOpenAddUserDialog(event: any) {
    // this.addUserDialogOpen = true;
    this.dialog.open(AddUserDialog)
  }

  ngOnInit() {
    this.usersService.fetchAllUsersRequest();
    this.usersService.allUsersData$.subscribe((users: any) => {
      if (!(users.length > 0)) return;
      console.log('usres in observer', users)
      this.usersTableData = users.map((user: any) => {
            
            const userRecord: any = Object.entries(user).map((userEntry: any) => {
              return {
                columnName: userEntry[0],
                value: userEntry[1],
                isElement: false,
              }
            });
    
            userRecord.push({
              handlers: {
                handleDeleteUser: () => {this.usersService.deleteUser(user.id)},
              },          
              columnName: '',
              value: TestButton,
              isElement: true,
            });
    
            return userRecord;
          });
    })
  }
}