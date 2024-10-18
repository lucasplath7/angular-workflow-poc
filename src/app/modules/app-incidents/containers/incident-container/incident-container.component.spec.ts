import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentContainerComponent } from './incident-container.component';

describe('IncidentContainerComponent', () => {
  let component: IncidentContainerComponent;
  let fixture: ComponentFixture<IncidentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncidentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
