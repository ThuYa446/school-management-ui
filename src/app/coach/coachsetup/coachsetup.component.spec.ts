import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachsetupComponent } from './coachsetup.component';

describe('CoachsetupComponent', () => {
  let component: CoachsetupComponent;
  let fixture: ComponentFixture<CoachsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
