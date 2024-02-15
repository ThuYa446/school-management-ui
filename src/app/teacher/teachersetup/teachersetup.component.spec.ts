import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersetupComponent } from './teachersetup.component';

describe('TeachersetupComponent', () => {
  let component: TeachersetupComponent;
  let fixture: ComponentFixture<TeachersetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
