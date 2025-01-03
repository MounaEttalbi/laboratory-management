import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatUpdateComponent } from './resultat-update.component';

describe('ResultatUpdateComponent', () => {
  let component: ResultatUpdateComponent;
  let fixture: ComponentFixture<ResultatUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultatUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
