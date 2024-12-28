import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseFormComponent } from './analyse-form.component';

describe('AnalyseFormComponent', () => {
  let component: AnalyseFormComponent;
  let fixture: ComponentFixture<AnalyseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
