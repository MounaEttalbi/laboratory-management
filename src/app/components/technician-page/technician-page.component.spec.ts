import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianPageComponent } from './technician-page.component';

describe('TechnicianPageComponent', () => {
  let component: TechnicianPageComponent;
  let fixture: ComponentFixture<TechnicianPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnicianPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
