import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerUtilisateursComponent } from './lister-utilisateurs.component';

describe('ListerUtilisateursComponent', () => {
  let component: ListerUtilisateursComponent;
  let fixture: ComponentFixture<ListerUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListerUtilisateursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
