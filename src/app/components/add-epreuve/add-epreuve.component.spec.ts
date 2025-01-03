import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEpreuveComponent } from './add-epreuve.component';

describe('AddEpreuveComponent', () => {
  let component: AddEpreuveComponent;
  let fixture: ComponentFixture<AddEpreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEpreuveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEpreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
