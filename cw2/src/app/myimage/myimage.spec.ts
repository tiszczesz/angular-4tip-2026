import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myimage } from './myimage';

describe('Myimage', () => {
  let component: Myimage;
  let fixture: ComponentFixture<Myimage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myimage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Myimage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
