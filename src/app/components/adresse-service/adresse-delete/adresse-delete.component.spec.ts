import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseDeleteComponent } from './adresse-delete.component';

describe('AdresseDeleteComponent', () => {
  let component: AdresseDeleteComponent;
  let fixture: ComponentFixture<AdresseDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdresseDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
