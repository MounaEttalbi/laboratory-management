import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChercheurPageComponent } from './chercheur-page.component';

describe('ChercheurPageComponent', () => {
  let component: ChercheurPageComponent;
  let fixture: ComponentFixture<ChercheurPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChercheurPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChercheurPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
