import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIncidentDialogComponent } from './new-incident-dialog.component';

describe('NewIncidentDialogComponent', () => {
  let component: NewIncidentDialogComponent;
  let fixture: ComponentFixture<NewIncidentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewIncidentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewIncidentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
