import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstNoSignals } from './first-no-signals';

describe('FirstNoSignals', () => {
  let component: FirstNoSignals;
  let fixture: ComponentFixture<FirstNoSignals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstNoSignals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstNoSignals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
