import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollsetupComponent } from './enrollsetup.component';

describe('EnrollsetupComponent', () => {
  let component: EnrollsetupComponent;
  let fixture: ComponentFixture<EnrollsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
