import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseListComponent } from './adresse-list.component';

describe('AdresseListComponent', () => {
  let component: AdresseListComponent;
  let fixture: ComponentFixture<AdresseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdresseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
