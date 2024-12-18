import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseDetailsComponent } from './adresse-details.component';

describe('AdresseDetailsComponent', () => {
  let component: AdresseDetailsComponent;
  let fixture: ComponentFixture<AdresseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdresseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
