import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentListContainerComponent } from './incident-list-container.component';

describe('IncidentListContainerComponent', () => {
  let component: IncidentListContainerComponent;
  let fixture: ComponentFixture<IncidentListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncidentListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
