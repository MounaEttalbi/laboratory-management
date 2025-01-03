import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisDetailsComponent } from './analysis-details.component';

describe('AnalysisDetailsComponent', () => {
  let component: AnalysisDetailsComponent;
  let fixture: ComponentFixture<AnalysisDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalysisDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
