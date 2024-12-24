import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierEditComponent } from './dossier-edit.component';

describe('DossierEditComponent', () => {
  let component: DossierEditComponent;
  let fixture: ComponentFixture<DossierEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DossierEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
