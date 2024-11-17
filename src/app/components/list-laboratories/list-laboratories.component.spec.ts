import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLaboratoriesComponent } from './list-laboratories.component';

describe('ListLaboratoriesComponent', () => {
  let component: ListLaboratoriesComponent;
  let fixture: ComponentFixture<ListLaboratoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListLaboratoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLaboratoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
