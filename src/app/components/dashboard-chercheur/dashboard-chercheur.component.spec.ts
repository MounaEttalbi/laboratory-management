import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChercheurComponent } from './dashboard-chercheur.component';

describe('DashboardChercheurComponent', () => {
  let component: DashboardChercheurComponent;
  let fixture: ComponentFixture<DashboardChercheurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardChercheurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardChercheurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
