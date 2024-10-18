import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIncidentsComponent } from './app-incidents.component';

describe('AppIncidentsComponent', () => {
  let component: AppIncidentsComponent;
  let fixture: ComponentFixture<AppIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppIncidentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
