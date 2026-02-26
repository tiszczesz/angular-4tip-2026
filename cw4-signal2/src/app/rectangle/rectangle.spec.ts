import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rectangle } from './rectangle';

describe('Rectangle', () => {
  let component: Rectangle;
  let fixture: ComponentFixture<Rectangle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rectangle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rectangle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
