import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseAddComponent } from './adresse-add.component';

describe('AdresseAddComponent', () => {
  let component: AdresseAddComponent;
  let fixture: ComponentFixture<AdresseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdresseAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
