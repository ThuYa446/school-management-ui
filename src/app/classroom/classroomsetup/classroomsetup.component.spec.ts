import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomsetupComponent } from './classroomsetup.component';

describe('ClassroomsetupComponent', () => {
  let component: ClassroomsetupComponent;
  let fixture: ComponentFixture<ClassroomsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
