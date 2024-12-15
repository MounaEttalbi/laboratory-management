import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseUpdateComponent } from './adresse-update.component';

describe('AdresseUpdateComponent', () => {
  let component: AdresseUpdateComponent;
  let fixture: ComponentFixture<AdresseUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdresseUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
