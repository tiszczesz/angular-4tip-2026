import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUsers } from './form-users';

describe('FormUsers', () => {
  let component: FormUsers;
  let fixture: ComponentFixture<FormUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUsers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
