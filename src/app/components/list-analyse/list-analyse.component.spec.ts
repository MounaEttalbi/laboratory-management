import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnalyseComponent } from './list-analyse.component';

describe('ListAnalyseComponent', () => {
  let component: ListAnalyseComponent;
  let fixture: ComponentFixture<ListAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAnalyseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
