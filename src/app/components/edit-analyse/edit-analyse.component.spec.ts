import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnalyseComponent } from './edit-analyse.component';

describe('EditAnalyseComponent', () => {
  let component: EditAnalyseComponent;
  let fixture: ComponentFixture<EditAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAnalyseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
