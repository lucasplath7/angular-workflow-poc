import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIncidentListComponent } from './app-incident-list.component';

describe('AppIncidentListComponent', () => {
  let component: AppIncidentListComponent;
  let fixture: ComponentFixture<AppIncidentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppIncidentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppIncidentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
