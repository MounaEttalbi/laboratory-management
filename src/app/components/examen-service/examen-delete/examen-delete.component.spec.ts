import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenDeleteComponent } from './examen-delete.component';

describe('ExamenDeleteComponent', () => {
  let component: ExamenDeleteComponent;
  let fixture: ComponentFixture<ExamenDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamenDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
