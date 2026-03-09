import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listcourses } from './listcourses';

describe('Listcourses', () => {
  let component: Listcourses;
  let fixture: ComponentFixture<Listcourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listcourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listcourses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
