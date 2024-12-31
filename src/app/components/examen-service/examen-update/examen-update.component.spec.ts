import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenUpdateComponent } from './examen-update.component';

describe('ExamenUpdateComponent', () => {
  let component: ExamenUpdateComponent;
  let fixture: ComponentFixture<ExamenUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamenUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
