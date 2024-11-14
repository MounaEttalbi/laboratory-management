import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLaboratoryComponent } from './delete-laboratory.component';

describe('DeleteLaboratoryComponent', () => {
  let component: DeleteLaboratoryComponent;
  let fixture: ComponentFixture<DeleteLaboratoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLaboratoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
