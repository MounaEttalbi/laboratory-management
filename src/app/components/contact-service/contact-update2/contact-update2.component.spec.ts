import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUpdate2Component } from './contact-update2.component';

describe('ContactUpdate2Component', () => {
  let component: ContactUpdate2Component;
  let fixture: ComponentFixture<ContactUpdate2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUpdate2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUpdate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
