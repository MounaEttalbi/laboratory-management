import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierDeleteComponent } from './dossier-delete.component';

describe('DossierDeleteComponent', () => {
  let component: DossierDeleteComponent;
  let fixture: ComponentFixture<DossierDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DossierDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
